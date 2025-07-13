import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./favorites.css";

const Favorites = () => {
  const { favorites, clearFavorites } = useContext(FavoritesContext);

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2>Your Favorites</h2>
        {favorites.length > 0 && (
          <button className="clear-btn" onClick={clearFavorites}>
            🗑 Clear Favorites
          </button>
        )}
      </div>

      {favorites.length > 0 && (
        <p className="favorites-count">Number of Favorites: {favorites.length}</p>
      )}

      {favorites.length === 0 ? (
        <div className="empty-box">
          <p className="empty">You haven’t added any favorites yet 💔</p>
        </div>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
