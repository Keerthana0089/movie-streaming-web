import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "en-US";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
});

// 🔽 Fetch popular movies
export const fetchMovies = async () => {
  try {
    const response = await axiosInstance.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// 🔽 Fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    return null;
  }
};

// 🔽 Search movies by query
export const searchMovies = async (query) => {
  try {
    const response = await axiosInstance.get("/search/movie", {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error searching movies with query "${query}":`, error);
    return [];
  }
};

// 🔽 Fetch all genres
export const fetchGenres = async () => {
  try {
    const response = await axiosInstance.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axiosInstance.get("/discover/movie", {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}:`, error);
    return [];
  }
};

// 🔽 Fetch recommendations based on movie ID
export const fetchRecommendations = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching recommendations for movie ${movieId}:`, error);
    return [];
  }
};

// 🔽 Fetch movie images
export const fetchMovieImages = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/images`);
    return response.data.backdrops;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    return [];
  }
};

// 🔽 Fetch trending movies
export const fetchTrending = async () => {
  try {
    const response = await axiosInstance.get("/trending/movie/week");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
// 🔽 Fetch YouTube trailer for a movie
export const fetchTrailer = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/videos`);
    const trailers = response.data.results;
    const youtubeTrailer = trailers.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return youtubeTrailer?.key || null;
  } catch (error) {
    console.error(`Error fetching trailer for movie ${movieId}:`, error);
    return null;
  }
};

// 🔽 Fetch top-rated movies
export const fetchTopRated = async () => {
  try {
    const response = await axiosInstance.get("/movie/top_rated");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};

// 🔽 Fetch upcoming movies
export const fetchUpcoming = async () => {
  try {
    const response = await axiosInstance.get("/movie/upcoming");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};
