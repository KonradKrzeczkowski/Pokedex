import { useState, useEffect } from "react";

const useFetch = (refresh) => {
  const [pokemonCount, setPokemonCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch("http://localhost:3000/pokemons");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        const count = data.filter(p => p.arena).length;
        setPokemonCount(count); 
      } catch (error) {
        console.error("Failed to fetch pokemons", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUsers();
  }, [refresh]);

  return { pokemonCount, isLoading, isError };
};
export default useFetch;