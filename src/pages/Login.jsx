// Login Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
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
      const response = await fetch('https://votingsystem-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store voter details in localStorage
        localStorage.setItem('voter', JSON.stringify({ email: data.email, idNumber, role: data.role }));

        // Navigate to the appropriate page based on the role
        if (data.role === 'admin') {
          navigate('/admin');
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
