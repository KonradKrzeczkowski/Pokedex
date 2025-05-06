import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import Log from '../subpages/log';
const LogInOutButton = () => {
  const { isLoggedIn, logOut } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();            
    navigate('/');  
    localStorage.removeItem('user');
  };

  if (isLoggedIn) {
    return <Link onClick={handleLogout}>Logout</Link>;
  } else {
    return <Link to="/log">Zaloguj</Link>;
  }
};

export default LogInOutButton;