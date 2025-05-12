import React from 'react'
import styled from 'styled-components'
const DivWin = () => {
  return (
    <WinDiv>
      <h1>Winner</h1>
  <h3>Experience +10</h3>
  <h3>Win +1</h3>
    </WinDiv>
  )
}

export default DivWin
const WinDiv=styled.div`
position: absolute;
border-radius:8px;
color:white;
  display:flex;
flex-direction: column;
box-shadow: 12px 12px 11px 12px rgb(17, 139, 23);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(25, 158, 80, 0.4); 
  z-index: 999; 
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;`
