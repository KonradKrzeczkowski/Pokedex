import React, { useContext } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Edit from '../subpages/Edit';
import Registration from '../subpages/Registration';
import Log from '../subpages/log';
import Ranking from '../subpages/Ranking';
import Home from '../subpages/Home';
import Favorites from '../subpages/Favorites';
import Arena from '../subpages/Arena';
import NewPokemon from './NewPokemon';
import PokemonEdit from './PokemonEdit';
import { ThemeContext } from '../../context/ThemeContext';
import { LoginContext } from '../../context/LoginContext';
import styled from 'styled-components';

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  const { user, logOut } = useContext(LoginContext);
  const navigate = useNavigate();

  const isAuthenticated = !!user || !!localStorage.getItem('user');

  const handleLogout = () => {
    logOut?.();
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={theme}>
      <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <DivOutlet>
        <Outlet />
      </DivOutlet>
    </div>
  );
};

const Nav = ({ isAuthenticated, onLogout }) => (
  <nav>
    <UlNavigate>
      {isAuthenticated ? (
        <>
          <NavItem to="/edit">Edit</NavItem>
          <NavItem to="/favorites">Favorites</NavItem>
          <NavItem to="/ranking">Ranking</NavItem>
          <NavItem to="/arena">Arena</NavItem>
          <NavItem as="button" onClick={onLogout}>
            Logout
          </NavItem>
        </>
      ) : (
        <>
          <NavItem as="button" disabled>
            Favorites
          </NavItem>
          <NavItem as="button" disabled>
            Ranking
          </NavItem>
          <NavItem as="button" disabled>
            Arena
          </NavItem>
        </>
      )}

      {!isAuthenticated && (
        <>
          <NavItem to="/log">Login</NavItem>
          <NavItem to="/log/registration">Register</NavItem>
        </>
      )}
    </UlNavigate>
  </nav>
);

const NavItem = ({ to, as = 'li', children, onClick, disabled }) => (
  <LiNavigation as={as} onClick={onClick} disabled={disabled}>
    {to ? <Link to={to}>{children}</Link> : children}
  </LiNavigation>
);

const Navigation = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="newPokemon" element={<NewPokemon />} />
      <Route path="edit" element={<Edit />} />
      <Route path="pokemonEdit" element={<PokemonEdit />} />
      <Route path="log/registration" element={<Registration />} />
      <Route path="ranking" element={<Ranking />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="arena" element={<Arena />} />
      <Route path="log" element={<Log />} />
    </Route>
  </Routes>
);

export default Navigation;

const LiNavigation = styled.li`
  background: darkblue;
  color: white;
  padding: 0 8px;
  border-radius: 8px;
  margin: 0 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  border: 2px solid transparent;

  a,
  button {
    text-decoration: none;
    color: white;
    background: none;
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 8px 0;
    cursor: inherit;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  ${({ disabled }) =>
    !disabled &&
    `
    &:hover {
      border: 2px solid white;
    }
  `}

  @media (max-width: 640px) {
    margin: 4px 10px;
    padding: 4px 0;
    width: 80%;
  }
`;

const DivOutlet = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  max-width: 100%;
  min-height:100vh;
`;

const UlNavigate = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
  list-style: none;
  padding: 10px 0;
  margin: 0;

  @media (max-width: 640px) {
    flex-direction: column;
    margin: 4px 0;
    align-items: center;
  }
`;
