import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'The name must be at least 3 characters long."' }),
  image: z.string().url({ message: 'Invalid image URL' }),
  weight: z.string().min(1, { message: 'Weight must be at least 1.' }),
  height: z.string().min(1, { message: 'Height must be at least 1.' }),
  base_experience: z
    .string()
    .min(1, { message: 'Experience must be at least 1.' }),
});

const NewPokemon = () => {
  const [countImg, setCountImg] = useState(151);
  const navigate = useNavigate();
  const ImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${countImg}.svg`;
  const usedImages = JSON.parse(localStorage.getItem('usedImages')) || [];
  const isImageUsed = usedImages.includes(countImg);
  console.log(isImageUsed)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      weight: '',
      height: '',
      base_experience: '',
      image: '',
    },
  });

  useEffect(() => {
    setValue('image', ImageUrl);
  }, [countImg, setValue]);

  const onSubmit = async (data) => {
    const newPokemon = {
      ...data,
      sprites: {
        other: {
          dream_world: {
            front_default: data.image,
          },
        },
      },
    };
    delete newPokemon.image;
    try {
      const response = await axios.post(
        'http://localhost:3000/pokemons',
        newPokemon
      );
      console.log(' Add Pokemon:', response.data);
      const updatedUsedImages = [...usedImages, countImg];
      localStorage.setItem('usedImages', JSON.stringify(updatedUsedImages));
      navigate('/');
    } catch (error) {
      console.error('Save error', error);
    }
  };

  return (
    <DivForm>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'block' }}>
        <DivPictureButton>
          <DivPicture>
            <ImgPokemon src={ImageUrl} alt="Pokemon"   style={{ filter: isImageUsed === true ? 'grayscale(100%)' : 'none' }}d />
          </DivPicture>
          <DivButton>
            <button
              disabled={countImg <= 151}
              type="button"
              onClick={() =>
                setCountImg((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              back
            </button>
            <button
              type="button"
              onClick={() => setCountImg((prev) => prev + 1)}
              style={{ marginLeft: 10 }}
            >
              Next
            </button>
          </DivButton>
        </DivPictureButton>
        <input type="hidden" {...register('image')} />
        <DivInput>
          <TextField
            label="Name"
            variant="outlined"
            {...register('name')}
            placeholder="Name"
          />
          {errors.name && <p>{errors.name.message}</p>}
          <TextField
            label="Weight"
            variant="outlined"
            {...register('weight')}
            placeholder="Weight"
          />
          {errors.weight && <p>{errors.weight.message}</p>}
          <TextField
            label="Height"
            variant="outlined"
            {...register('height')}
            placeholder="Height"
          />
          {errors.height && <p>{errors.height.message}</p>}
          <TextField
            label="Experience"
            variant="outlined"
            {...register('base_experience')}
            placeholder="Experience"
          />
          {errors.base_experience && <p>{errors.base_experience.message}</p>}
          <Button type="submit" disabled={isImageUsed}>
            {isImageUsed ? 'Image already used' : 'Add Pokemon'}
          </Button>
        </DivInput>
      </form>
    </DivForm>
  );
};

export default NewPokemon;

const DivForm = styled.div`
padding-top:10px;
width:100vw;
  display: flex;
  justify-content: center;
`;

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const DivButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const ImgPokemon = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
 
`;

const DivPictureButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DivPicture = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
`;
