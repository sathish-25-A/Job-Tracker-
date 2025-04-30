import React from "react";
import { useAuth } from "../../context/AuthContext"; // If you're using a custom context
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth(); // Assuming you're using a custom AuthContext

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-heading">Job Seeker Profile</h1>
        {user ? (
          <div className="profile-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "Not Provided"}</p>
            <p><strong>Experience:</strong> {user.experience || "Not Provided"}</p>
            <p><strong>Skills:</strong> {user.skills?.join(", ") || "Not Provided"}</p>

            <div className="resume-section">
              <p><strong>Resume:</strong> {user.resume ? <a href={user.resume} target="_blank" rel="noopener noreferrer">View</a> : "No Resume Uploaded"}</p>
              <button className="resume-btn">Upload / Edit Resume</button>
            </div>

            {/* Link to the EditProfile page */}
            <Link to="/edit-profile" className="edit-profile-btn">
              Edit Profile
            </Link>
          </div>
        ) : (
          <p className="login-warning">You are not logged in!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
