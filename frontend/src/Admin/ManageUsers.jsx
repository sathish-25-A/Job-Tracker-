// src/components/ManageUsers.js
import React, { useEffect, useState } from 'react';
import API from '../services/api';  // API instance to interact with backend
import Navbar from '../Components/Navbar';
import './ManageUsers.css';  // Custom CSS for styling

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/admin/jobs/users');
        setUsers(response.data);  // Save the fetched users
      } catch (err) {
        setError("Error fetching users.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);  // Empty array means this effect runs once when the component mounts

  // Handle role change (e.g., promote a user to admin)
  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.put(`/admin/users/role/${userId}`, { role: newRole });
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));  // Update role in state
    } catch (error) {
      setError('Error updating user role');
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="manage-users-container">
        <h2>Manage Users</h2>
        
        {error && <p className="error-message">{error}</p>}

        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* Toggle role if the user is not already an admin */}
                    {user.role !== 'ADMIN' ? (
                      <button onClick={() => handleRoleChange(user.id, 'ADMIN')}>Make Admin</button>
                    ) : (
                      <button onClick={() => handleRoleChange(user.id, 'USER')}>Revoke Admin</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
