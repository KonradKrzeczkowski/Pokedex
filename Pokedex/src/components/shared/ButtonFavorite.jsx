import React, { useState, useEffect, useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ArenaFavoriteContext } from '../../context/FavArenaContext';
import axios from 'axios';

const ButtonFavorite = ({ id, favorite = false }) => {
  const [isFav, setIsFav] = useState(favorite);

  const {
    setIsFavorite,
    isPokemonConnected,
    setIsPokemonConnected,
    isDbJson,
    setIsDbJson,
  } = useContext(ArenaFavoriteContext);

  useEffect(() => {
    setIsFav(favorite);
  }, [favorite]);

  const handleFavorite = async () => {
    if (!id) return;

    const newFavoriteState = !isFav;
    setIsFav(newFavoriteState);

    setIsFavorite((prev) =>
      newFavoriteState
        ? [...prev, id]
        : prev.filter((pokemonId) => pokemonId !== id)
    );

    const updatedPokemon = {
      ...isPokemonConnected.find((p) => p.id.toString() === id.toString()),
      favorite: newFavoriteState,
    };

    setIsPokemonConnected((prev) =>
      prev.map((p) => (p.id.toString() === id.toString() ? updatedPokemon : p))
    );

    const existingPokemon = isDbJson.find(
      (p) => p.id.toString() === id.toString()
    );

    if (existingPokemon) {
      const updatedPokemonDb = {
        ...existingPokemon,
        favorite: newFavoriteState,
      };

      try {
        await axios.patch(
          `http://localhost:3000/pokemons/${id}`,
          updatedPokemonDb,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        setIsDbJson((prev) =>
          prev.map((p) =>
            p.id.toString() === id.toString() ? updatedPokemonDb : p
          )
        );
      } catch (error) {
        console.error('Błąd przy aktualizacji Pokémona w db.json:', error);
      }
    } else {
      const sourcePokemon = isPokemonConnected.find(
        (p) => p.id.toString() === id.toString()
      );
      if (!sourcePokemon) {
        console.warn(`Pokémon z id ${id} nie znaleziony w isPokemonConnected`);
        return;
      }
      try {
        await axios.post(
          'http://localhost:3000/pokemons',
          {
            ...sourcePokemon,
            favorite: newFavoriteState,
            id: id.toString(),
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        setIsDbJson((prev) => [
          ...prev,
          { ...sourcePokemon, favorite: newFavoriteState },
        ]);
      } catch (error) {
        console.error('Błąd przy dodawaniu Pokémona do db.json:', error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleFavorite();
        }}
      >
        {isFav ? (
          <FavoriteIcon sx={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </button>
    </div>
  );
};

export default ButtonFavorite;
