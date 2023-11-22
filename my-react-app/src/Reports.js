import React, { useState, useEffect } from 'react';
import './Reports.css';


const ReportsPage = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/all');
      if (response.ok) {
        const users = await response.json();
        const driverUsers = users.filter(user => user.role === 'driver');
        setDrivers(driverUsers);
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const downloadPDF = (driverId) => {
    const pdfUrl = `https://plankton-app-b4yn3.ondigitalocean.app/users/report/${driverId}`;
    window.open(pdfUrl, '_blank');
  };

  return (
    <div>
      <h2>Driver Reports</h2>
      <div>
        {drivers.length > 0 ? (
          drivers.map(driver => (
            <div key={driver.id} className="driver-report-item">
              <div className="driver-info">
                <h3>{driver.name} {driver.surname}</h3>
              </div>
              <button onClick={() => downloadPDF(driver.id)}>Download Report</button>
            </div>
          ))
        ) : (
          <p>No drivers found.</p>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
