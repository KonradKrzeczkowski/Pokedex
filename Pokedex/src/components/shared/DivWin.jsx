import React from 'react'
import styled from 'styled-components'
const DivWin = () => {
  return (
    <WinDiv>
     Winner
    </WinDiv>
  )
}

export default DivWin
const WinDiv=styled.div`
position: absolute;
border-radius:8px;
color:white;
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

  font-size: 36px;
  font-weight: bold;`
