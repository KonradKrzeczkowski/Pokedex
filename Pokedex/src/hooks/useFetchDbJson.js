import { useState, useEffect } from 'react';

const useFetchDbJson = () => {
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

        setPokemons(data);
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { pokemons, isLoading, isError };
};
export default useFetchDbJson;