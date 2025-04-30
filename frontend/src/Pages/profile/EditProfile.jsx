import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../Components/Navbar";

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    location: "",
    experience: "",
    skill: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        location: user.location || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token || !user?.userId) {
      alert("Authentication error."); 
      return;
    }
  
    try {
      // 1) Update on the server
      const { data: updatedProfile } = await API.put(
        `/user/jobs/profile/update/${user.userId}`,
        formData,
        { headers: { "Authorization": `Bearer ${token}` } }
      );
  
      console.log("Profile updated successfully:", updatedProfile);
  
      // 2) Flatten the response properly and coalesce null/undefined -> ""
      const newUser = {
        userId:      updatedProfile.user.id,
        name:        updatedProfile.user.name || "",
        email:       updatedProfile.user.email || "",
        mobileNumber:updatedProfile.mobileNumber   ?? "",
        location:    updatedProfile.location       ?? "",
        experience:  updatedProfile.experience     ?? "",
        skill:       updatedProfile.skill          ?? "",
        gender:      updatedProfile.gender         ?? "",
        dob:         updatedProfile.dob            ?? "",
        role:        updatedProfile.user.role      || "",
      };
  
      // 3) Update the context (and localStorage)
      updateUser(newUser);
  
      // 4) Mirror into local form state so the inputs re-render with the new values
      setFormData(newUser);
  
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
          {["name","email","mobileNumber","location","experience","skill","gender"].map((field) => (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
