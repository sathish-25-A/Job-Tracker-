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
    language: "",
    education: "",
  });

  const [resume, setResume] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(""); // Track uploaded file name
  const [isLoading, setIsLoading] = useState(false);

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
        language: user.language || "",
        education: user.education || "",
      });
      setUploadedFileName(user.resume || ""); // Correct
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setUploadedFileName(file ? file.name : "No file chosen"); // Update the file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Name and Email are required!");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token || !user?.userId) {
      alert("Authentication error.");
      return;
    }

    setIsLoading(true);
    try {
      // Update user details first
      const { data: updatedProfile } = await API.put(
        `/user/jobs/profile/update/${user.userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newUser = {
        ...updatedProfile,
        resume: updatedProfile.resume || "", // Ensure resumePath is included
      };

      updateUser(newUser); // Update the user in context
      setFormData(newUser);

      if (resume) {
        // Create FormData to send file
        const resumeFormData = new FormData();
        resumeFormData.append("file", resume);

        // Upload resume
        await API.post(
          `/user/jobs/profile/${user.userId}/upload-resume`,
          resumeFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Profile and resume updated successfully!");
      } else {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="edit-profile-form">
        <h2>Edit Profile</h2>
        {isLoading ? (
          <p>Updating profile...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              "name",
              "email",
              "mobileNumber",
              "location",
              "experience",
              "skill",
              "gender",
              "language",
              "education",
            ].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required={["name", "email"].includes(field)}
              />
            ))}

            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            {/* Display the file name if a file is selected */}
            <p>
              {uploadedFileName
                ? uploadedFileName.split("_").slice(1).join("_")
                : "No file chosen"}
            </p>
            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
