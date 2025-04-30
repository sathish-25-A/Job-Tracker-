import React, { useEffect, useState } from "react";
import API from "../services/api"; // Import API.js
import { useParams } from "react-router-dom"; // To access route parameters
import Navbar from "../Components/Navbar";
import "./UserDetail.css";

const UserDetail = () => {
  const { userId } = useParams(); // Get userId from the URL parameter
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user details based on userId
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await API.get(`/admin/jobs/users/stats/${userId}`);
        setUserDetails(response.data);
      } catch (err) {
        if (err.response) {
          setError(
            `Error: ${err.response.status} - ${
              err.response.data.message || err.response.statusText
            }`
          );
        } else if (err.request) {
          setError("No response received from the server.");
        } else {
          setError(`Error: ${err.message}`);
        }
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Function to download resume (same as Profile.js)
  const downloadResume = async () => {
    if (!userDetails || !userDetails.userId) {
      console.error("User data is not available or userId is missing");
      return;
    }

    const resumeUrl = `${API.defaults.baseURL}/user/jobs/profile/${userDetails.userId}/resume/${userDetails.resume.split("\\").pop()}`;

    console.log("Constructed Resume URL:", resumeUrl); // Log the complete resume URL

    try {
      const response = await fetch(resumeUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = userDetails.resume.split("\\").pop(); // Resume file name
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download resume");
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div>
      <Navbar />
      <div className="user-detail-container">
        <h2>User Details</h2>

        <div className="user-info">
          <p>
            <strong>Name:</strong> {userDetails.name || "Not Provided"}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email || "Not Provided"}
          </p>
          <p>
            <strong>Mobile:</strong> {userDetails.mobileNumber || "Not Provided"}
          </p>
          <p>
            <strong>Location:</strong> {userDetails.location || "Not Provided"}
          </p>
          <p>
            <strong>Experience:</strong> {userDetails.experience || "Not Provided"}
          </p>
          <p>
            <strong>Skills:</strong> {userDetails.skills || "Not Provided"}
          </p>
          <p>
            <strong>Gender:</strong> {userDetails.gender || "Not Provided"}
          </p>
          <p>
            <strong>Date of Birth:</strong> {userDetails.dob || "Not Provided"}
          </p>
          <p>
            <strong>Language:</strong> {userDetails.language || "Not Provided"}
          </p>
          <p>
            <strong>Education:</strong> {userDetails.education || "Not Provided"}
          </p>

          {/* Display Resume Download Link */}
          <p>
            <strong>Resume:</strong> 
            {userDetails.resume ? (
              <>
                <a href="#" onClick={downloadResume}>
                  Download Resume
                </a> (
                {userDetails.resume.split("\\").pop().split("_").slice(1).join("_")})
              </>
            ) : (
              "Not Uploaded"
            )}
          </p>
        </div>

        {/* Display applied jobs stats */}
        <div className="job-stats">
          <p>
            <strong>Jobs Applied:</strong> {userDetails.appliedJobs || 0}
          </p>
          <p>
            <strong>Jobs Accepted:</strong> {userDetails.acceptedJobs || 0}
          </p>
          <p>
            <strong>Jobs Rejected:</strong> {userDetails.rejectedJobs || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
