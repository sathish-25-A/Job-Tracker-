import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import Navbar from '../../Components/Navbar';
import './JobRequestList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobRequest = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get('/admin/jobs/applications');
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications.');
      console.error(err);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await API.put(`/admin/jobs/status/${applicationId}?status=${newStatus}`);
      toast.success(`Application ${newStatus.toLowerCase()}!`, {
        position: 'top-right',
        autoClose: 2000,
      });
      fetchApplications();
    } catch (err) {
      toast.error('Failed to update status.', { position: 'top-right' });
      console.error('Error updating application status', err);
    }
  };

  const renderSection = (statusLabel, statusType) => {
    const filteredApps = applications.filter(app => app.status === statusType);
    return (
      <div className="status-section">
        <h3>{statusLabel}</h3>
        {filteredApps.length === 0 ? (
          <p>No {statusLabel.toLowerCase()} applications</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Job Title</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.applicationId}>
                  <td>{app.userName}</td>
                  <td>{app.jobTitle}</td>
                  <td>
                    <button onClick={() => handleStatusChange(app.applicationId, 'ACCEPTED')}>Accept</button>
                    <button onClick={() => handleStatusChange(app.applicationId, 'REJECTED')}>Reject</button>
                    <button onClick={() => handleStatusChange(app.applicationId, 'PENDING')}>Pending</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
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
        {renderSection('Pending Applications', 'PENDING')}
        {renderSection('Accepted Applications', 'ACCEPTED')}
        {renderSection('Rejected Applications', 'REJECTED')}
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobRequest;
