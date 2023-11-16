// Driver.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Driver() {
    const { driverId } = useParams();
    const [driverInfo, setDriverInfo] = useState(null);

    // Fetch driver information based on driverId
    // You can use a useEffect hook to fetch data from the server

    //useEffect(() => {
        // Fetch driver info based on driverId and set it to the state
        // Example: fetchDriverInfo(driverId).then((data) => setDriverInfo(data));
    //}, [driverId]);

    if (!driverInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{driverInfo.name}'s Profile</h2>
            <p>Driver ID: {driverInfo.id}</p>
            <p>Email: {driverInfo.email}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default Driver;