import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';  // useNavigate for redirection
import { useUser } from './UserContext';  // Import useUser to manage logged-in state
import '../styles/Navbar.css'; // Import the CSS for styling

const Navbar = () => {
  const location = useLocation();  // Get the current location to determine active page
  const navigate = useNavigate();  // Hook for navigation to different routes
  const { user, logout } = useUser(); // Get user data and logout function from context

  // Handle logout and redirect to the Home page
  const handleLogout = () => {
    logout();  // Clear user data in context
    navigate('/'); // Redirect to the Home page (or login page)
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Voting System</div>
        <div className="navbar-links">
          {/* If user is not logged in, show Register and Login */}
          {!user || !user.idNumber ? (
            <>
              <Link
                to="/"
                className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Register
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

              {/* Logout button for logged-in users */}
              <button className="navbar-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
