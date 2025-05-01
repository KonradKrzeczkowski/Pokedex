import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import ButtonFavorite from './ButtonFavorite';
import ButtonAddArena from './ButtonAddArena';
import { LoginContext } from '../../context/LoginContext';

const PokemonCard = ({
  onClick,
  name,
  weight,
  height,
  sprites,
  abilities,
  id,
  base_experience,
children,
  win,
  lose,

}) => {
    const { isLoggedIn } = useContext(LoginContext);
  return (
    <DivPokemonCard onClick={onClick} key={id} style={{ maxWidth: '320px' }}>
   { isLoggedIn&&  (win > 0 || lose > 0) ?(
   <DivWinLoseLogin>
          <PWinLose>win : {win}</PWinLose>
          <PWinLose>lose : {lose}</PWinLose>
        </DivWinLoseLogin>
      ): (<DivWinLose         >  </DivWinLose>)} 
      <DivName>
        <DivImg >
          <ImgPokemonCard
          src={sprites?.other.dream_world.front_default}
          ></ImgPokemonCard>{' '}
        </DivImg>
        <H3Name >{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</H3Name>
      </DivName>
      <DivSpecies>
        <DivSpeciesCard>
        <p>{height}</p>
          <PSpecies>Height</PSpecies>
        </DivSpeciesCard>
        <DivSpeciesCard>
     <p>{abilities.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
          <PSpecies>Abilities</PSpecies>
        </DivSpeciesCard>
        <DivSpeciesCard>
          <p>{weight}</p>
          <PSpecies>Weight</PSpecies>
        </DivSpeciesCard>
        <DivSpeciesCard>
        <p>{base_experience}</p>
          <PSpecies>Base Experience</PSpecies>
        </DivSpeciesCard>
      </DivSpecies>
      <DivButton>
       { isLoggedIn&&<ButtonAddArena id={id} />}
         {isLoggedIn&&<ButtonFavorite id={id}>
      </ButtonFavorite>}
      </DivButton>
      {children}
    </DivPokemonCard>
  );
};

export default PokemonCard;

const DivSpeciesCard=styled.div`
display:flex;
flex-direction:column;
align-items:center;`
const PSpecies=styled.p`
font-weight:700;
color:black;`
const DivName = styled.div`
 display: grid;
  grid-template-rows: repeat(2, auto);
  flex-direction: column;
  justify-content: center;
  border-radius:8px;
`;
const DivSpecies = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const DivPokemonCard = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(2, auto);
background:linear-gradient(45deg, grey 25%, beige 50%, grey 75%);
  margin: 0.5rem;
  max-height: 450px;
  max-width: 320px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  min-width: 300px;
  min-height:390px;
  box-shadow: 12px 12px 11px rgb(129, 129, 129);
&:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
const DivButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:end;
`;
const PWinLose = styled.p`
  display: flex;
`;
const H3Name=styled.h3`
display:flex;
justify-content:center;
color:black;
`
const DivWinLoseLogin=styled.div`
 background: black;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 8px;         
`
const DivWinLose=styled.div`
 margin:"0",
        padding:0;
        width: 50px;
        height: 50px;
        borderRadius: 8px;      
`
const ImgPokemonCard=styled.img`
    max-height: 110px;
     max-width: 110px;
`
const DivImg=styled.div`
display:flex;`