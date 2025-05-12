import React, { useState, useContext } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeContext } from '../../context/ThemeContext';
import styled from 'styled-components';
import useIsMobile from '../../hooks/useIsMobile';
import IsLoading from '../../icons/isLoading';
import useFetchPokemons from '../../hooks/useFetchPokemons';

const Ranking = () => {
  const [sort, setSort] = useState('');
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const { pokemons, isLoading, isError } = useFetchPokemons();
  const labelMap = {
    base_experience: 'experience',
    weight: 'weight',
    height: 'height',
    win: 'battle',
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const sortedPokemons = [...pokemons].sort((a, b) => {
    if (sort === '') return 0;
    if (a[sort] < b[sort]) return 1;
    if (a[sort] > b[sort]) return -1;
    return 0;
  });

  return (
    <div
      style={{
        ...theme,
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div>
        <DivSelect style={theme}>
          <Select
            sx={{
              backgroundColor: theme.background,
              color: theme.color,
              '.MuiSvgIcon-root': { color: theme.color },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.color,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.color,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.color,
              },
            }}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sort}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => {
              if (selected === '') {
                return <em>Sort</em>;
              }
              return labelMap[selected] || selected;
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'base_experience'}>experience</MenuItem>
            <MenuItem value={'weight'}>weight</MenuItem>
            <MenuItem value={'height'}>height</MenuItem>
            <MenuItem value={'win'}>battle</MenuItem>
          </Select>
        </DivSelect>

        {isLoading && <IsLoading />}
        {isError && <h2>Unable to retrieve data</h2>}

        {!isMobile && (
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: theme.background,
              color: theme.color,
            }}
          >
            <Table
              sx={{
                minWidth: 650,
                backgroundColor: theme.background,
                color: theme.color,
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead
                sx={{
                  backgroundColor: theme.background,
                  color: theme.color,
                }}
              >
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.background,
                      color: theme.color,
                    }}
                    align="right"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.background,
                      color: theme.color,
                    }}
                    align="right"
                  >
                    Weight
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.background,
                      color: theme.color,
                    }}
                    align="right"
                  >
                    Height
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.background,
                      color: theme.color,
                    }}
                    align="right"
                  >
                    Experience
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.background,
                      color: theme.color,
                    }}
                    align="right"
                  >
                    Win
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPokemons.map(
                  (
                    { name, id, weight, height, sprites, base_experience, win },
                    index
                  ) => (
                    <TableRow
                      sx={{
                        backgroundColor: theme.background,
                        color: theme.color,
                      }}
                      key={id}
                    >
                      <TableCell
                        sx={{
                          backgroundColor: theme.background,
                          color: theme.color,
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="sortPokemon">
                        <ImgPokemon
                          style={{ width: '30px' }}
                          src={sprites?.other.dream_world.front_default}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: theme.background,
                          color: theme.color,
                        }}
                        align="right"
                      >
                        {name}
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: theme.background,
                          color: theme.color,
                        }}
                        align="right"
                      >
                        {weight}
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: theme.background,
                          color: theme.color,
                        }}
                        align="right"
                      >
                        {height}
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: theme.background,
                          color: theme.color,
                        }}
                        align="right"
                      >
                        {base_experience}
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: theme.background,
                          color: theme.color,
                        }}
                        align="right"
                      >
                        {win}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {isMobile &&
          sortedPokemons.map(
            (
              { name, id, weight, height, sprites, base_experience, win },
              index
            ) => (
              <DivList  key={id + name}>
                <p>{index + 1}</p>
                <ImgPokemon
               
                  src={sprites?.other.dream_world.front_default}
                />
                <p>
                  {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                </p>
                <p>{weight}</p>
                <p>{height}</p>
                <p>{base_experience}</p>
                <p>{win}</p>
              </DivList>
            )
          )}
      </div>
    </div>
  );
};

export default Ranking;

const ImgPokemon = styled.img`
  width: 30px;
  height: 30px;
`;

const DivSelect = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;
`;
const DivList=styled.div`
display:flex;
gap:10px;
`
