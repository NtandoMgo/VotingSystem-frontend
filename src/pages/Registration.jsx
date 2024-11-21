import React, { useState, useEffect } from 'react';
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
  const [showConfirmation, setShowConfirmation] = useState(false); // State to handle the confirmation prompt
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

      // If a candidate was selected, show the confirmation modal
      if (selectedCandidate) {
        setShowConfirmation(true);
      } else {
        // If no candidate is selected, just redirect to the voting page
        setSuccessMessage('Registration successful');
        setTimeout(() => navigate('/vote'), 2000);
      }

    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    }
  };

  // Handle confirmation of voting
  const handleConfirmVote = async () => {
    try {
      const voteResponse = await fetch('https://votingsystem-backend.onrender.com/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, candidateName: selectedCandidate }),
      });

      const voteData = await voteResponse.json();
      if (!voteResponse.ok) throw new Error(voteData.message || 'Voting failed');

      setSuccessMessage(voteData.message || 'Vote successfully cast!');
      setTimeout(() => navigate('/'), 2000); // Redirect to the home page after voting
    } catch (err) {
      setError(err.message || 'Failed to cast vote');
    }
  };

  // Handle cancellation of the voting confirmation
  const handleCancelVote = () => {
    setShowConfirmation(false); // Close the confirmation prompt
    setSuccessMessage('Registration successful');
    setTimeout(() => navigate('/vote'), 2000); // Redirect to the voting page if no voting action is confirmed
  };

  return (
    <div className="register-form">
      <h2>Voter Registration</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      
      {/* Registration form */}
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

      {/* Confirmation modal if a candidate was selected */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>You're about to vote for {selectedCandidate}. Please confirm.</p>
          <button onClick={handleConfirmVote}>Confirm</button>
          <button onClick={handleCancelVote}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Registration;
