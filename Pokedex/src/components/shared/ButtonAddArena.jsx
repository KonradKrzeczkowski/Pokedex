import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShieldIcon from '@mui/icons-material/Shield';
import ShieldIcons from '../../icons/tank';
import useFetch from '../../hooks/useFetch';

const ButtonAddArena = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isArena, setIsArena] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const { pokemonCount, isLoading } = useFetch(refresh); 

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/pokemons/${id}`)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.error('Błąd podczas pobierania:', err));
    }
  }, [id]);
useEffect(() => {
    if (pokemon) {
      setIsArena(pokemon.arena);
    }
  }, [pokemon]);

  const handleArena = () => {
    if (!pokemon) return;
    const newArenaValue = !isArena; 
 if (newArenaValue && pokemonCount >= 2) {
      alert("Only 2 Pokémon can be on the arena!"); 
      return;
    }
setIsArena(newArenaValue);
    const updatedPokemon = { ...pokemon, arena: newArenaValue };

  
    axios
      .patch(`http://localhost:3000/pokemons/${id}`, {
        arena: updatedPokemon.arena,
      })
      .then(() => {
        console.log('Arena state updated');
      })
      .catch((err) => console.error('Error while fetching:', err));
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleArena();
          setRefresh((prev) => prev + 1); 
        }}
        disabled={isLoading}
      >
        {isArena ? <ShieldIcon /> : <ShieldIcons />} 
      </button>
    </div>
  );
};

export default ButtonAddArena;
