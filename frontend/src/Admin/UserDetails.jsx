import React, { useEffect, useState } from 'react';
import API from '../services/api';  // Import API.js
import { useParams } from 'react-router-dom';  // To access route parameters
import Navbar from '../Components/Navbar';
import './UserDetail.css';

const UserDetail = () => {
  const { userId } = useParams();  // Get userId from the URL parameter
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user details based on userId
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await API.get(`/admin/users/${userId}`);
        setUserDetails(response.data);
      } catch (err) {
        setError("Error fetching user details.");
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [userId]); // Fetch details when userId changes

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
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
        </div>

        {/* Display applied jobs stats */}
        <div className="job-stats">
          <p><strong>Jobs Applied:</strong> {userDetails.jobsApplied}</p>
          <p><strong>Jobs Rejected:</strong> {userDetails.jobsRejected}</p>
          <p><strong>Jobs Interviewed:</strong> {userDetails.jobsInterviewed}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
