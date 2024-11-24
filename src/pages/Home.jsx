import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Track selected candidate
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [successMessage, setSuccessMessage] = useState(''); // Display success message after voting
  const navigate = useNavigate();

  // Fetch candidates from the backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://votingsystem-backend-1.onrender.com/results'); // Update to your backend API URL
        if (!response.ok) throw new Error('Failed to fetch candidates');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  // Handle vote button click
  const handleVoteClick = (candidateName) => {
    setSelectedCandidate(candidateName); // Set selected candidate
    setShowModal(true); // Show the modal
  };

  // Navigate to registration page with the selected candidate
  const handleRegister = () => {
    setShowModal(false); // Close the modal
    navigate('/register', { state: { candidate: selectedCandidate } }); // Pass candidate to Registration
  };

  return (
    <div className="home-container">
      {/* Show success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h1>Vote for Your Favorite Candidate</h1>
      <div className="candidates-grid">
        {candidates.map((candidate) => (
          <div className="candidate-card" key={candidate._id}>
            <img
              src={candidate.picture ? `data:image/jpeg;base64,${candidate.picture}` : '/placeholder.jpg'} // Fallback to placeholder
              alt={candidate.name}
              className="candidate-image"
            />
            <h3>{candidate.name}</h3>
            <button onClick={() => handleVoteClick(candidate.name)}>
              Vote for {candidate.name}
            </button>
          </div>
        ))}
      </div>

      {/* Conditional rendering for modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Vote for {selectedCandidate}</h2>
            <p>You need to register to vote.</p>
            <div className="modal-buttons">
              <button onClick={handleRegister}>Register</button>
            </div>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
