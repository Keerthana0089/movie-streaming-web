import React, { useEffect, useState } from "react";
import "./HeroBanner.css";
import { fetchMovies } from "../../api/movieApi";

const HeroBanner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchMovies();
      setMovies(data.slice(0, 10));
    }
    loadMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies]);

  const goTo = (index) => {
    setCurrentIndex((index + movies.length) % movies.length);
  };

  return (
    <div className="hero-banner-slider">
      <div
        className="hero-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movies.map((movie, idx) => (
          <div
            key={movie.id}
            className="hero-slide"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="hero-content">
              <h1>{movie.title || movie.name}</h1>
              <p>{movie.overview?.substring(0, 250)}...</p>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-arrow left" onClick={() => goTo(currentIndex - 1)}>‹</button>
      <button className="hero-arrow right" onClick={() => goTo(currentIndex + 1)}>›</button>
    </div>
  );
};

export default HeroBanner;
