// src/Components/JobDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have AuthContext set up
import API from '../services/api'; // API instance for making requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobDetails = () => {
  const { id } = useParams();  // Get jobId from URL params
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, token } = useAuth();  // Get user info and token from context

  useEffect(() => {
    if (!id) {
      setError("No job ID provided");
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await API.get(`/user/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token with request
          },
        });

        if (response.status === 200) {
          setJob(response.data); // Set job details if response is successful
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setError("Error fetching job details");
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();  // Fetch job details when component mounts or jobId changes
  }, [id, token]);  // Re-run effect when job ID or token changes

  const handleApplyClick = async () => {
    try {
      if (!user) {
        toast.error('Please log in to apply for this job');
        return;
      }

      if (!job) {
        toast.error('Job details not loaded yet.');
        return;
      }

      const applicationData = {
        jobId: job.id,
        userEmail: user.email,
      };

      const response = await API.post(`/application/apply/${job.id}`, applicationData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token with request
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
      {error && <p>{error}</p>}
      {job ? (
        <div>
          <h1>{job.company} - {job.role}</h1>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Job Type:</strong> {job.jobType}</p>
          <p><strong>Salary:</strong> {job.salary}</p>

          <div>
            <button className="btn apply-btn" onClick={handleApplyClick}>
              Apply for this job
            </button>
          </div>

          <button onClick={() => navigate(-1)} className="btn back-btn">
            Back to Job Listings
          </button>
        </div>
      ) : (
        !error && <p>Loading job details...</p>  // Loading state
      )}

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
