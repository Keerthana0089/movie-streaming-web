import React, { useEffect, useState } from "react";
import {
  fetchTrending,
  fetchTopRated,
  fetchUpcoming,
  fetchTrailer,
} from "../../api/movieApi";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import "./Trending.css";
import { FaFire, FaStar, FaFilm } from "react-icons/fa";

const TABS = {
  trending: <><FaFire /> Trending</>,
  topRated: <><FaStar /> Top Rated</>,
  upcoming: <><FaFilm /> Upcoming</>,
};

const Trending = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [trendingData, setTrendingData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [topTrailerKey, setTopTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial fetch for all categories once
  useEffect(() => {
    const fetchAllCategories = async () => {
      const [trending, topRated, upcoming] = await Promise.all([
        fetchTrending(),
        fetchTopRated(),
        fetchUpcoming(),
      ]);
      setTrendingData(trending);
      setTopRatedData(topRated);
      setUpcomingData(upcoming);
    };
    fetchAllCategories();
  }, []);

  // Update tab data when activeTab changes
  useEffect(() => {
    const loadTabData = async () => {
      setLoading(true);
      let selected = [];

      if (activeTab === "trending") selected = trendingData;
      else if (activeTab === "topRated") selected = topRatedData;
      else if (activeTab === "upcoming") selected = upcomingData;

      setMovies(selected);

      if (selected.length > 0) {
        const trailerKey = await fetchTrailer(selected[0].id);
        setTopTrailerKey(trailerKey);
      }

      setLoading(false);
    };

    loadTabData();
  }, [activeTab, trendingData, topRatedData, upcomingData]);

  if (loading || movies.length === 0) return <Spinner />;

  const topMovie = movies[0];

  return (
    <div className="trending-page">
      {/* 🚀 Tabs */}
      <div className="tab-buttons">
        {Object.entries(TABS).map(([key, label]) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 🔥 Featured Banner */}
      <div className="featured-banner">
        {topTrailerKey ? (
          <iframe
            className="trailer-bg"
            src={`https://www.youtube.com/embed/${topTrailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${topTrailerKey}`}
            title="Top Movie Trailer"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          ></iframe>
        ) : (
          <div
            className="fallback-banner"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${topMovie.backdrop_path || topMovie.poster_path})`,
            }}
          ></div>
        )}

        <div className="overlay-content">
          <h1>{topMovie.title}</h1>
          <p>{topMovie.overview?.slice(0, 180)}...</p>
          <span className="rating">⭐ {topMovie.vote_average} / 10</span>
          <Link to={`/movie/${topMovie.id}`} className="watch-btn">
            ▶ Watch Now
          </Link>
        </div>
      </div>

      {/* 🎬 List of Movies */}
      <h2 className="section-heading">📈 {TABS[activeTab]} Picks</h2>
      <div className="trending-list">
        {movies.slice(1).map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="trending-card"
          >
            <div
              className="trending-image"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path})`,
              }}
            ></div>
            <div className="trending-info">
              <h2>{movie.title || movie.name}</h2>
              <p>{movie.overview.slice(0, 120)}...</p>
              <span>⭐ {movie.vote_average}</span>
            </div>
          </Link>
        ))}
        


      </div>
    </div>
  );
};

export default Trending;
