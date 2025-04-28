import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job) {
    return <div>No job data</div>;
  }

  return (
    <div
      className="job-card"
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h3>
        {job.company || "Unknown Company"} - {job.title || "Unknown Title"}
      </h3>
      <p>
        <strong>Location:</strong> {job.location || "UnKnown Location"}
      </p>

      <Link to={`/job-details/${job.id}`}>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

export default JobCard;
