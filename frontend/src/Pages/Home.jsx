import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../Components/JobCard";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/user/jobs/list/all",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(`Error: ${err.message}`);

        // If there's a response from the server, we can capture that too:
        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          console.error("Response headers:", err.response.headers);

          // If the token is invalid or expired, we can redirect the user to login
          if (err.response.status === 401) {
            setError("Session expired. Please log in again.");
            localStorage.removeItem("authToken"); // Remove the expired token
            history.push("/login"); // Redirect to login page
          }
        }
      }
    };

    fetchJobs();
  }, [history]);

  

  return (
    <div>
      <Navbar />
      <h1>Job Listings</h1>

      {/* Error Handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
