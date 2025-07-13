// movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies, fetchMoviesByGenre } from "../api/movieApi";

// 🔹 Thunk for fetching movies (with or without genre)
export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (genreId, thunkAPI) => {
    try {
      return genreId ? await fetchMoviesByGenre(genreId) : await fetchMovies();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch movies");
    }
  }
);

// 🔹 Slice definition
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching movies";
      });
  },
});

// ✅ Export the reducer as default
export default movieSlice.reducer;
