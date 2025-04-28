import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams(); // Get jobId from URL params
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details based on id
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${id}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  return (
    <div>
      {job && (
        <div>
          <h1>
            {job.company} - {job.role}
          </h1>
          <p>{job.description}</p>
          <p>Salary: {job.salary}</p>

          {/* Link to the application form */}
          <Link to={`/apply/${id}`}>Apply for this job</Link>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
