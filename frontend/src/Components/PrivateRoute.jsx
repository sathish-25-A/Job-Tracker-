import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, user, loading } = useAuth();

  // If loading is true, wait until the auth context is ready
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children; // Allow access to the protected route
};

export default PrivateRoute;
