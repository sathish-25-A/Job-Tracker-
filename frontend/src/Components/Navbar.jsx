import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data
    navigate('/login');
  };

 

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <ul>
          {user && user.role === "ADMIN" ? (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/manage-jobs">Manage Jobs</Link></li>
              <li><Link to="/admin/manage-users">Manage Users</Link></li>
              
            </>
          ) : (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/my-applications">My Applications</Link></li>
              <li><Link to="/jobs">Job List</Link></li>
            </>
          )}
        </ul>

        {/* User information and logout */}
        {user && (
          <div className="user-info">
            <h1>{user.name}</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
