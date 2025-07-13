import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const navigate = useNavigate();

  const toggleFavorite = (e) => {
    e.stopPropagation(); // avoid navigation on heart click
    isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
  <div className="movie-card" onClick={handleCardClick}>
    <div className="top-overlay">
      <div className="rating">⭐ {movie.vote_average.toFixed(1)}</div>
    </div>

    <img
      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
      alt={movie.title}
    />

    <div className="bottom-overlay">
      <h3 title={movie.title}>
  {movie.title.length > 25 ? movie.title.slice(0, 22) + "..." : movie.title}
</h3>

      <button
        className={`fav-btn ${isFavorite ? "favorited" : ""}`}
        onClick={toggleFavorite}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
        {isFavorite ? " Favorited" : " Add to Favorites"}
      </button>
    </div>
  </div>
);

};

export default MovieCard;
