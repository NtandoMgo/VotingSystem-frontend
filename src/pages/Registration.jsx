import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idNumber: '',
    province: '', // New field for province
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await fetch('https://votingsystem-backend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Include province in form data
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      // Save voter details in localStorage
      localStorage.setItem('voter', JSON.stringify(formData));

      setSuccessMessage(data.message || 'Registration successful');
      setTimeout(() => navigate('/login'), 2000); // Redirect to voting page after 2 seconds
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
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
            <option value="North West">North West</option>
            <option value="Western Cape">Western Cape</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
