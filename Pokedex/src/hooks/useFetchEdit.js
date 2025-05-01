import { useState, useEffect } from "react";

const useFetchEdit = (edit) => {
  const [editPokemon, setEditPokemon] = useState([]);
  const [isLoadingEditPokemon, setIsLoadingEditPokemon] = useState(false);
  const [isErrorEditPokemon, setIsErrorEditPokemon] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
        setIsLoadingEditPokemon(true);
        setIsErrorEditPokemon(false);
      try {
        const response = await fetch(
          "http://localhost:3000/pokemons"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
    
    
        setEditPokemon(data);
      } catch (error) {
        console.error("Failed to fetch pokemons", error);
        setIsErrorEditPokemon(true);
      } finally {
        setIsLoadingEditPokemon(false);
      }
    };

    fetchUsers();
  }, [edit]);

  return { editPokemon, isLoadingEditPokemon, isErrorEditPokemon };
};
export default useFetchEdit;