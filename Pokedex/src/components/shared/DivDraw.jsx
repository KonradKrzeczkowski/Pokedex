import React from 'react'
import styled from 'styled-components'
const DivDraw = () => {
  return (
    <DrawDiv>
      Remis
    </DrawDiv>
  )
}

export default DivDraw
const DrawDiv=styled.div`
position: absolute;
border-radius:8px;
color:white;
  box-shadow: 12px 12px 11px 12px rgb(142, 158, 48);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(99, 114, 11, 0.4); 
  z-index: 999; 
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 36px;
  font-weight: bold;`
