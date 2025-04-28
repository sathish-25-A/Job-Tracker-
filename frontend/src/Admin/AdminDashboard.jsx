import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import Navbar from "../Components/Navbar";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

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
      navigate(`/admin/manage-jobs/${job.id}`, { state: { job } });
    } else {
      console.error("Invalid job ID");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/jobs/delete/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Filtered jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType ? job.jobType === filterType : true;
    const matchesStatus = filterStatus ? job.status === filterStatus : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div>
      <Navbar />
      <div className="admin-dashboard">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search jobs by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
            <option value="">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <ul className="job-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <li key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <h3>{job.company}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> ₹{job.salary}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <button onClick={() => handleEdit(job)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(job.id)} className="delete-btn">Delete</button>
              </li>
            ))
          ) : (
            <p>No jobs found matching your filters.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
