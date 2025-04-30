import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Pages/profile/Profile";
import JobDetails from "./Pages/JobDetails";
import MyApplications from "./Pages/Application/MyApplications";
import JobApplicationForm from "./Components/JobApplicationForm";
import JobList from "./Pages/JobList";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminRoute from "./Admin/AdminRoute";
import ManageJobs from "./Admin/ManageJobs";
import ManageUsers from "./Admin/ManageUsers";
import UserDetail from "./Admin/UserDetails";
import JobRequest from "./Admin/JobRequest/JobRequest"; // ✅ Import new JobRequest page
import EditProfile from "./Pages/profile/EditProfile";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-jobs/:jobId?"
          element={
            <AdminRoute>
              <ManageJobs />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/job-requests" // ✅ New route for Job Requests page
          element={
            <AdminRoute>
              <JobRequest />
            </AdminRoute>
          }
        />

        {/* User Private Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/job-details/:id"
          element={
            <PrivateRoute>
              <JobDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobList />
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <JobApplicationForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <PrivateRoute>
              <MyApplications />
            </PrivateRoute>
          }
        />

        {/* User Detail Route */}
        <Route
          path="/user-detail/:userId"
          element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
