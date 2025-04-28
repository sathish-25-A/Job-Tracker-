import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext for user data
import API from "../services/api";
import Navbar from "../Components/Navbar";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth(); // Assuming useAuth is used to manage authentication state
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("/admin/jobs/list");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  if (!user || user.role !== "ADMIN") {
    return <div>You do not have access to this page.</div>;
  }

  const handleEdit = (job) => {
    if (job && job.id) {
      navigate(`/admin/jobs/update/${job.id}`);
    } else {
      console.error("Invalid job ID");
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/jobs/delete/${id}`);
      setJobs(jobs.filter(job => job.id !== id)); // Remove job from the list
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Admin Dashboard</h1>

      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <h3>{job.title}</h3>
            <h3>{job.company}</h3>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p><strong>Salary:</strong> ₹{job.salary}</p>
            <button onClick={() => handleEdit(job)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(job.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
