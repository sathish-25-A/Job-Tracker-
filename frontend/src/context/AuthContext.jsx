import { useContext, createContext, useState, useEffect } from "react";
import  jwt_decode  from 'jwt-decode'; // Correct named import

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwt_decode(token); // Using the named import
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decodedToken.exp < currentTime;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  useEffect(() => {
    if (isTokenExpired(token)) {
      logout();
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", token);
    }
  }, [user, token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
