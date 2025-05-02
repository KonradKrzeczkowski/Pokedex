import useFetchDbJson from '../../hooks/useFetchDbJson';
import PokemonCard from '../shared/PokemonCard';
import styled from 'styled-components';
import pokeball from '../../icons/pokeball.png';
import IsLoading from '../../icons/isLoading';
import { useNavigate } from 'react-router-dom';
const Favorites = () => {
  const { pokemons, isLoading, isError } = useFetchDbJson();
  const navigate=useNavigate()
  return (
    <DivFavorites>
      <DivFavoritesCard>
        {Array.isArray(pokemons) && pokemons.length > 0 ? (
          pokemons.map(
            ({
              arena,
              name,
              height,
              weight,
              id,
              abilities,
              sprites,
              base_experience,
              favorite,
              win,
              lose,
            }) =>
              favorite && (
                <PokemonCard
                  key={id}
                  abilities={abilities?.[0]?.ability?.name || 'brak danych'}
                  name={name}
                  height={height}
                  weight={weight}
                  sprites={sprites}
                  base_experience={base_experience}
                  id={id}
                  favorite={favorite}
                  arena={arena}
                  win={win}
                  lose={lose}
                />
              )
          )
        ) : (
          <p>Ładowanie danych lub brak pokemonów...</p>
        )}
      </DivFavoritesCard>
      {Array.isArray(pokemons) &&
        pokemons.filter((pokemon) => pokemon.favorite).length === 0 && (
          <DivAddFavorite>
            <h1>Add Pokemon to Favorite</h1>{' '}
            <ImgPokeball  onClick={() => {
        navigate("/");
      }} src={pokeball}></ImgPokeball>
          </DivAddFavorite>
        )}
      {isLoading && <IsLoading />}
      {isError && <h2>Unable to retrieve data</h2>}
    </DivFavorites>
  );
};

export default Favorites;
const DivFavorites = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DivFavoritesCard = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1000px;
  flex-wrap: wrap;
`;
const ImgPokeball = styled.img`
  width: 200px;
  height: 200px;
  transition: transform 0.5s ease;
  &:hover {
    transform: rotate(360deg);
  }
`;
const DivAddFavorite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
