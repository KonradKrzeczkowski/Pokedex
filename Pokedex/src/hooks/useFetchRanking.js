import { useState, useEffect } from "react";

const useFetchRanking = (sort) => {
  const [sortPokemon, setSortPokemon] = useState([]);
  const [sortIsLoading, setSortIsLoading] = useState(false);
  const [sortIsError, setSortIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setSortIsLoading(true);
      setSortIsError(false);
      try {
        const response = await fetch(
          "http://localhost:3000/pokemons"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        const sortedPokemons = data.sort((a, b) => Number(b[sort]) - Number(a[sort]));
        setSortPokemon(sortedPokemons);
      } catch (error) {
        console.error("Failed to fetch pokemons", error);
        setSortIsError(true);
      } finally {
        setSortIsLoading(false);
      }
    };

    fetchUsers();
  }, [sort]);

  return { sortPokemon, sortIsLoading, sortIsError };
};
export default useFetchRanking;