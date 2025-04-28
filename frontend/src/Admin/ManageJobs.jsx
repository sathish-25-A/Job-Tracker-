import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the passed state
import API from '../services/api'; // API instance with token interceptor
import Navbar from '../Components/Navbar';
import './ManageJobs.css';
import { ToastContainer, toast } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles

const ManageJobs = () => {
  const { state } = useLocation(); // Get the state (passed job data) from the location
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    jobType: '',
    location: '',
    salary: '',
  });
  const [editingJobId, setEditingJobId] = useState(null);

  useEffect(() => {
    // If job data is passed (for editing), update formData
    if (state && state.job) {
      const job = state.job;
      setFormData({
        title: job.title || '',
        company: job.company || '',
        description: job.description || '',
        jobType: job.jobType || '',
        location: job.location || '',
        salary: job.salary || '',
      });
      setEditingJobId(job.id); // Set the job ID to indicate editing mode
    }
  }, [state]); // Depend on `state` so this effect runs when it changes

  const BASE_URL = '/admin/jobs';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJobId) {
        await API.put(`${BASE_URL}/update/${editingJobId}`, formData);
        toast.success("Job updated successfully!"); // Success notification
      } else {
        await API.post(`${BASE_URL}/add`, formData);
        toast.success("Job added successfully!"); // Success notification
      }

      // Reset form and fetch updated job list
      setFormData({
        title: '',
        company: '',
        description: '',
        jobType: '',
        location: '',
        salary: '',
      });
      setEditingJobId(null);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Error saving job data!"); // Error notification
    }
  };

  return (
    <div>
      <Navbar />
      <div className="manage-jobs-container">
        <h2>{editingJobId ? "Edit Job" : "Add New Job"}</h2>

        <form onSubmit={handleSubmit} className="job-form">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company || ''}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description || ''}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="jobType"
            placeholder="Job Type (Full-Time, Part-Time, etc.)"
            value={formData.jobType || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary || ''}
            onChange={handleChange}
          />
          <button type="submit">{editingJobId ? 'Update Job' : 'Add Job'}</button>
        </form>
      </div>

      {/* ToastContainer to show notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageJobs;
