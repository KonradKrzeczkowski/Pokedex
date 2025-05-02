import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchApi = (filter = '') => {
  const [pokemonsApi, setPokemonsApi] = useState([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [isErrorApi, setIsErrorApi] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoadingApi(true);
      setIsErrorApi(false);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`
        );
        if (!response.ok) {
          throw new Error('The network response was invalid');
        }
        const data = await response.json();
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            const {
              name,
              weight,
              height,
              abilities,
              sprites,
              base_experience,
            } = pokemonResponse.data;
            const { front_default } = sprites.other.dream_world;

            return {
              name,
              weight,
              height,
              abilities,
              sprites: { other: { dream_world: { front_default } } },
              base_experience,
            };
          })
        );

        const filteredPokemons = detailedPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filter.toLowerCase())
        );

        setPokemonsApi(filteredPokemons);
      } catch (error) {
        console.error('Could not retrieve Pokémon.', error);
        setIsErrorApi(true);
      } finally {
        setIsLoadingApi(false);
      }
    };

    fetchPokemons();
  }, [filter]);

  return { pokemonsApi, isLoadingApi, isErrorApi };
};

export default useFetchApi;
