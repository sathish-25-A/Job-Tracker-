// src/Components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job) {
    return <div>No job data</div>; // Display message if no job data is passed
  }

  return (
    <div className="job-card">
      <h3>
        {job.company || "Unknown Company"} - {job.title || "Unknown Title"}
      </h3>
      <p>
        <strong>Location:</strong> {job.location || "Unknown Location"}
      </p>

      <Link to={`/job-details/${job.id}`} className="view-details">
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
