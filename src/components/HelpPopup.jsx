import React from 'react';
import '../styles/HelpPopup.css';  // Import the CSS for styling

const HelpPopup = ({ closePopup }) => {
  return (
    <div className="help-popup-overlay">
      <div className="help-popup">
        <div className="help-popup-header">
          <h2>Guide/Instructions</h2>
          <button className="close-btn" onClick={closePopup}>X</button>
        </div>
        <div className="help-popup-content">
          <h3>How to Register:</h3>
          <p>
            To register, click the "Register" button in the navbar and fill out the necessary information: your name, email, and 13-digit ID number. Once registered, you can log in and participate in the voting process.
          </p>

          <h3>How to Vote:</h3>
          <p>
            After logging in, go to the voting page. You will be presented with a list of candidates. Select your preferred candidate and submit your vote. Each voter can vote only once.
          </p>

          <h3>Admin Section:</h3>
          <p>
            If you are an admin, you can manage candidates, including adding new candidates and removing existing ones.
          </p>

          <h3>Logging Out:</h3>
          <p>
            To log out, click the "Logout" button in the navbar. This will end your session and redirect you to the homepage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPopup;
