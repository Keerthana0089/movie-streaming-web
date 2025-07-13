// store.js
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import themeReducer from "./themeSlice"; // Ensure this is valid too

const store = configureStore({
  reducer: {
    movies: movieReducer,
    theme: themeReducer,
  },
});

export default store;
