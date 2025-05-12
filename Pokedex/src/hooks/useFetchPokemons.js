import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import { ArenaFavoriteContext } from '../context/FavArenaContext';

const useFetchPokemons = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const { setIsArena, setIsPokemonConnected, setIsDbJson, setIsFavorite } = useContext(ArenaFavoriteContext);
  const [pokemons, setPokemons] = useState([]);
  const [localPokemons, setLocalPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchLocal = async () => {
        try {
          const res = await axios.get('http://localhost:3000/pokemons');
          const local = (res.data || []).map((pokemon) => ({
            ...pokemon,
            weight: Number(pokemon.weight),
            height: Number(pokemon.height),
            base_experience: Number(pokemon.base_experience),
            win: Number(pokemon.win || 0),
            lose: Number(pokemon.lose || 0),
          }));

          setLocalPokemons(local);
          setIsDbJson(local);

          const filterArena = local
            .filter((p) => p.arena === true)
            .map((p) => p.id);
          const filterFavorite = local
            .filter((p) => p.favorite === true)
            .map((p) => p.id);

          setIsArena(filterArena);
          setIsFavorite(filterFavorite);
        } catch (err) {
          console.error('Błąd pobierania lokalnych Pokémonów:', err);
          setLocalPokemons([]);
        }
      };
      fetchLocal();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        let apiPokemons = [];
        const apiLimit = 150;
        const listRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${apiLimit}&offset=0`
        );

        const details = await Promise.all(
          listRes.data.results.map(async (p) => {
            const res = await axios.get(p.url);
            const {
              id,
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
            } = res.data;

            return {
              id: id.toString(),  
              name,
              weight: Number(weight),
              height: Number(height),
              abilities,
              sprites: {
                other: {
                  dream_world: { front_default },
                },
              },
              base_experience: Number(base_experience),
              favorite: false,
              arena: false,
              lose: 0,
              win: 0,
            };
          })
        );

        apiPokemons = details;
         const allPokemons = isLoggedIn
          ? [
              ...apiPokemons,
              ...localPokemons.filter(
                (p) => !apiPokemons.some((apiP) => apiP.id === p.id)
              ),
            ]
          : apiPokemons;

        const mergedPokemons = allPokemons.map((pokemon) => {
          const localData = localPokemons.find(
            (localPokemon) =>
              localPokemon.id === pokemon.id 
          );
          return localData ? { ...pokemon, ...localData } : pokemon;
        });
 const uniquePokemons = Array.from(
          new Map(mergedPokemons.map((p) => [p.id, p])).values()
        );

        setIsPokemonConnected(uniquePokemons);
        setPokemons(uniquePokemons);
        setIsLoading(false);
      } catch (err) {
        console.error('Błąd pobierania danych:', err);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [localPokemons, isLoggedIn]);


  const addPokemonToLocal = async (newPokemon) => {
    try {
      const response = await axios.post('http://localhost:3000/pokemons', newPokemon);
       setLocalPokemons((prev) => [...prev, newPokemon]);
    } catch (error) {
      console.error('Błąd dodawania pokémona:', error);
    }
  };

  return {
    pokemons,
    isLoading,
    isError,
    addPokemonToLocal, 
  };
};

export default useFetchPokemons;