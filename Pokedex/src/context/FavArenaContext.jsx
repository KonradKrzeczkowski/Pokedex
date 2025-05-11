import { createContext, useState } from 'react';
export const ArenaFavoriteContext = createContext(null);
export const ArenaFavoriteProvider = ({ children }) => {
  const [isArena, setIsArena] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const [isDbJson, setIsDbJson] = useState([]);
  const [isApi, setIsApi] = useState();
  const [isPokemonConnected, setIsPokemonConnected] = useState();
  return (
    <ArenaFavoriteContext.Provider
      value={{
        isArena,
        setIsArena,
        isFavorite,
        setIsFavorite,
        isDbJson,
        setIsDbJson,
        isApi,
        setIsApi,
        isPokemonConnected,
        setIsPokemonConnected,
      }}
    >
      {children}
    </ArenaFavoriteContext.Provider>
  );
};
