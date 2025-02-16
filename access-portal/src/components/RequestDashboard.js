import React, { useEffect, useState } from "react";

const RequestDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint that returns request data
    fetch("http://localhost:7072/api/GetRequestStatus")
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  return (
    <div>
      <h2>My Access Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Access Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td>{req.resource}</td>
              <td>{req.accessType}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestDashboard;