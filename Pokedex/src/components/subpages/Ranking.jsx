import React from 'react';
import { useState, useContext } from 'react';
import useFetchRanking from '../../hooks/useFetchRanking';
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
const Ranking = () => {
  const [sort, setSort] = useState('');
  const { sortPokemon, sortIsLoading, sortIsError } = useFetchRanking(sort);
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div
      style={{
        ...theme,
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <div>
        <DivSelect>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sort}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => {
              if (selected === '') {
                return <em>Sort</em>;
              }
              return selected;
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
        {!isMobile && (
          <TableContainer component={Paper} style={theme}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Weight</TableCell>
                  <TableCell align="right">Height</TableCell>
                  <TableCell align="right">Experience</TableCell>
                  <TableCell align="right">Win</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortPokemon.map(
                  (
                    { name, id, weight, height, sprites, base_experience, win },
                    index
                  ) => (
                    <TableRow key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell component="th" scope="sortPokemon">
                        <ImgPokemon
                          style={{ width: '30px' }}
                          src={sprites?.other.dream_world.front_default}
                        ></ImgPokemon>
                      </TableCell>
                      <TableCell align="right">{name}</TableCell>
                      <TableCell align="right">{weight}</TableCell>
                      <TableCell align="right">{height}</TableCell>
                      <TableCell align="right">{base_experience}</TableCell>
                      <TableCell align="right">{win}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {isMobile &&
          sortPokemon.map(
            (
              { name, id, weight, height, sprites, base_experience, win },
              index
            ) => (
              <div style={{ display: 'flex', gap: '10px' }} key={id + name}>
                <p>{index + 1}</p>
                <ImgPokemon
                  style={{
                    maxWidth: '50px',
                    maxHeight: '50px',
                    objectFit: 'contain',
                  }}
                  src={sprites?.other.dream_world.front_default}
                ></ImgPokemon>
                <p>
                  {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                </p>
                <p>{weight}</p>
                <p>{height}</p>
                <p>{base_experience}</p>
                <p>{win}</p>
              </div>
            )
          )}
      </div>
      {sortIsLoading && <IsLoading />}
      {sortIsError && <h2>Unable to retrieve data</h2>}
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
