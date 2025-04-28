import React, { useEffect, useState } from 'react';
import API from '../services/api';  // Import API.js
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';  // Link for navigation
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/admin/jobs/users'); // No need to set Authorization header manually
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Count users and admins
  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.role === "ADMIN").length;
  const totalNormalUsers = users.filter(user => user.role === "USER").length;

  return (
    <div>
      <Navbar />
      <div className="manage-users-container">
        <h2>Manage Users</h2>

        {error && <p className="error-message">{error}</p>}

        {/* Display summary */}
        <div className="user-summary">
          <p><strong>Total Users:</strong> {totalUsers}</p>
          <p><strong>Total Admins:</strong> {totalAdmins}</p>
          <p><strong>Total Normal Users:</strong> {totalNormalUsers}</p>
        </div>

        {/* Display all users */}
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td><Link to={`/user-detail/${user.id}`}>{user.name}</Link></td> {/* Navigate to UserDetail page */}
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ManageUsers;
