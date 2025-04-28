import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import the useAuth hook
import API from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobDetails = () => {
  const { id } = useParams();  // Get jobId from URL params
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);  // For error handling
  const navigate = useNavigate();  // Replace useHistory with useNavigate
  const { user, token } = useAuth();  // Use the AuthContext to get user and token

  useEffect(() => {
    // Fetch job details based on id
    const fetchJobDetails = async () => {
      try {
        const response = await API.get(`/user/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token in Authorization header
          },
        });
        setJob(response.data);  // Store the response data (job details)
      } catch (error) {
        setError("Error fetching job details");  // Set error message
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id, token]);  // Re-fetch data if token or id changes

  // Function to handle the "Apply for this job" button click
  const handleApplyClick = async () => {
    try {
      if (!user) {
        toast.error('Please log in to apply for this job');
        return;
      }

      const applicationData = {
        jobId: job.id,
        userEmail: user.email,  // Use user's email from AuthContext
      };

      // Make an API call to submit the application
      const response = await API.post(`/application/apply/${job.id}`, applicationData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token in Authorization header
        },
      });

      if (response.status === 200) {
        toast.success('Application submitted successfully!');
      } else {
        toast.error('Error submitting application.');
      }
    } catch (error) {
      toast.error('Error submitting application. Please try again.');
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}  {/* Display error message if there is an error */}
      {job ? (
        <div>
          <h1>{job.company} - {job.role}</h1>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Job Type:</strong> {job.jobType}</p>
          <p><strong>Salary:</strong> {job.salary}</p>

          <div>
            {/* Button to apply for the job */}
            <button className="btn apply-btn" onClick={handleApplyClick}>
              Apply for this job
            </button>
          </div>

          {/* Button to go back to the previous page */}
          <button onClick={() => navigate(-1)} className="btn back-btn">Back to Job Listings</button>
        </div>
      ) : (
        <p>Loading job details...</p>  // Show loading message until job data is fetched
      )}

      {/* Toast Container to display toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default JobDetails;
