import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const dark = {
    background: "#182222",
    color: "#FFFAF0",
    
  };
  const light = {
    background: "#FFFAF0",
    color: "#182222",

  };
  const [theme, setTheme] = useState(light);
  const [changeTheme, setChangeTheme] = useState(false);
  useEffect(() => {
    console.log('%c[ThemeContext] changeTheme =', 'color: purple', changeTheme);
    setTheme(changeTheme ? dark : light);
  }, [changeTheme]);
  console.log(changeTheme)
  return (
    <ThemeContext.Provider value={{ theme, changeTheme, setChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};