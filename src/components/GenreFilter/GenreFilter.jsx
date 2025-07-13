import React from "react";
import "./GenreFilter.css";

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-button ${selectedGenre === genre.id ? "active" : ""}`}
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
