import React, { useEffect, useState } from "react";
import JobCard from "../Components/JobCard"; // 👈 correct import
import API from "../services/api"; // Import the API instance

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("/user/jobs/list/all"); // Use API.get instead of fetch

        if (response.status === 200) {
          setJobs(response.data); // Set jobs data from response
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchJobs(); // Call the fetchJobs function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading jobs...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div>
      <h1>Available Jobs</h1>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />) // Render JobCard for each job
      ) : (
        <div>No jobs available at the moment.</div> // Fallback message if no jobs
      )}
    </div>
  );
};

export default JobList;
