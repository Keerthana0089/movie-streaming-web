import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../components/MovieCard/MovieCard";
import { FavoritesContext } from "../context/FavoritesContext";

const movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
};

test("renders MovieCard with title", () => {
  render(
    <FavoritesContext.Provider value={{ favorites: [], addToFavorites: () => {}, removeFromFavorites: () => {} }}>
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    </FavoritesContext.Provider>
  );

  expect(screen.getByText("Test Movie")).toBeInTheDocument();
});
