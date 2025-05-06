import React from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import Edit from '../subpages/Edit';
import Registration from '../subpages/Registration';
import Log from '../subpages/log';
import Ranking from '../subpages/Ranking';
import Home from '../subpages/Home';
import Favorites from '../subpages/Favorites';
import Arena from '../subpages/Arena';
import LogInOutButton from './LogInOutButton';
import NewPokemon from './NewPokemon';
import PokemonEdit from './PokemonEdit';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styled from 'styled-components';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/log" replace />;
};
const ProtectedRouteLogin = ({ children }) => {
  const isAuthenticatedLogin = !!localStorage.getItem('user');
  return !isAuthenticatedLogin ? children : <Navigate to="/" replace />;
};

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={theme}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0',
          padding: '0',
          width: '100%',
        }}
      >
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            gap: '10px',
            margin: '0',
            padding: '0',
          }}
        >
          <LiNavigation>
            <Link to="/edit">Edit</Link>
          </LiNavigation>
          <LiNavigation>
            <Link to="/favorites">Favorites</Link>
          </LiNavigation>
          <LiNavigation>
            <Link to="/ranking">Ranking</Link>
          </LiNavigation>
          <LiNavigation>
            <Link to="/arena">Arena</Link>
          </LiNavigation>
          <LiNavigation>
            <LogInOutButton />
          </LiNavigation>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="newPokemon"
          element={
            <ProtectedRoute>
              <NewPokemon />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
            <Route
          path="pokemonEdit"
          element={
            <ProtectedRoute>
              <PokemonEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="log/registration"
          element={
            <ProtectedRouteLogin>
              <Registration />
            </ProtectedRouteLogin>
          }
        />
        <Route
          path="ranking"
          element={
            <ProtectedRoute>
              <Ranking />
            </ProtectedRoute>
          }
        />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="arena"
          element={
            <ProtectedRoute>
              <Arena />
            </ProtectedRoute>
          }
        />
        <Route
          path="log"
          element={
            <ProtectedRouteLogin>
              <Log />
            </ProtectedRouteLogin>
          }
        />
      </Route>
    </Routes>
  );
};

export default Navigation;
const LiNavigation = styled.li`
  background: blue;
  color: black;
  padding: 2px;
  border-radius: 8px;
`;
