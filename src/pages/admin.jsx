import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

const API_URL = 'https://votingsystem-backend.onrender.com'; // Replace with your backend's base URL

const Admin = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch candidates from the backend
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/results`);
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      console.error(err);
      setError('Error fetching candidates');
    } finally {
      setLoading(false);
    }
  };

  // Add a new candidate
  const addCandidate = async () => {
    if (candidateName.trim() === '') {
      setError('Candidate name is required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/addCandidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: candidateName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add candidate');
      }

      const { candidateId, name, votes } = await response.json();
      setCandidates((prev) => [
        ...prev,
        { candidateId, name, votes },
      ]);
      setCandidateName(''); // Clear input field
      setError(''); // Clear errors
    } catch (err) {
      console.error(err);
      setError('Error adding candidate');
    }
  };

  // Remove a candidate
  const removeCandidate = async (candidateId) => {
    try {
      const response = await fetch(`${API_URL}/removeCandidate/${candidateId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove candidate');
      }

      // Remove the candidate from the UI
      setCandidates((prev) => prev.filter((candidate) => candidate._id !== candidateId));
    } catch (err) {
      console.error(err);
      setError('Error removing candidate');
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* Add Candidate Section */}
      <div className="add-candidate-section">
        <h2>Add Candidate</h2>
        <div className="form-group">
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Enter candidate name"
            className="input-field"
          />
          <button onClick={addCandidate} className="add-btn">
            Add Candidate
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Candidate List Section */}
      <div className="candidates-section">
        <h2>Candidates</h2>
        {loading ? (
          <p>Loading candidates...</p>
        ) : candidates.length === 0 ? (
          <p className="no-candidates">No candidates added yet.</p>
        ) : (
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Votes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.votes}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeCandidate(candidate._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
