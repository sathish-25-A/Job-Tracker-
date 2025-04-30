import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import API from "../../services/api";
import "./Profile.css";

const Profile = () => {
  const { user: storedUser, updateUser } = useAuth();
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    if (!storedUser || !storedUser.userId) {
      console.log("No user logged in or userId not available");
      return; // Exit early if no user is logged in
    }
  
    // Only fetch profile if it's not already fetched
    const fetchProfile = async () => {
      try {
        const response = await API.get(`/user/jobs/profile/${storedUser.userId}`);
        setUser(response.data);
        updateUser(response.data); // Sync with context
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
  
    // Fetch profile only if user is logged in and storedUser has changed
    if (!user) {
      fetchProfile(); 
    }
  }, [storedUser, user, updateUser]); // Now `user` is part of the dependency array
  
  

  // Function to download resume
  const downloadResume = async () => {
    if (!storedUser || !storedUser.userId) {
      console.error("User is not logged in or userId is not available");
      return;
    }
  
    const resumeUrl = `${API.defaults.baseURL}/user/jobs/profile/${
      storedUser.userId
    }/resume/${storedUser.resume.split("\\").pop()}`;
  
    console.log("Constructed Resume URL:", resumeUrl); // Log the complete resume URL
  
    // Check for the Authorization token to ensure it is available
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No Authorization token found!");
      return;
    }
    
    console.log("Authorization Token:", authToken); // Log the token (be cautious with sensitive info in production)
  
    try {
      const response = await fetch(resumeUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      console.log("Response Status:", response.status); // Log the status code of the response
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = storedUser.resume.split("\\").pop(); // Name of the resume file
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download resume, status:", response.status);
        // Log more detailed response content for debugging
        const responseBody = await response.text();
        console.error("Response Body:", responseBody);
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };
  
  
  

  if (!user) {
    return <p>You are not logged in!</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-heading">Job Seeker Profile</h1>
        <div className="profile-card">
          <p>
            <strong>Name:</strong> {user.name || "Not Provided"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "Not Provided"}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobileNumber || "Not Provided"}
          </p>
          <p>
            <strong>Location:</strong> {user.location || "Not Provided"}
          </p>
          <p>
            <strong>Experience:</strong> {user.experience || "Not Provided"}
          </p>
          <p>
            <strong>Skills:</strong> {user.skill || "Not Provided"}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender || "Not Provided"}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user.dob || "Not Provided"}
          </p>
          <p>
            <strong>Language:</strong> {user.language || "Not Provided"}
          </p>
          <p>
            <strong>Education:</strong> {user.education || "Not Provided"}
          </p>
          <p>
            <strong>Resume:</strong>{" "}
            {user.resume ? (
              <>
                <a href="#" onClick={downloadResume}>
                  Download Resume
                </a>{" "}
                (
                {
                  user.resume
                    .split("\\")
                    .pop()
                    .split("_")
                    .slice(1) // removes the UUID prefix
                    .join("_") // rejoins the rest of the parts
                }
                )
              </>
            ) : (
              "Not Uploaded"
            )}
          </p>

          <Link to="/edit-profile" className="edit-profile-btn">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
