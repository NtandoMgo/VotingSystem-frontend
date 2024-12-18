import { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get('https://votingsystem-backend-1.onrender.com/results');
      setResults(response.data);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h1>Live Election Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.candidateId}>
            {result.name}: {result.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
