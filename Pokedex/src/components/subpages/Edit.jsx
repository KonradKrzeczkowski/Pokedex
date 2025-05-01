import React from 'react';
import Button from '@mui/material/Button';
import EditPokemon from '../shared/EditPokemon';
import NewPokemon from '../shared/NewPokemon';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Edit = () => {
  const navigate = useNavigate();
  return (
    <DivEdit>
      <DivButton>
        <Button
          onClick={() => {
            navigate('/newPokemon');
          }}
          variant="outlined"
        >
          Create a Pokemon
        </Button>
      </DivButton>
      <EditPokemon />
    </DivEdit>
  );
};

export default Edit;

const DivButton = styled.div`
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DivEdit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;
