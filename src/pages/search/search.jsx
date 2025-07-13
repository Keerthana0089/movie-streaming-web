import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Spinner from "../../components/Spinner/Spinner";
import { FaSearch } from "react-icons/fa";
import "./search.css";
import { fetchMovies } from "../../api/movieApi"; // ✅ Your custom API function

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔽 Fetch all movies when page loads
  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setLoading(false);
    };
    loadMovies();
  }, []);

  // 🔽 Filter results based on search input
  useEffect(() => {
    const trimmedQuery = query.toLowerCase().trim();

    if (trimmedQuery === "") {
      setFilteredMovies([]);
    } else {
      const results = movies.filter((movie) => {
        const name = movie.title || movie.name || "";
        return name.toLowerCase().includes(trimmedQuery);
      });
      setFilteredMovies(results);
    }
  }, [query, movies]);

  return (
    <div className="search-page">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for movies or shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : query.trim() === "" ? (
        <p className="empty">Start typing to search for movies 🎬</p>
      ) : filteredMovies.length === 0 ? (
        <p className="empty">No results found for "{query}" 😢</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
