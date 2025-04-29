import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../Components/Navbar";

const EditProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    mobileNumber: "",
    experience: "",
    skill: "",
    gender: "",
    dob: "",
  });
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
        mobileNumber: user.mobileNumber || "",
        experience: user.experience || "",
        skill: user.skill || "",
        gender: user.gender || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("User is not authenticated.");
        return;
      }

      if (!user || !user.userId) {
        alert("User information is missing.");
        return;
      }

      // Prepare FormData for the profile data
      const profileData = new FormData();
      profileData.append("name", formData.name);
      profileData.append("email", formData.email);
      profileData.append("location", formData.location);
      profileData.append("mobileNumber", formData.mobileNumber);
      profileData.append("experience", formData.experience);
      profileData.append("skill", formData.skill);
      profileData.append("gender", formData.gender);
      profileData.append("dob", formData.dob);

      if (resume) profileData.append("resume", resume);

      // PUT request to update user profile data
      const response = await API.put(`/user/jobs/add${user.userId}`, profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile updated successfully:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="edit-profile-form">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
          />
          <input
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="Skills"
          />
          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
          <input
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            type="date"
          />
          <input
            type="file"
            onChange={handleResumeChange}
            accept=".pdf,.doc,.docx"
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
