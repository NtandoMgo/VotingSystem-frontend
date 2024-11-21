import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idNumber: '',
    province: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get the candidate data

  const selectedCandidate = location.state?.candidate || null; // Retrieve selected candidate

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate fields
  const validateForm = () => {
    const { name, email, idNumber, province } = formData;
    const emailRegex = /\S+@\S+\.\S+/;
    const idRegex = /^\d{13}$/;

    if (!name || !email || !idNumber || !province) return 'All fields are required';
    if (!emailRegex.test(email)) return 'Invalid email address';
    if (!idRegex.test(idNumber)) return 'ID Number must be exactly 13 digits';
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Register voter
      const registrationResponse = await fetch('https://votingsystem-backend.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const registrationData = await registrationResponse.json();
      if (!registrationResponse.ok) throw new Error(registrationData.message || 'Registration failed');

      // Automatically cast a vote after registration
      if (selectedCandidate) {
        const voteResponse = await fetch('https://votingsystem-backend.onrender.com/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, candidateName: selectedCandidate }),
        });

        const voteData = await voteResponse.json();
        if (!voteResponse.ok) throw new Error(voteData.message || 'Voting failed');
        setSuccessMessage(voteData.message || 'Vote successfully cast!');
      }

      // Redirect to the home page after success
      setTimeout(() => navigate('/', { state: { successMessage: 'Registration and voting completed successfully!' } }), 2000);
    } catch (err) {
      setError(err.message || 'An error occurred during registration or voting');
    }
  };

  return (
    <div className="register-form">
      <h2>Voter Registration</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label>ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="Enter your 13-digit ID number"
            required
          />
        </div>
        <div>
          <label>Province</label>
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          >
            <option value="">Select Province</option>
            <option value="Western Cape">Western Cape</option>
            <option value="Eastern Cape">Eastern Cape</option>
            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
            <option value="Gauteng">Gauteng</option>
            <option value="Mpumalanga">Mpumalanga</option>
            <option value="Limpopo">Limpopo</option>
            <option value="Free State">Free State</option>
            <option value="North West">North West</option>
            <option value="Northern Cape">Northern Cape</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
