import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>You are not logged in!</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-heading">Job Seeker Profile</h1>
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name || "Not Provided"}</p>
          <p><strong>Email:</strong> {user.email || "Not Provided"}</p>
          <p><strong>Mobile:</strong> {user.mobileNumber || "Not Provided"}</p>
          <p><strong>Location:</strong> {user.location || "Not Provided"}</p>
          <p><strong>Experience:</strong> {user.experience || "Not Provided"}</p>
          <p><strong>Skills:</strong> {user.skill || "Not Provided"}</p>
          <p><strong>Gender:</strong> {user.gender || "Not Provided"}</p>
          <p><strong>Date of Birth:</strong> {user.dob || "Not Provided"}</p>

          <Link to="/edit-profile" className="edit-profile-btn">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
