import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Pages/Profile";
import JobDetails from "./Pages/JobDetails";
import MyApplications from "./Pages/MyApplications";
import JobApplicationForm from "./Components/JobApplicationForm";
import JobList from "./Pages/JobList";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminRoute from "./Admin/AdminRoute";
import ManageJobs from "./Admin/ManageJobs";
import AddJob from "./Admin/AddJob";
import AdminJobDetails from "./Admin/JobDetails"; // ✅ Import admin job detail view

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
          path="/admin/manage-jobs/add"
          element={
            <AdminRoute>
              <AddJob />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/jobs/:id"
          element={
            <AdminRoute>
              <AdminJobDetails />
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
      </Routes>
    </div>
  );
}

export default App;
