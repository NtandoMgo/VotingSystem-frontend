import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';  // Import useUser to manage logged-in state
import '../styles/Navbar.css';  // Import the CSS for styling
import HelpPopup from './HelpPopup';  // Import the HelpPopup component

const Navbar = () => {
  const location = useLocation();  // Get the current location to determine active page
  const navigate = useNavigate();  // Hook for navigation to different routes
  const { user, logout } = useUser();  // Get user data and logout function from context

  const [isHelpOpen, setIsHelpOpen] = useState(false);  // State to control Help popup visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to manage hamburger menu toggle

  // Handle logout and redirect to the Home page
  const handleLogout = () => {
    logout();  // Clear user data in context
    navigate('/'); // Redirect to the Home page (or login page)
  };

  // Toggle the Help popup visibility
  const toggleHelpPopup = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  // Toggle the hamburger menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle the menu state
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Voting System</div>

          {/* Hamburger Icon for Mobile */}
          <div className="hamburger-icon" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {/* Navbar Links */}
          <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            {!user || !user.idNumber ? (
              <>
                <Link
                  to="/"
                  className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <button className="navbar-link-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
            <button onClick={toggleHelpPopup} className="navbar-link-help-btn">
              Help
            </button>
          </div>
        </div>
      </nav>

      {isHelpOpen && <HelpPopup closePopup={toggleHelpPopup} />}
    </>
  );
};

export default Navbar;
