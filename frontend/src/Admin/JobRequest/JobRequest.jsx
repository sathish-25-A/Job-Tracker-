import React, { useEffect, useState } from 'react';
import API from '../../services/api'; // Your API helper
import Navbar from '../../Components/Navbar';
import './JobRequestList.css'; // Optional: Create CSS for styling

const JobRequestList = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get('/admin/applications'); // Backend endpoint
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications.');
      console.error(err);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await API.put(`/admin/applications/${applicationId}/status`, { status: newStatus });
      fetchApplications(); // Refresh list after update
    } catch (err) {
      console.error('Error updating application status', err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (applications.length === 0) {
    return <div>Loading applications...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="job-request-list">
        <h2>Job Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Job Title</th>
              <th>Current Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.userName}</td>
                <td>{application.jobTitle}</td>
                <td>{application.status}</td>
                <td>
                  <button onClick={() => handleStatusChange(application.id, 'ACCEPTED')}>Accept</button>
                  <button onClick={() => handleStatusChange(application.id, 'REJECTED')}>Reject</button>
                  <button onClick={() => handleStatusChange(application.id, 'PENDING')}>Pending</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobRequestList;
