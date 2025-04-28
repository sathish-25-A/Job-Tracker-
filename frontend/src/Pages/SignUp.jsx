import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api"; // 👈 updated

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "USER",
      });

      alert("Signup Successful! Please login now.");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Welcome To Job Tracker</h1>
      <h3 className="signup-subtitle">Sign Up</h3>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="signup-label">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Name"
          className="signup-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email" className="signup-label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          className="signup-input"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="signup-label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          className="signup-input"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <div className="already-account">
        <h5>Already have an account?</h5>
        <Link to="/login" className="login-link">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
