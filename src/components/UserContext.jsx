import React, { createContext, useState, useContext } from 'react';

// Create a context to hold the user state
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ idNumber: null, role: null }); // User state holds both ID number and role

  // Function to log in the user
  const login = (userData) => {
    setUser(userData); // Set the user data (ID number and role)
  };

  // Function to log out the user
  const logout = () => {
    setUser({ idNumber: null, role: null }); // Clear the user data on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
