import React, { useState, useEffect, useContext } from 'react';
import ShieldIcon from '@mui/icons-material/Shield';
import ShieldIcons from '../../icons/tank';
import { ArenaFavoriteContext } from '../../context/FavArenaContext';
import axios from 'axios';

const ButtonAddArena = ({ id }) => {
  const [isArenas, setIsArenas] = useState(false);
  const {
    isArena,
    setIsArena,
    isDbJson,
    setIsDbJson,
    isPokemonConnected,
    setIsPokemonConnected,
  } = useContext(ArenaFavoriteContext);
  const syncPokemonToLocalDB = async (id) => {
    const existing = isDbJson?.find((p) => p.id.toString() === id.toString());

    if (existing) {
      console.log(`Pokémon ${id} już istnieje w db.json — pomijam zapis.`);
      return;
    }

    const sourcePokemon = isPokemonConnected?.find(
      (p) => p.id.toString() === id.toString()
    );

    if (!sourcePokemon) {
      console.warn(
        `Pokémon z id ${id} nie został znaleziony w isPokemonConnected`
      );
      return;
    }

    try {
      await axios.post('http://localhost:3000/pokemons', {
        ...sourcePokemon,
        id: id.toString(),
        arena: true,
      });

      setIsDbJson((prev) => [...prev, { ...sourcePokemon, id: id.toString() }]);
      console.log(`Pokémon ${id} został zapisany do db.json`);
    } catch (error) {
      console.error('Błąd przy dodawaniu Pokémona do db.json:', error);
    }
  };
  const handleArena = async () => {
    const newArenaValue = !isArenas;
    if (newArenaValue && isArena.length >= 2) {
      alert('Tylko 2 Pokémony mogą być na arenie!');
      return;
    }
    if (newArenaValue) {
      setIsArena((prev) => [...prev, id.toString()]);
    } else {
      setIsArena((prev) =>
        prev.filter((pokemonId) => pokemonId !== id.toString())
      );
    }
    setIsArenas(newArenaValue);
    const updatedPokemon = {
      ...isPokemonConnected.find((p) => p.id.toString() === id.toString()),
      arena: newArenaValue,
    };
    setIsPokemonConnected((prev) =>
      prev.map((p) => (p.id.toString() === id.toString() ? updatedPokemon : p))
    );

    const existing = isDbJson?.find((p) => p.id.toString() === id.toString());
    if (existing) {
      const updatedPokemonDb = { ...existing, arena: newArenaValue };

      try {
        await axios.patch(
          `http://localhost:3000/pokemons/${id.toString()}`,
          updatedPokemonDb
        );
        console.log('Arena state updated');
        setIsDbJson((prev) =>
          prev.map((p) =>
            p.id.toString() === id.toString() ? updatedPokemonDb : p
          )
        );
      } catch (error) {
        console.error('Błąd przy aktualizacji areny:', error);
      }
    } else {
      await syncPokemonToLocalDB(id);
    }
  };
  useEffect(() => {
    if (id && Array.isArray(isArena)) {
      setIsArenas(isArena.includes(id.toString()));
    }
  }, [id, isArena]);

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleArena();
        }}
      >
        {isArenas ? (
          <div>
            <ShieldIcon /> {isArena.length}/2
          </div>
        ) : (
          <div>
            {' '}
            <ShieldIcons />
            {isArena.length}/2
          </div>
        )}
      </button>
    </div>
  );
};

export default ButtonAddArena;
