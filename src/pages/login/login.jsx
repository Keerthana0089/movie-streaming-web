import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FaUserAlt, FaLock } from "react-icons/fa";

const Login = ({ setIsAuth }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuth(true);
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box slide-in">
       <h2>Welcome Back!</h2>


        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <FaUserAlt className="icon" />
            <input
              type="text"
              placeholder="Username: admin"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password: 1234"
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          
<br/>
<p className="demo-info">
  <strong>Demo Credentials:</strong><br />
  Username: <code>admin</code><br />
  Password: <code>1234</code>
</p>
<br/>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
