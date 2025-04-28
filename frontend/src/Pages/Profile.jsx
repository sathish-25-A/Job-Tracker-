import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>You are not logged in!</p>
      )}
    </div>
  );
};

export default Profile;
