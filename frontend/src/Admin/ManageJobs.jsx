import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../Components/Navbar";
import './ManageJobs.css';

const ManageJobs = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({
    title: '',
    company: '',
    description: '',
    jobType: '',
    location: '',
    salary: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await API.get(`/admin/jobs/${jobId}`);
          setJob(response.data);
        } catch (error) {
          setError('Error fetching job data');
          console.error(error);
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job.title || !job.description || !job.company || !job.salary) {
      setError("All fields are required.");
      return;
    }

    try {
      if (jobId) {
        await API.put(`/admin/jobs/update/${jobId}`, job);
      } else {
        await API.post("/admin/jobs/add", job);
      }
      navigate("/admin/manage-jobs");
    } catch (err) {
      setError('Error saving job data');
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="manage-jobs-container">
        <h2>{jobId ? 'Edit Job' : 'Add Job'}</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="job-form">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={job.company}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="jobType"
            placeholder="Job Type"
            value={job.jobType}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
          />
          <button type="submit">{jobId ? 'Update Job' : 'Add Job'}</button>
        </form>
      </div>
    </div>
  );
};

export default ManageJobs;
