import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Voting.css';

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const voter = JSON.parse(localStorage.getItem('voter')); // Retrieve voter details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('https://votingsystem-backend-1.onrender.com/results');
        setCandidates(response.data);
      } catch (err) {
        setMessage('Failed to load candidates. Please try again.');
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) {
      setMessage('Please select a candidate');
      return;
    }

    if (!voter) {
      setMessage('You must be logged in to vote');
      navigate('/login');
      return;
    }

    setLoading(true);  // Start loading

    try {
      const response = await axios.post('https://votingsystem-backend-1.onrender.com/vote', {
        idNumber: voter.idNumber, // Use voter's ID number
        candidateName: selectedCandidate, // Candidate's name
      });

      setMessage(response.data.message || 'Vote cast successfully!');
      setTimeout(() => navigate('/'), 1000); // Redirect to home after a short delay
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to cast vote');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="voting-container">
      <h1>Vote for Your Candidate</h1>
      <select onChange={(e) => setSelectedCandidate(e.target.value)} value={selectedCandidate}>
        <option value="">Select Candidate</option>
        {candidates.map((candidate) => (
          <option key={candidate._id} value={candidate.name}>
            {candidate.name} ({candidate.votes} votes)
          </option>
        ))}
      </select>
      <button onClick={handleVote} disabled={loading}>
        {loading ? 'Submitting Vote...' : 'Submit Vote'}
      </button>
      {message && (
        <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>
      )}
    </div>
  );
};

export default Voting;
