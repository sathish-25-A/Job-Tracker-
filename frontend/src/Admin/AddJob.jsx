import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [job, setJob] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/jobs", job);
    navigate("/admin/jobs");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Job Title" onChange={handleChange} />
      <textarea name="description" placeholder="Job Description" onChange={handleChange}></textarea>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJob;
