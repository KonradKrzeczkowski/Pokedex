import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchApi = (filter) => {
  const [pokemonsApi, setPokemonsApi] = useState([]); 
  const [isLoadingApi, setIsLoadingApi] = useState(true); 
  const [isErrorApi, setIsErrorApi] = useState(false);


  const filterPokemons = (pokemons, filter) => {
    if (!filter) return pokemons;  
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filter.toLowerCase())
    );
  };


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoadingApi(true);  
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`
        );
        
 
        const pokemonUrls = response.data.results;
        const data = await Promise.all(
          pokemonUrls.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            const {
              name,
              weight,
              height,
              abilities,
              sprites: {
                other: {
                  dream_world: { front_default },
                },
              },
              base_experience,
            } = pokemonResponse.data;
            
            return {
              name,
              weight,
              height,
              abilities,
              sprites: { other: { dream_world: { front_default } } },
              base_experience,
              favorite: false,
              arena: false,
              lose: 0,
              win: 0,
            };
          })
        );
        
        setPokemonsApi(data);
        setIsLoadingApi(false);  
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        setIsErrorApi(true); 
        setIsLoadingApi(false);
      }
    };

    fetchPokemonData(); 
  }, []); 


  const filteredPokemons = filterPokemons(pokemonsApi, filter);


  return {
    pokemonsApi: filteredPokemons, 
    isLoadingApi,
    isErrorApi,
  };
};

export default useFetchApi;