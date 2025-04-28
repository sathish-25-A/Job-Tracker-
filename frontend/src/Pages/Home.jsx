import React, { useEffect, useState } from "react";
import API from "../services/api"; // Import the API instance
import JobCard from "../Components/JobCard";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import "../Pages/home.css";
 
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filter, setFilter] = useState(""); // State for filter (e.g., job type)
  const navigate = useNavigate();
 
  // Fetch all jobs from the API
  //api
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("/user/jobs/list/all"); // Use the API instance
        setJobs(response.data); // Store the jobs data
        setFilteredJobs(response.data); // Initially set filteredJobs to all jobs
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(`Error: ${err.message}`);
        if (err.response && err.response.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
 
    fetchJobs();
  }, [navigate]);
 
  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
 
  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
 
  // Filter jobs based on search and selected filter
  useEffect(() => {
    let filtered = jobs;
 
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
 
    // Apply job type filter
    if (filter) {
      filtered = filtered.filter(
        (job) => job.jobType.toLowerCase() === filter.toLowerCase()
      );
    }
 
    setFilteredJobs(filtered);
  }, [searchQuery, filter, jobs]);
 
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="home-heading">Job Listings</h1>
 
        {/* Error Handling */}
        {error && <p className="error-message">{error}</p>}
 
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by job title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
 
        {/* Filter Dropdown */}
        <div className="filter-dropdown">
          <select value={filter} onChange={handleFilterChange}>
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
 
        {/* Display Filtered Jobs */}
        <div className="job-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p>No jobs found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Home;