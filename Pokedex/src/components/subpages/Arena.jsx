import React, { useEffect, useState } from 'react';
import useFetchDbJson from '../../hooks/useFetchDbJson';
import PokemonCard from '../shared/PokemonCard';
import axios from 'axios';
import styled from 'styled-components';
import card from '../../icons/card.png';
import DivLose from '../shared/DivLose';
import DivWin from '../shared/DivWin';
import DivDraw from '../shared/DivDraw';
import { useNavigate } from 'react-router-dom';
import IsLoading from '../../icons/isLoading';
const Arena = () => {
  const { pokemons, isLoading, isError } = useFetchDbJson();
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);
  const [battleWin, setBattleWin] = useState('');
  const [winId, setWinId] = useState(null);
  const [loseId, setLoseId] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonLose, setPokemonLose] = useState(null);
  const [baseExpFirst, setBaseExpFirst] = useState(null);
  const [baseExpSecond, setBaseExpSecond] = useState(null);
  const [finishBattle, setFinishBattle] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const filterPokemon = pokemons.filter((pokemon) => pokemon.arena);

    if (filterPokemon.length > 0) {
      setFirstPokemon(filterPokemon[0]);
      setSecondPokemon(filterPokemon[1]);
      setBaseExpFirst(filterPokemon[0]?.base_experience);
      setBaseExpSecond(filterPokemon[1]?.base_experience);
    } else {
      setFirstPokemon(null);
      setSecondPokemon(null);
    }
  }, [pokemons]);

  const handleBattle = () => {
    if (!firstPokemon || !secondPokemon) return;

    const firstPokemonPower =
      firstPokemon.base_experience * firstPokemon.weight;
    const secondPokemonPower =
      secondPokemon.base_experience * secondPokemon.weight;

    if (firstPokemonPower > secondPokemonPower) {
      setBattleWin('firstWin');
      setWinId(firstPokemon.id);
      setBaseExpFirst((prev) => prev + 10);
      setLoseId(secondPokemon.id);
      setFinishBattle(true);
    } else if (firstPokemonPower < secondPokemonPower) {
      setBattleWin('secondWin');
      setWinId(secondPokemon.id);
      setBaseExpSecond((prev) => prev + 10);
      setLoseId(firstPokemon.id);
      setFinishBattle(true);
    } else {
      setBattleWin('draw');
      setFinishBattle(true);
    }
  };
  console.log(battleWin);
  useEffect(() => {
    if (winId) {
      axios
        .get(`http://localhost:3000/pokemons/${winId}`)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.error('Błąd podczas pobierania:', err));
    }
  }, [winId]);
  useEffect(() => {
    if (loseId) {
      axios
        .get(`http://localhost:3000/pokemons/${loseId}`)
        .then((res) => setPokemonLose(res.data))
        .catch((err) => console.error('Błąd podczas pobierania:', err));
    }
  }, [loseId]);

  useEffect(() => {
    if (pokemon && !pokemon.updated) {
      const updatedBaseExperience = pokemon.base_experience + 10;
      const updateWin = pokemon.win + 1;
      const updatedPokemon = {
        ...pokemon,
        base_experience: updatedBaseExperience,
        win: updateWin,
        updated: true,
      };

      axios
        .patch(`http://localhost:3000/pokemons/${winId}`, {
          base_experience: updatedBaseExperience,
          win: updateWin,
        })
        .then(() => {
          console.log('Zaktualizowano base experience');
          setPokemon(updatedPokemon);
        })
        .catch((err) => console.error('Błąd przy zapisie:', err));
    }
  }, [pokemon, winId]);
  useEffect(() => {
    if (pokemonLose && !pokemonLose.updated) {
      const updateLose = pokemonLose.lose + 1;

      const updatedPokemon = {
        ...pokemonLose,
        lose: updateLose,
        updated: true,
      };

      axios
        .patch(`http://localhost:3000/pokemons/${loseId}`, {
          lose: updateLose,
        })
        .then(() => {
          console.log('Zaktualizowano lose');
          setPokemonLose(updatedPokemon);
        })
        .catch((err) => console.error('Błąd przy zapisie:', err));
    }
  }, [pokemonLose, loseId]);
  function handleOutArena() {
    const updatedArena = false;

    const updatedFirst = {
      ...firstPokemon,
      arena: updatedArena,
      updated: true,
    };

    axios
      .patch(`http://localhost:3000/pokemons/${firstPokemon.id}`, {
        arena: updatedArena,
      })
      .then(() => {
        console.log('Usunięto pierwszego pokemona z areny');
        setFirstPokemon(updatedFirst);
        navigate('/');
      })
      .catch((err) =>
        console.error('Błąd przy zapisie pierwszego pokemona:', err)
      );

    const updatedSecond = {
      ...secondPokemon,
      arena: updatedArena,
      updated: true,
    };

    axios
      .patch(`http://localhost:3000/pokemons/${secondPokemon.id}`, {
        arena: updatedArena,
      })
      .then(() => {
        console.log('Usunięto drugiego pokemona z areny');
        setSecondPokemon(updatedSecond);
      })
      .catch((err) =>
        console.error('Błąd przy zapisie drugiego pokemona:', err)
      );
  }
  return (
    <DivArena>
      {firstPokemon ? (
        <PokemonCard
          key={firstPokemon.id}
          abilities={firstPokemon.abilities?.[0]?.ability?.name || 'Nieznane'}
          name={firstPokemon.name}
          height={firstPokemon.height}
          weight={firstPokemon.weight}
          sprites={firstPokemon.sprites}
          base_experience={baseExpFirst}
          id={firstPokemon.id}
          arena={firstPokemon.arena}
          favorite={firstPokemon.favorite}
          win={firstPokemon.win}
          lose={firstPokemon.lose}
        >
          {' '}
          {battleWin === 'firstWin' ? (
            <DivWin />
          ) : battleWin === 'secondWin' ? (
            <DivLose />
          ) : battleWin === 'draw' ? (
            <DivDraw />
          ) : null}
        </PokemonCard>
      ) : (
        <ImgCard src={card}></ImgCard>
      )}

      {finishBattle && (
        <ButtonArena onClick={handleOutArena}>Leave the Arena</ButtonArena>
      )}
      {!finishBattle && (
        <ButtonArena
          onClick={handleBattle}
          disabled={!firstPokemon || !secondPokemon}
        >
          Fight
        </ButtonArena>
      )}

      {secondPokemon ? (
        <PokemonCard
          key={secondPokemon.id}
          abilities={secondPokemon.abilities?.[0]?.ability?.name || 'Nieznane'}
          name={secondPokemon.name}
          height={secondPokemon.height}
          weight={secondPokemon.weight}
          sprites={secondPokemon.sprites}
          base_experience={baseExpSecond}
          id={secondPokemon.id}
          arena={secondPokemon.arena}
          favorite={secondPokemon.favorite}
          win={secondPokemon.win}
          lose={secondPokemon.lose}
        >
          {battleWin === 'secondWin' ? (
            <DivWin />
          ) : battleWin === 'firstWin' ? (
            <DivLose />
          ) : battleWin === 'draw' ? (
            <DivDraw />
          ) : null}{' '}
        </PokemonCard>
      ) : (
        <ImgCard src={card}></ImgCard>
      )}
      {isLoading && <IsLoading />}
      {isError && <h2>Unable to retrieve data</h2>}
    </DivArena>
  );
};

export default Arena;
const DivArena = styled.div`
  color: black;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  max-width: 100%;
  width: 100vw;
  @media (max-width: 721px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const ButtonArena = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  height: 390px;
  width: 100px;
  transition: border-color 0.25s;
  @media (max-width: 721px) {
    height: 100px;
    width: 320px;
  }
`;
const ImgCard = styled.img`
  widht: 320px;
  height: 390px;
`;
