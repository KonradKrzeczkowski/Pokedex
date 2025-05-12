import React, { useContext, useState } from 'react';
import useFetchPokemons from '../../hooks/useFetchPokemons';
import Modals from '../shared/Modal';
import TextField from '@mui/material/TextField';
import PokemonCard from '../shared/PokemonCard';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import IsLoading from '../../icons/isLoading';
import { Pagination } from '@mui/material';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const { pokemons, isLoading, isError } = useFetchPokemons();
  const itemsPerPage = 15;
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleModal = (
    id,
    name,
    height,
    weight,
    base_experience,
    sprites,
    abilities,
    win,
    lose
  ) => {
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
  };
  return (
    <DivHome style={theme}>
      {isChecked && selectedPokemon && (
        <Modals
          selectedPokemon={selectedPokemon}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      )}

      <DivInput>
        <TextField
          sx={{
            backgroundColor: theme.background,
            input: {
              color: theme.color,
            },
            '& label': {
              color: theme.color,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.color,
              },
            },
          }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
      </DivInput>

      <DivPokemonCards style={theme}>
        {paginatedPokemons.length > 0
          ? paginatedPokemons.map(
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
                  abilities={abilities?.[0]?.ability?.name || 'Nieznane'}
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
                    setIsChecked(true);
                  }}
                />
              )
            )
          : isLoading && (
              <h3>
                <IsLoading />
              </h3>
            )}

        {isError && <h2>Unable to retrieve data</h2>}
      </DivPokemonCards>

      {filteredPokemons.length > 0 && (
        <Pagination
          count={Math.ceil(filteredPokemons.length / itemsPerPage)}
          onChange={handlePageChange}
          color="primary"
          page={currentPage}
          sx={{
            backgroundColor: theme.background,
            color: theme.color,
            '& .MuiPaginationItem-root': {
              color: theme.color,
              borderColor: theme.color,
            },
            '& .Mui-selected': {
              backgroundColor: theme.color,
              color: theme.background,
            },
          }}
        />
      )}
    </DivHome>
  );
};

export default Home;

const DivHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height:100%;
`;

const DivPokemonCards = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1100px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 20px;
`;

const DivInput = styled.div`
  margin: 10px;
`;
