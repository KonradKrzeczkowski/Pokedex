import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const schema = z.object({
  weight: z.string().min(1, { message: 'Waga musi mieć przynajmniej 1 znak' }),
  height: z
    .string()
    .min(1, { message: 'Wysokość musi mieć przynajmniej 1 znak' }),
  base_experience: z
    .string()
    .min(1, { message: 'Doświadczenie musi mieć przynajmniej 1 znak' }),
});

const PokemonEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { pokemons, id } = state || {};
  console.log(pokemons);
  const {
    register,
    handleSubmit,
formState: { errors },
    setValue,
  } = useForm(
    { resolver: zodResolver(schema) },
    {
      defaultValues: {
        weight: '',
        height: '',
        base_experience: '',
      },
    }
  );
  console.log(id);
  useEffect(() => {
    if (pokemons) {
      setValue('weight', pokemons.weight);
      setValue('height', pokemons.height);
      setValue('base_experience', pokemons.base_experience);
    }
  }, [pokemons, setValue]);
  const onSubmit = (data) => {
    console.log('Formularz wysłany:', data);
    const updatedBaseExperience = data.base_experience;
    const upatedHeight = data.height;
    const updatedWeight = data.weight;
    const updatedPokemon = {
      ...pokemons,
      base_experience: updatedBaseExperience,
      weight: updatedWeight,
      height: upatedHeight,
      updated: true,
    };

    axios.patch(`http://localhost:3000/pokemons/${id}`, updatedPokemon)
      .then(() => {
       alert(`zmieniono atrybuty ${pokemons?.name} `);
        navigate('/');
      })
      .catch((err) => console.error('Błąd przy zapisie:', err));

    console.log('Błędy:', errors);
  };

  return (
    <DivForm>
      <h2>{pokemons?.name}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="height"
          variant="outlined"
          name="height"
          focused
          {...register('height')}
        />
        <TextField
          id="outlined-basic"
          label="weight"
          variant="outlined"
          name="weight"
          focused
          {...register('weight')}
        />
        <TextField
          id="outlined-basic"
          label="experience"
          variant="outlined"
          name="base_experience"
          focused
          {...register('base_experience')}
        />
        <Button type="submit">Zmieniono atrybuty {pokemons?.name} </Button>
      </Form>
    </DivForm>
  );
};
export default PokemonEdit;
const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100vw;
  height:100vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 20px;
`;
