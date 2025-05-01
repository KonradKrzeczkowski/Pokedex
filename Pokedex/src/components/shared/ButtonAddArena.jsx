import React, { Children } from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import ShieldIcons from '../../icons/tank';
import ShieldIcon from '@mui/icons-material/Shield';
import useFetch from '../../hooks/useFetch';
const ButtonAddArena = ({id}) => {
    const [pokemon, setPokemon] = useState(null);
const [isArena,setIsArena]=useState(null);
const [refresh, setRefresh] = useState(0);
const { pokemonCount,isLoading} = useFetch(refresh);

    useEffect(() => {
      if (id) {
     
      axios
        .get(`http://localhost:3000/pokemons/${id}`)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.error('Błąd podczas pobierania:', err));}
    }, [id]);
    useEffect(()=>{
      if (pokemon) {
        setIsArena(pokemon.arena);
      }
    },[pokemon])
  // console.log(isArena)
    const handleArena = () => {
      if (!pokemon) return;
      const newArenaValue = !isArena; 
     
      if (newArenaValue===true && pokemonCount >= 2) {
        alert("Maksymalnie 2 Pokémony mogą być na arenie!");
        return;
      }
      setIsArena(newArenaValue);
      const updatedPokemon = { ...pokemon, arena: newArenaValue };
 
  
      setPokemon(updatedPokemon);
  
    
      axios
        .patch(`http://localhost:3000/pokemons/${id}`, {
          arena: updatedPokemon.arena,
        })
        .then(() =>{ console.log("Zaktualizowano arena");

        
        }
    )
        .catch((err) => console.error("Błąd przy zapisie:", err));
        
    }
// console.log(pokemonCount)

  return (
    <div>
<button onClick={(e) => {
  e.stopPropagation();
  handleArena();
  setRefresh(prev => prev + 1);
}}   disabled={isLoading}>
 {isArena ? <ShieldIcon /> : <ShieldIcons />}
</button>
    </div>
  );
};

export default ButtonAddArena;
