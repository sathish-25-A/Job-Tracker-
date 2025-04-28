import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../Components/Navbar';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/admin/jobs/list/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/admin/jobs/delete/${id}`);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/manage-jobs/edit/${id}`);
  };

  if (!job) return <div className="loading">Loading job details...</div>;

  return (
    <div>
      <Navbar />
      <div className="job-details-container">
        <h2>{job.title} at {job.company}</h2>
        <p className="description">{job.description}</p>
        <p><strong>Type:</strong> {job.jobType}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> ₹{job.salary}</p>
        <div className="btn-group">
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
