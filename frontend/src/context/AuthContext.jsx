import { useContext, createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"; // 👈 Use React Router navigation

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (err) {
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const navigate = useNavigate(); // 👈 useNavigate hook from React Router

  useEffect(() => {
    const checkTokenValidity = () => {
      if (isTokenExpired(token)) {
        logout();
        navigate("/login"); // 👈 React Router navigation (no reload)
      }
    };

    checkTokenValidity();
  }, []); // ✅ Only runs once on initial mount

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", token);
    }
  }, [user, token]);

  const login = (userData, authToken) => {
    const decodedToken = jwt_decode(authToken);
    const updatedUser = {
      ...userData,
      userId: decodedToken.id,
    };
    setUser(updatedUser);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("authToken", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
