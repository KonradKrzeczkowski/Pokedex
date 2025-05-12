import React from 'react'
import styled from 'styled-components'
const DivLose = () => {
  return (
    <LoseDiv>
       <h1>Loser</h1>
        <h4>Lose +1</h4>
    </LoseDiv>
  )
}

export default DivLose
const LoseDiv=styled.div`
position: absolute;
border-radius:8px;
color:white;
box-shadow: 12px 12px 11px 12px rgb(119, 15, 29);
  display:flex;
flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
    background-color: rgba(165, 8, 8, 0.4); 
     z-index: 999; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;`
