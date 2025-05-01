import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';

function Modals({ selectedPokemon, isChecked, setIsChecked }) {
  function handleClose() {
    setIsChecked((prev) => !prev);
  }
return (
    <div>
      <Modal
        style={{ color: 'black' }}
        open={isChecked}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BoxImg sx={{ mt: 2 }}>
            <ImgModal
              src={selectedPokemon?.sprites?.other.dream_world.front_default}
              alt={
                selectedPokemon?.name.charAt(0).toUpperCase() +
                name.slice(1).toLowerCase()
              }
            />
          </BoxImg>
           <Box>
            <BoxName>
              <TypographySpeciesCard id="modal-modal-title" variant="h6" component="h2">
                <h2>
                {selectedPokemon?.name.charAt(0).toUpperCase() +
                    selectedPokemon?.name.slice(1).toLowerCase()}
                </h2>
              </TypographySpeciesCard>
            </BoxName>
            <BoxDiv>
              <TypographySpeciesCard>
          <p>{selectedPokemon?.height}</p>
                <h4> Height</h4>
              </TypographySpeciesCard>
              <TypographySpeciesCard> 
                <p>{selectedPokemon?.base_experience}</p>
                <h4>Experience</h4>
              </TypographySpeciesCard>
              <TypographySpeciesCard>  
                <p>{selectedPokemon?.weight}</p>
                <h4>Weight</h4>
              </TypographySpeciesCard>
 <TypographySpeciesCard>
            <p> {selectedPokemon?.abilities?.[0]?.ability?.name
                    .charAt(0)
                    .toUpperCase() +
                    selectedPokemon?.name.slice(1).toLowerCase()}
                </p>
                <h4>Ability </h4>
              </TypographySpeciesCard>
            </BoxDiv>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Modals;
const BoxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-evenly;
`;
const BoxName = styled.div`
  display: flex;
  justify-content: center;
`;
const ImgModal = styled.img`
  width: 200px;
  height: 200px;
`;
const BoxImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const TypographySpeciesCard=styled.div`
display:flex;
flex-direction:column;
align-items:center;`
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  boxShadow: '12px 12px 20px rgba(168, 168, 168, 0.84)',
 borderRadius: '8px',
 display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
 background: 'linear-gradient(45deg, grey 25%, white 50%, grey 75%)',
  alignItems: 'center',
  pt: 2,
  px: 4,
  pb: 3,
};