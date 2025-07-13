const Navbar = ({ setIsAuth }) => {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuth(false);
  };

  return (
    <nav className="navbar">
      ...
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};