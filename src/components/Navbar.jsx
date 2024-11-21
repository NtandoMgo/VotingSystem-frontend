import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import HelpPopup from './HelpPopup';  // Import the HelpPopup component
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false); // State to control the guide popup visibility

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login'); // Redirect to login
  };

  const handleGuideToggle = () => {
    setShowGuide(!showGuide); // Toggle guide visibility
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Voting System
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          {!user.idNumber ? (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <span className="navbar-link">
                  {user.role === 'admin' ? 'Admin' : 'Voter'}: {user.idNumber}
                </span>
              </li>
              <li>
                <button className="navbar-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
          <li>
            <button className="navbar-link" onClick={handleGuideToggle}>
              Guide
            </button>
          </li>
        </ul>
      </div>

      {/* Show the HelpPopup when showGuide is true */}
      {showGuide && <HelpPopup closePopup={handleGuideToggle} />}
    </nav>
  );
};

export default Navbar;
