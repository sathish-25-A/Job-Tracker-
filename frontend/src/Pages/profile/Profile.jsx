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
    const fetchProfile = async () => {
      try {
        const response = await API.get(`/user/jobs/profile/${user.userId}`);
        setUser(response.data);
        updateUser(response.data); // sync with context
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
                <a
                  href={`http://localhost:8080/uploads/${user.resume
                    .split("\\")
                    .pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
