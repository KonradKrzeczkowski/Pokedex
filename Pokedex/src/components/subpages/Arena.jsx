import React, { useEffect, useState, useContext } from 'react';
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
import { ThemeContext } from '../../context/ThemeContext';

const Arena = () => {
  const { theme } = useContext(ThemeContext);
  const { pokemons, isLoading, isError } = useFetchDbJson();

  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);
  const [battleWin, setBattleWin] = useState('');
  const [winId, setWinId] = useState(null);
  const [loseId, setLoseId] = useState(null);
  const [baseExpFirst, setBaseExpFirst] = useState(null);
  const [baseExpSecond, setBaseExpSecond] = useState(null);
  const [finishBattle, setFinishBattle] = useState(false);
  const [winFirstPokemon, setWinFirstPokemon] = useState(null);
  const [loseFirstPokemon, setLoseFirstPokemon] = useState(null);
  const [winSecondPokemon, setWinSecondPokemon] = useState(null);
  const [loseSecondPokemon, setLoseSecondPokemon] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const filterPokemon = pokemons.filter((pokemon) => pokemon.arena);
    if (filterPokemon.length > 0) {
      const [first, second] = filterPokemon;
      setFirstPokemon(first);
      setSecondPokemon(second);
      setBaseExpFirst(Number(first?.base_experience));
      setWinFirstPokemon(Number(first?.win));
      setLoseFirstPokemon(Number(first?.lose));
      setWinSecondPokemon(Number(second?.win));
      setLoseSecondPokemon(Number(second?.lose));
      setBaseExpSecond(Number(second?.base_experience));
    } else {
      setFirstPokemon(null);
      setSecondPokemon(null);
    }
  }, [pokemons]);

  const handleBattle = () => {
    if (!firstPokemon || !secondPokemon) return;

    const firstPower =
      Number(firstPokemon.base_experience) * Number(firstPokemon.weight);
    const secondPower =
      Number(secondPokemon.base_experience) * Number(secondPokemon.weight);

    if (firstPower > secondPower) {
      setBattleWin('firstWin');
      setWinId(firstPokemon.id);
      setLoseId(secondPokemon.id);
      setBaseExpFirst((prev) => prev + 10);
      setWinFirstPokemon((prev) => prev + 1);
      setLoseSecondPokemon((prev) => prev + 1);
    } else if (firstPower < secondPower) {
      setBattleWin('secondWin');
      setWinId(secondPokemon.id);
      setLoseId(firstPokemon.id);
      setBaseExpSecond((prev) => prev + 10);
      setWinSecondPokemon((prev) => prev + 1);
      setLoseFirstPokemon((prev) => prev + 1);
    } else {
      setBattleWin('draw');
    }
    setFinishBattle(true);
  };
  const updatePokemonStat = (id, updates) => {
    axios
      .patch(`http://localhost:3000/pokemons/${id}`, updates)
      .then(() => console.log(`Zaktualizowano pokemona ${id}`))
      .catch((err) => console.error('Błąd przy zapisie:', err));
  };
  useEffect(() => {
    if (battleWin === 'firstWin') {
      updatePokemonStat(firstPokemon.id, {
        base_experience: baseExpFirst,
        win: winFirstPokemon,
      });
      updatePokemonStat(secondPokemon.id, {
        lose: loseSecondPokemon,
      });
    } else if (battleWin === 'secondWin') {
      updatePokemonStat(secondPokemon.id, {
        base_experience: baseExpSecond,
        win: winSecondPokemon,
      });
      updatePokemonStat(firstPokemon.id, {
        lose: loseFirstPokemon,
      });
    }
  }, [battleWin]);

  function handleOutArena() {
    const updatedArena = false;

    axios
      .patch(`http://localhost:3000/pokemons/${firstPokemon.id}`, {
        arena: updatedArena,
      })
      .then(() => {
        console.log('Usunięto pierwszego pokemona z areny');
        navigate('/');
      })
      .catch((err) =>
        console.error('Błąd przy zapisie pierwszego pokemona:', err)
      );

    axios
      .patch(`http://localhost:3000/pokemons/${secondPokemon.id}`, {
        arena: updatedArena,
      })
      .then(() => {
        console.log('Usunięto drugiego pokemona z areny');
      })
      .catch((err) =>
        console.error('Błąd przy zapisie drugiego pokemona:', err)
      );
  }

  return (
    <DivContainer style={theme}>
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
            win={winFirstPokemon}
            lose={loseFirstPokemon}
          >
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
            abilities={
              secondPokemon.abilities?.[0]?.ability?.name || 'Nieznane'
            }
            name={secondPokemon.name}
            height={secondPokemon.height}
            weight={secondPokemon.weight}
            sprites={secondPokemon.sprites}
            base_experience={baseExpSecond}
            id={secondPokemon.id}
            arena={secondPokemon.arena}
            favorite={secondPokemon.favorite}
            win={winSecondPokemon}
            lose={loseSecondPokemon}
          >
            {battleWin === 'secondWin' ? (
              <DivWin />
            ) : battleWin === 'firstWin' ? (
              <DivLose />
            ) : battleWin === 'draw' ? (
              <DivDraw />
            ) : null}
          </PokemonCard>
        ) : (
          <ImgCard src={card}></ImgCard>
        )}
        {isLoading && <IsLoading />}
        {isError && <h2>Unable to retrieve data</h2>}
      </DivArena>
    </DivContainer>
  );
};

export default Arena;
const DivArena = styled.div`
  color: black;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  max-width: 100%;
  width: 98vw;
   @media (max-width: 721px) {
    flex-direction: column;
    align-items: center;
        gap:30px;
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
  color: white;
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
  width: 320px;
  height: 390px;
`;

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
`;
