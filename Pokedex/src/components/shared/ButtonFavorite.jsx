import React, { Children } from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
const ButtonFavorite = ({id}) => {
    const [pokemon, setPokemon] = useState(null);
const [isFavorite,setIsFavorite]=useState(null);

    // Pobranie Pokémona po id z db.json
    useEffect(() => {
   
      if (id) {
     
      
      axios
        .get(`http://localhost:3000/pokemons/${id}`)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.error('Błąd podczas pobierania:', err));}
    }, [id]);
        useEffect(()=>{
          if (pokemon) {
            setIsFavorite(pokemon.favorite);
          }
        },[pokemon])
  
    const handleFavorite = () => {
      if (!pokemon) return;
  const updateFavorite=!isFavorite
      const updatedPokemon = { ...pokemon, favorite: updateFavorite };
  
      // Najpierw lokalna aktualizacja
      setPokemon(updatedPokemon);
  
      // Zapis do json-server
      axios
        .patch(`http://localhost:3000/pokemons/${id}`, {
          favorite: updatedPokemon.favorite,
        })
        .then(() => {console.log("Zaktualizowano favorite");

      }
    )
        .catch((err) => console.error("Błąd przy zapisie:", err));
        
    }

  return (
    <div>
    <button onClick={(e) => {
  e.stopPropagation();
  handleFavorite();
}} >
    {!isFavorite ? <FavoriteBorderIcon /> : <FavoriteIcon  sx={{ color: 'red' }}/>}
</button>
    </div>
  );
};

export default ButtonFavorite;
