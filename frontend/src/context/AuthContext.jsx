import { useContext, createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

// Create a context to share user and authentication state
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true; // If no token, consider it expired
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decodedToken.exp < currentTime; // Compare expiration time
};

// AuthProvider component to wrap the application and provide context
export const AuthProvider = ({ children }) => {
  // Set user state from localStorage or null if not found
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Set token state from localStorage or null if not found
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  // Check token expiration on each token change
  useEffect(() => {
    if (isTokenExpired(token)) {
      logout(); // If token is expired, log out
    }
  }, [token]);

  // Sync user and token with localStorage on any change
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      localStorage.setItem("authToken", token); // Store auth token in localStorage
    }
  }, [user, token]);

  // Login function that sets the user and token
  const login = (userData, authToken) => {
    const decodedToken = jwt_decode(authToken); // Decode JWT token to get user info
    const updatedUser = {
      ...userData,
      userId: decodedToken.id, // Add userId from decoded token
    };
    setUser(updatedUser); // Set the user in state
    setToken(authToken); // Set the token in state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Store user in localStorage
    localStorage.setItem("authToken", authToken); // Store auth token in localStorage
  };

  // Logout function that clears user and token from state and localStorage
  const logout = () => {
    setUser(null); // Clear user state
    setToken(null); // Clear token state
    localStorage.removeItem("authToken"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  // Update user function that merges new data into the existing user state
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }; // Merge updated data with current user
    setUser(updatedUser); // Update user state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update user in localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};
