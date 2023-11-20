
import React, { useState, useEffect } from 'react';

const DriverProfile = () => {
    const [driverInfo, setDriverInfo] = useState(null);

    useEffect(() => {
        // Fetch driver information from the backend
        fetchDriverInfo();
    }, []);

    const fetchDriverInfo = async (id) => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/${id}', {
                // Add authentication headers if needed
            });

            if (response.ok) {
                const data = await response.json();
                setDriverInfo(data);
            } else {
                console.error('Failed to fetch driver information:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching driver information:', error);
        }
    };

    return (
        <div className="driver-profile">
            <h1>Driver Profile</h1>
            {driverInfo ? (
                <div>
                    <p>IIN: {driverInfo.iin}</p>
                    <p>Name: {driverInfo.name}</p>
                    <p>Surname: {driverInfo.surname}</p>
                    {/* Display other driver information */}
                </div>
            ) : (
                <p>Loading driver information...</p>
            )}
        </div>
    );
};

export default DriverProfile;
