import React, { useState } from 'react';
import { useUser } from '../components/UserContext';  // Import the useUser hook
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();  // Destructure the login function from the context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate the ID number (should be 13 digits)
    const idRegex = /^\d{13}$/;
    if (!idRegex.test(idNumber)) {
      setError('ID number must be exactly 13 digits');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, update the user context with user data (ID number and role)
        login({ idNumber, role: data.role });  // We store both ID and role in context

        // Navigate based on the role
        if (data.role === 'admin') {
          navigate('/admin');  // Navigate to admin dashboard if admin
        } else {
          navigate('/vote');  // Navigate to the voting page if voter
        }
      } else {
        setError(data.message || 'Invalid ID number');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Number</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="Enter your 13-digit ID number"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
