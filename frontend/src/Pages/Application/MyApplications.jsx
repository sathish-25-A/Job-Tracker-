import React, { useState, useEffect } from "react";
import API from "../../services/api";
import Navbar from "../../Components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "../Application/MyApplication.css";

const COLORS = ["#8884d8", "#82ca9d", "#ff7f50", "#ffc658", "#00c49f"];

const MyApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get("/application/user/info");
        const data = response.data;
        setAppliedJobs(data);

        // Count application statuses
        const statusCount = data.reduce((acc, app) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        }, {});

        // Format for pie chart
        const formattedData = Object.entries(statusCount).map(
          ([status, count]) => ({
            name: status,
            value: count,
          })
        );

        setStatusData(formattedData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="applications-container">
        <h1 className="heading">My Applications</h1>

        {statusData.length > 0 && (
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {appliedJobs.length > 0 ? (
          <ul className="application-list">
            {appliedJobs.map((app) => (
              <li key={app.applicationId}>
                <strong>{app.jobTitle}</strong> <br />
                <p><b>{app.company}</b></p>
                Applied by: {app.userName} <br />
                Status: <strong>{app.status}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
