import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/netflix-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaSearch,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaFire,
  FaRobot,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { fetchTrending } from "../../api/movieApi";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
  const [aiSuggestedMovie, setAiSuggestedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAiSuggest = async () => {
    const data = await fetchTrending();
    if (data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)];
      setAiSuggestedMovie(random);
      setShowModal(true);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div
          className="navbar__logo-wrapper"
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => !showPopup && setShowPopup(false)}
          onClick={() => setShowPopup((prev) => !prev)}
          ref={popupRef}
        >
          <img src={logo} alt="App Logo" className="navbar__logo" />
          {localStorage.getItem("isAuthenticated") === "true" && showPopup && (
            <div className="user-info-popup">
              <p>👤 <strong>admin</strong></p>
              <p>✅ Authenticated</p>
              <p className="logout-hover" onClick={handleLogout}>🔓 Logout</p>
            </div>
          )}
        </div>

       <div className="navbar__menu">
  <Link
    to="/"
    title="Homepage – Explore top picks"
    className={`nav-item ${isActive("/") ? "active" : ""}`}
  >
    <FaHome className="nav-icon" />
    <span>Home</span>
  </Link>

  <Link
    to="/favorites"
    title="Favorites – Curated by your likes"
    className={`nav-item ${isActive("/favorites") ? "active" : ""}`}
  >
    <FaHeart className="nav-icon" />
    <span>Favorites</span>
  </Link>

  <Link
    to="/trending"
    title="Trending – Based on AI insights and popularity"
    className={`nav-item ${isActive("/trending") ? "active" : ""}`}
  >
    <FaFire className="nav-icon" />
    <span>Trending</span>
  </Link>

  <div
    title="Let AI suggest a movie for you"
    className="nav-item"
    onClick={handleAiSuggest}
    style={{ cursor: "pointer" }}
  >
    <FaRobot className="nav-icon" />
    <span>AI Suggest</span>
  </div>

  <Link
    to="/search"
    title="Search – Discover movies by keywords or genres"
    className={`nav-item ${isActive("/search") ? "active" : ""}`}
  >
    <FaSearch className="nav-icon" />
    <span>Search</span>
  </Link>
</div>

        <div className="navbar__right">
          <div className="theme-switch-wrapper" title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}>
  <button className="theme-toggle-btn" onClick={toggleTheme}>
    {theme === "dark" ? <FaSun className="sun-icon" /> : <FaMoon className="moon-icon" />}
  </button>
</div>


          {localStorage.getItem("isAuthenticated") === "true" && (
            <>
              <div className="nav-item logout-item" onClick={handleLogout}>
                <FaSignOutAlt className="nav-icon" />
                <span>Logout</span>
              </div>
            </>
          )}
        </div>
      </nav>

      {showModal && aiSuggestedMovie && (
        <div className="ai-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
            <h3>🤖 AI Suggests</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500${aiSuggestedMovie.poster_path}`}
              alt={aiSuggestedMovie.title}
            />
            <h4>{aiSuggestedMovie.title}</h4>
            <p>{aiSuggestedMovie.overview.slice(0, 120)}...</p>
            <span>⭐ {aiSuggestedMovie.vote_average}</span>
            
            <button onClick={() => setShowModal(false)} className="close-btn">
              <Link to={`/movie/${aiSuggestedMovie.id}`} className="watch-btn">
              ▶ Watch Now
            </Link>
              <br/>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
