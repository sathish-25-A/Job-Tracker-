import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  // If loading is true, wait until the auth context is ready
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated or not an admin, redirect to login
  if (!token || !user || user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return children;  // Allow access to admin dashboard if the user is an admin
};

export default AdminRoute;
