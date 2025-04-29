import React, { useState, useEffect } from "react";
import API from "../services/api"; // 👈 Use your custom API service
import Navbar from "../Components/Navbar";

const MyApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applied jobs (with status)
        const appliedJobsResponse = await API.get("/applied-jobs");
        setAppliedJobs(appliedJobsResponse.data);

        // Fetch job listings
        const jobsResponse = await API.get("/jobs");
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
            const job = getJobDetails(appliedJob.jobId);

            return (
              <li key={appliedJob.id}>
                {job ? (
                  <>
                    <strong>{job.role}</strong> at {job.company} <br />
                    Application Date: {new Date(appliedJob.applicationDate).toLocaleString()} <br />
                    Status: <strong>{appliedJob.status}</strong>
                  </>
                ) : (
                  <p>Job details not found</p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default MyApplications;
