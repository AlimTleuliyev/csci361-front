// Driver.js
import React, { useEffect, useState } from 'react';
import './admin.css';

const Driver = () => {
    
    const userId = localStorage.getItem('userId');
    const [driverInfo, setDriverInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchDriverInfo = async () => {
            try {
                const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setDriverInfo(data);
                } else {
                    console.error('Error during API call:', response.statusText);
                }
            } catch (error) {
                console.error('Error during API call:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDriverInfo();
    }, [userId]);

    return (
        <div className="admin-page">
            <h2>Driver Profile</h2>
            {loading ? (
                <p>Loading driver information...</p>
            ) : driverInfo ? (
                <>
                <h1>All Users</h1>
                <div class="scrollmenu">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{driverInfo.name}</td>
                            <td>{driverInfo.surname}</td>
                            <td>{driverInfo.phone_number}</td>
                            <td>{driverInfo.driver_license}</td>
                            <td>{driverInfo.email}</td>
                            </tr>
                        </tbody>
                        </table>   
                                {driverInfo.routes && driverInfo.routes.length > 0 && (
                                    <>
                                        <h3>Routes</h3>
                                        <ul>
                                            {driverInfo.routes.map((route, index) => (
                                                <li key={index}>
                                                    <strong>Route ID:</strong> {route.id}
                                                    <br />
                                                    <strong>Distance Covered:</strong> {route.distance_covered} km
                                                    <br />
                                                    <strong>Route Time:</strong> {route.route_time} hours
                                                    <br />
                                                    <strong>Appointment Details:</strong>
                                                    <ul>
                                                        <li>
                                                            <strong>Point A:</strong> {route.appointment.point_a}
                                                        </li>
                                                        <li>
                                                            <strong>Point B:</strong> {route.appointment.point_b}
                                                        </li>
                                                        <li>
                                                            <strong>Departure Date:</strong> {route.appointment.departure_date}
                                                        </li>
                                                        <li>
                                                            <strong>Departure Time:</strong> {route.appointment.departure_time}
                                                        </li>
                                                        <li>
                                                            <strong>Capacity:</strong> {route.appointment.capacity}
                                                        </li>
                                                        <li>
                                                            <strong>Comments:</strong> {route.appointment.comments}
                                                        </li>
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {/* Add other driver information fields as needed */}
                </div>
                </>
            ) : (
                <p>Error loading driver information.</p>
            )}
        </div>
    );
};

export default Driver;
