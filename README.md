# Voting System Frontend  

The Voting System Frontend is a React-based application designed to provide users with an intuitive interface for registering, logging in, and voting. It connects to the backend API to handle user data and voting functionality.  

## Features  
- Voter registration with province selection  
- Login functionality  
- Candidate listing and voting  
- Admin dashboard for managing candidates  

## Requirements  
- Node.js (version 14 or higher)  
- Backend API running (refer to [VotingSystem-backend](https://github.com/NtandoMgo/VotingSystem-backend))  

## Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/NtandoMgo/VotingSystem-frontend.git
   cd VotingSystem-frontend
   ```  

2. **Install dependencies**  
   ```bash
   npm install
   ```  

3. **Setup environment variables**  
   Create a `.env` file in the root directory and add the following:  
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```  
   Replace `http://localhost:5000` with the deployed backend URL if running in production.  

4. **Start the development server**  
   ```bash
   npm start
   ```  
   The app will run at `http://localhost:3000` by default.  

## Pages and Routes  

### Public Routes  
- **Home (`/`)**  
  Displays a list of candidates. Users can choose to register or log in before voting.  

- **Register (`/register`)**  
  Voter registration form.  

### Protected Routes  
- **Vote (`/vote`)**  
  Allows authenticated voters to cast their votes.  

- **Admin Dashboard (`/admin`)**  
  Provides admin functionalities like adding and removing candidates.  

## File Structure  

```
.
├── src/
│   ├── components/       # Reusable components (e.g., Navbar, HelpPopup)
│   ├── pages/            # Application pages (Home, Register, Admin, Vote)
│   ├── styles/           # CSS files for styling
│   ├── App.js            # Main application component
│   ├── index.js          # Application entry point
├── public/
│   ├── index.html        # HTML template
├── .env                  # Environment variables
├── README.md             # Project documentation
├── package.json          # Node.js dependencies and scripts
└── node_modules/         # Dependencies
```  

## Deployment  

1. **Build the app**  
   ```bash
   npm run build
   ```  
or automatically from your github repository in netlify etc

2. **Deploy the `build/` folder**  
   You can deploy the built app to any hosting service like Netlify, Vercel, or a static server.  

## API Integration  

Ensure that the backend is running and accessible. The frontend communicates with the backend via the following endpoints:  
- **`/register`**: For voter registration  
- **`/login`**: For voter or admin login  
- **`/results`**: Fetches candidates and their votes  
- **`/vote`**: Submits the user's vote  

Update the `REACT_APP_API_URL` in `.env` to match the backend URL.  

## Contact  
For any assistance, reach out to **devvarietyverse@gmail.com**.  
