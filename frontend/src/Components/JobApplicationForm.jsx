import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobApplicationForm = () => {
  const { id } = useParams(); // Get jobId from URL params
  const [jobDetails, setJobDetails] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    resume: "",
  });

  useEffect(() => {
    // Fetch job details based on the id from URL
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${id}`);
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const applicationData = {
        jobId: id,
        fullName: formData.fullName,
        email: formData.email,
        resume: formData.resume,
        applicationDate: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3001/applied-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Error submitting application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div>
      {jobDetails && (
        <div>
          <h2>Apply for {jobDetails.company} - {jobDetails.role}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="resume">Resume:</label>
              <input
                type="file"
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Submit Application</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
