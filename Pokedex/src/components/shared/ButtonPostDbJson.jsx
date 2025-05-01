import axios from 'axios';
const ButtonPostDbJson = (pokemons) => {
  const fetchPokemonData = async () => {
    try {
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
          console.log(pokemonResponse.data);
          return {
            name,
            weight,
            height,
            abilities,
            sprites: { other: { dream_world: { front_default } } },
            base_experience,
            favorite: false,
            arena: false,
            lose: Number(0),
            win: Number(0),
          };
        })
      );
      await Promise.all(
        data.map(async (element) => {
          const response = await fetch('http://localhost:3000/pokemons', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(element),
          });

          if (!response.ok) {
            console.error('Error:', response.statusText);
          } else {
            console.log('Pokemon added:', await response.json());
           
          }
        })
      );
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };
  return (
    <div>
      <button
        onClick={fetchPokemonData}
        disabled={pokemons.pokemons.length > 1}
      >
      Download Pokemon data and save to server
      </button>
    </div>
  );
};

export default ButtonPostDbJson;
