import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const dark = {
    background: "black",
    color: "#FFFAF0",
  };
  const light = {
    background: "white",
    color: "#182222",
  };

  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme === "dark" ? dark : light;

  const [theme, setTheme] = useState(initialTheme);
  const [changeTheme, setChangeTheme] = useState(savedTheme === "dark");


  useEffect(() => {
    const currentTheme = changeTheme ? dark : light;
    setTheme(currentTheme);


    localStorage.setItem("theme", changeTheme ? "dark" : "light");
  }, [changeTheme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, setChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};