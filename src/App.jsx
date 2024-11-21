import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Voting from './pages/Voting';
import Results from './pages/Results';
import Admin from './pages/admin'; // Import Admin page
import Login from './pages/Login';
import { UserProvider } from './components/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <UserProvider>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/vote" element={<Voting />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin />} /> {/* Admin Dashboard Route */}
        <Route path="/results" element={<Login/>} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
