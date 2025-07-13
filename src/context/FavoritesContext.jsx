// context/FavoritesContext.js
import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage"; // make sure path is correct

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (!prev.some((m) => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };
  const clearFavorites = () => {
    setFavorites([]); 
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites,clearFavorites  }}>
      {children}
    </FavoritesContext.Provider>
  );
};
