import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { user } = useAuth();

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
            <p><strong>Experience:</strong> {user.experience || "0-1 years"}</p>
            <p><strong>Skills:</strong> {user.skills?.join(", ") || "JavaScript, React, HTML, CSS"}</p>

            <div className="resume-section">
              <p><strong>Resume:</strong> {user.resume ? <a href={user.resume} target="_blank">View</a> : "No Resume Uploaded"}</p>
              <button className="resume-btn">Upload / Edit Resume</button>
            </div>

            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        ) : (
          <p className="login-warning">You are not logged in!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
