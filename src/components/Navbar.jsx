import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Voting System
        </Link>
        <ul className="navbar-menu">
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
