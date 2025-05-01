import { useState, useEffect } from 'react';

const useFetchDbJson = (filter = '') => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const url = `http://localhost:3000/pokemons`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredPokemons = data.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filter.toLowerCase())
        );
        setPokemons(filteredPokemons);
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [filter]);

  return { pokemons, isLoading, isError };
};
export default useFetchDbJson;
