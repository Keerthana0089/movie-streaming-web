// LandingPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/movieSlice";
import { fetchGenres } from "../../api/movieApi";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MovieCard from "../../components/MovieCard/MovieCard";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import Spinner from "../../components/Spinner/Spinner";
import "./landingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    dispatch(getMovies(selectedGenre));
  }, [dispatch, selectedGenre]);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  return (
    <div className="landing-page">
      <HeroBanner />
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error-text">Something went wrong: {error}</p>
      ) : (
        <div className="movie-list">
          {movies.slice(0, 30).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
