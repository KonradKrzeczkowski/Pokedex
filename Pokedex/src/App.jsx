import { SnackbarProvider } from 'notistack';
import { LoginProvider } from './context/LoginContext';
import Navigation from './components/shared/Navigation';
import styled from 'styled-components';
import { Switch } from '@mui/material';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import pokemon from './icons/pokemonLogo.png';
import { ArenaFavoriteProvider } from './context/FavArenaContext';
import { useNavigate } from 'react-router-dom';
function App() {
  const { theme, changeTheme, setChangeTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleCheckboxChange = () => {
 setChangeTheme((prev) => !prev);
   };
  const userName = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <LoginProvider>
        <ArenaFavoriteProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <DivNav style={theme}>
            <ImgPokemon
              onClick={() => navigate('/')}
              src={pokemon}
            ></ImgPokemon>
            <DivSwitchName style={{maxWidth:"100vw"}}>
            
              {userName && (
                <PName>
                  {userName.name.charAt(0).toUpperCase() +
                    userName?.name.slice(1).toLowerCase()}
                </PName>
              )}
              <Switch
                aria-label="theme"
                checked={changeTheme === true}
                onChange={handleCheckboxChange}
                name="theme-toggle"
                color="primary"
              />
            </DivSwitchName>
          </DivNav>
          <Navigation />
        </SnackbarProvider>
        </ArenaFavoriteProvider>
      </LoginProvider>
    </>
  );
}

export default App;
const DivSwitchName = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 0;
  padding: 0;
`;
const ImgPokemon = styled.img`
  max-height: 60px;
  max-width: 100px;
`;
const DivNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;
const PName = styled.p`
  font-width: 700;
  font-size: 20px;
`;
