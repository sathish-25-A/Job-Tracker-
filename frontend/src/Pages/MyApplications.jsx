import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const MyApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Fetch applied jobs and job details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applied jobs from the applied-jobs API
        const appliedJobsResponse = await axios.get(
          "http://localhost:3001/applied-jobs"
        );
        setAppliedJobs(appliedJobsResponse.data); // Store applied jobs in state

        // Fetch jobs from the jobs API
        const jobsResponse = await axios.get("http://localhost:3001/jobs");
        setJobs(jobsResponse.data); // Store job details in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  // Find job details based on jobId
  const getJobDetails = (jobId) => {
    return jobs.find((job) => job.id === jobId);
  };

  return (
    <div>
      <Navbar />
      <h1>My Applications</h1>
      {appliedJobs && appliedJobs.length > 0 ? (
        <ul>
          {appliedJobs.map((appliedJob) => {
            // Find the job details using the jobId from appliedJob
            const job = getJobDetails(appliedJob.jobId);

            return (
              <li key={appliedJob.id}>
                {/* Display job role, company, and application date */}
                {job && (
                  <>
                    <strong>{job.role}</strong> at {job.company} <br />
                    Application Date:{" "}
                    {new Date(appliedJob.applicationDate).toLocaleString()}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No applications found.</p> // Message if no applied jobs exist
      )}
    </div>
  );
};

export default MyApplications;
