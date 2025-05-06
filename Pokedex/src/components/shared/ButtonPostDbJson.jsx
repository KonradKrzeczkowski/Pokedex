import React from 'react';

const ButtonPostDbJson = ({ pokemonsApi }) => {
  const handlePostPokemons = async () => {
    try {
      await Promise.all(
        pokemonsApi.map(async (element) => {
          const enrichedPokemon = {
            ...element,
            favorite: false,
            arena: false,
            lose: 0,
            win: 0,
          };

          const response = await fetch('http://localhost:3000/pokemons', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(enrichedPokemon),
          });

          if (!response.ok) {
            console.error('Error:', response.statusText);
          } else {
            console.log('Pokemon added:', await response.json());
          }
        })
      );
    } catch (error) {
      console.error('Błąd podczas zapisu Pokémonów:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePostPokemons} disabled={pokemonsApi.length === 0}>
        Save all 150 Pokémons to server
      </button>
    </div>
  );
};

export default ButtonPostDbJson;
