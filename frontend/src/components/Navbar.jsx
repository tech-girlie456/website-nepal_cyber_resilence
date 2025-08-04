// nepal-cyber-resilience-frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut, FiHome, FiUpload, FiFileText, FiLock, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout: contextLogout } = useContext(UserContext);

  const handleLogout = () => {
    contextLogout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand">
            <span className="brand-text">Nepal Cyber Resilience</span>
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <FiHome className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>
            <FiInfo className="nav-icon" />
            <span>About</span>
          </Link>
          <Link to="/quiz" className={`nav-link ${isActive('/quiz')}`}>
            <FiFileText className="nav-icon" />
            <span>Cybersecurity Quiz</span>
          </Link>

          <Link to="/threat-alerts" className={`nav-link ${isActive('/threat-alerts')}`}>
            <FiAlertCircle className="nav-icon" />
            <span>Threat Alerts</span>
          </Link>

          {user && (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                <FiFileText className="nav-icon" />
                <span>Dashboard</span>
              </Link>
              <Link to="/upload" className={`nav-link ${isActive('/upload')}`}>
                <FiUpload className="nav-icon" />
                <span>Upload</span>
              </Link>
            </>
          )}
        </div>
        
        <div className="user-section">
          {user ? (
            <div className="user-info">
              <Link to="/profile" className="user-email">{user.name || user.email}</Link>
              <button onClick={handleLogout} className="logout-button">
                <FiLogOut className="logout-icon" /> Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                Log in
              </Link>
              <Link to="/register" className="signup-button">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;