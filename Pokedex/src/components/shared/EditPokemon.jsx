import React, { useState } from 'react';
import useFetchEdit from '../../hooks/useFetchEdit';
import Button from '@mui/material/Button';

import styled from 'styled-components';
import IsLoading from '../../icons/isLoading';
import { useNavigate } from 'react-router-dom';
const EditPokemon = () => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
 const { editPokemon, isLoadingEditPokemon, isErrorEditPokemon } = useFetchEdit(edit);
   function handleEditPokemon(index, id, selectedPokemon) {
    setEdit((prev) => !prev);
   navigate("/pokemonEdit", {
      state: {
        pokemons: selectedPokemon,
        id: id,
      }
    });
  }
return (
    <div>
      {!edit && editPokemon.map(({ name, sprites, id }, index) => (
        <ul
          key={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: 0,
            margin: '20px',
          }}
        >
          <span>{index + 1}</span>
          <li>
            <ImgEdit src={sprites?.other?.dream_world?.front_default} alt={name} />
          </li>
          <li>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</li>
          <li>
            <Button
              onClick={() => handleEditPokemon(index, id, editPokemon[index])}
            >
              Edytuj
            </Button>
          </li>
        </ul>
      ))}

      
      {isLoadingEditPokemon && <IsLoading />}
      {isErrorEditPokemon&&<h2>Unable to retrieve data</h2>}
    </div>
  );
};

export default EditPokemon;

const ImgEdit = styled.img`
  width: 50px;
  height: 50px;
`;