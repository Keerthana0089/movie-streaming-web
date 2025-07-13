import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar/NavBar";
import { ThemeProvider } from "../context/ThemeContext";

test("renders Navbar links", () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </ThemeProvider>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Favorites")).toBeInTheDocument();
  expect(screen.getByText("Search")).toBeInTheDocument();
});
