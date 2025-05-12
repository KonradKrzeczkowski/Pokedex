import React, { useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@mui/material/Button';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArenaFavoriteContext } from '../../context/FavArenaContext';
import { ThemeContext } from '../../context/ThemeContext';
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
  const { theme } = useContext(ThemeContext);
  const { isDbJson, setIsDbJson } = useContext(ArenaFavoriteContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      weight: '',
      height: '',
      base_experience: '',
    },
  });

  useEffect(() => {
    if (pokemons) {
      setValue('weight', pokemons.weight);
      setValue('height', pokemons.height);
      setValue('base_experience', pokemons.base_experience);
    }
  }, [pokemons, setValue]);

  const onSubmit = async (data) => {
    const updatedPokemon = {
      ...pokemons,
      base_experience: Number(data.base_experience),
      weight: Number(data.weight),
      height: Number(data.height),
      updated: true,
    };
    const existsInDb = isDbJson?.some((p) => p.id.toString() === id.toString());
    try {
      if (existsInDb) {
        await axios.patch(
          `http://localhost:3000/pokemons/${id}`,
          updatedPokemon
        );
        setIsDbJson((prev) =>
          prev.map((p) =>
            p.id.toString() === id.toString() ? updatedPokemon : p
          )
        );
        alert(`Zaktualizowano atrybuty ${pokemons?.name}`);
      } else {
        await axios.post(`http://localhost:3000/pokemons`, {
          ...updatedPokemon,
          id: id.toString(),
        });
        setIsDbJson((prev) => [
          ...prev,
          { ...updatedPokemon, id: id.toString() },
        ]);
        alert(`Dodano ${pokemons?.name} do db.json`);
      }

      navigate('/');
    } catch (error) {
      console.error('Błąd przy zapisie:', error);
    }
  };

  return (
    <DivForm>
      <h2>{pokemons?.name}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          label="height"
          variant="outlined"
          {...register('height')}
          error={!!errors.height}
          helperText={errors.height?.message}
        />
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
          label="weight"
          variant="outlined"
          {...register('weight')}
          error={!!errors.weight}
          helperText={errors.weight?.message}
        />
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
          label="experience"
          variant="outlined"
          {...register('base_experience')}
          error={!!errors.base_experience}
          helperText={errors.base_experience?.message}
        />
        <Button type="submit" variant="contained">
          Zapisz zmiany {pokemons?.name}
        </Button>
      </Form>
    </DivForm>
  );
};

export default PokemonEdit;

const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 20px;
`;
