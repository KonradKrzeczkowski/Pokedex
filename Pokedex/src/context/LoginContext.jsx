import { createContext, useState,useEffect} from "react";
export const LoginContext = createContext(null);
export const LoginProvider = ({ children }) => {
 
  const storedLoginState = JSON.parse(localStorage.getItem('isLoggedIn'));
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginState || false);
  useEffect(() => {
 localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn,logOut }}>
      {children}
    </LoginContext.Provider>
  );
};