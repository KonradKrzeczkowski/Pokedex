import React, { useContext } from 'react';
import { useState } from 'react';
import useFetchDbJson from '../../hooks/useFetchDbJson';
import Modals from '../shared/Modal';
import TextField from '@mui/material/TextField';
import PokemonCard from '../shared/PokemonCard';
import ButtonPostDbJson from '../shared/ButtonPostDbJson';
import styled from 'styled-components';
import { LoginContext } from '../../context/LoginContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import IsLoading from '../../icons/isLoading';
import { useEffect } from 'react';
import useFetchApi from '../../hooks/useFetchApi';
import { Pagination } from '@mui/material';
const DivCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
function Home() {
  const { theme} = useContext(ThemeContext);
  const { isLoggedIn} = useContext(LoginContext);
  const [filter, setFilter] = useState('');
  const { pokemons, isLoading, isError } = useFetchDbJson(filter);
  const { pokemonsApi, isLoadingApi, isErrorApi } = useFetchApi(filter);
 const [pokemonPagination,setPokenonPagination]=useState([])

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const[currentPage,setCurrentPage]=useState(1)
  const pokemonsPerPage=15;
  const countStart = (currentPage - 1) * pokemonsPerPage;
  const countEnd = currentPage * pokemonsPerPage;
  function handleModal(
    id,
    name,
    height,
    weight,
    base_experience,
    sprites,
    abilities,
    win,
    lose
  ) {
    setSelectedPokemon({
      id,
      name,
      height,
      weight,
      base_experience,
      sprites,
      abilities,
      win,
      lose,
    });
  }
  const handlePageChange = (event, value) => {
    setCurrentPage(value); 
  };
console.log(pokemonsApi)
  useEffect(() => {
    if (pokemons.length > 0) {
      const paginatedPokemons = pokemons.slice(countStart, countEnd);
      setPokenonPagination(paginatedPokemons); 
    }
  }, [currentPage, pokemons]);
    useEffect(() => {
    setCurrentPage(1); 
  }, [filter]);
 console.log(pokemonPagination)
  return (
    <DivHome style={theme}>
    
     
      {isChecked && (
        <Modals
          selectedPokemon={selectedPokemon}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      )}

     {isLoggedIn&&pokemons.length<100&&<ButtonPostDbJson pokemons={pokemons} />}
      <DivInput> <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => setFilter(e.target.value)}
      /></DivInput>
     

      <DivPokemonCards style={theme}>
      {isLoading&& pokemons.length > 0&& <IsLoading/>}
      {Array.isArray(pokemons) && pokemons.length > 0 && (
  pokemonPagination.map(
    ({
      name,
      height,
      weight,
      id,
      abilities,
      sprites,
      base_experience,
      favorite,
      arena,
      win,
      lose,
    }) => (
      <PokemonCard
        key={id}
        abilities={abilities?.[0]?.ability?.name || 'Nieznane '}
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
        onClick={() => {
          handleModal(
            id,
            name,
            height,
            weight,
            base_experience,
            sprites,
            abilities,
            win,
            lose
          );
          setIsChecked((prev) => !prev);
        }}
      />
    )
  )
)}
{pokemons.length === 0 && <h3>Brak Pokemonów</h3>}
{isError&&<h2>Unable to retrieve data</h2>}
       </DivPokemonCards>
      <Pagination
        count={Math.ceil(pokemons.length / pokemonsPerPage)} 
        onChange={handlePageChange}
        color="primary" 
        page={currentPage || 1}
      />
</DivHome>
  );
}

export default Home;
const DivHome=styled.div`
display:flex;
 flex-direction: column;
  align-items: center;`

const DivPokemonCards=styled.div`
display:flex;
justify-content: space-around;
max-width:1000px;
flex-wrap: wrap;
margin-bottom:20px;
`
const DivInput=styled.div`
margin:10px;`