import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import LandingPage from "./pages/landingPage/landingPage";
import SearchPage from "./pages/search/search";
import MovieDetails from "./pages/movieDetails/movieDetails";
import Favorites from "./pages/favorites/favorites";
import NotFound from "./components/NotFound/NotFound";
import Login from "./pages/login/login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";
import "./styles/themes.css";
import { ThemeProvider } from "./context/ThemeContext";
import Trending from "./pages/Trending/Trending";



// Wrapper to use useLocation
const AppRoutes = ({ isAuth, setIsAuth }) => {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Show Navbar only if user is authenticated and not on login page */}
      {isAuth && location.pathname !== "/login" && (
        <Navbar setIsAuth={setIsAuth} />
      )}

      <Routes>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/trending" element={<ProtectedRoute isAuth={isAuth}>
              <Trending />
            </ProtectedRoute> }/>
        <Route
          path="/search"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuth(auth);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
