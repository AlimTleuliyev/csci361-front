import React, { useEffect, useState } from 'react';


const Driver = () => {
    const userId = localStorage.getItem('userId');
    const [driverInfo, setDriverInfo] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        
        fetchDriverInfo();
    }, [userId]);

    const handleUpdateStatus = async (routeId) => {
        try {
            
            // Make an API request to update the route status to "Completed"
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/route/${routeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: true,
                }),
            });

            if (response.ok) {
                await fetchDriverInfo();  
                console.log(`Status updated successfully for route ${routeId}`);
            } else {
                console.error(`Failed to update status for route ${routeId}`);
            }
        } catch (error) {
            console.error('Error updating route status:', error);
        }
    };



    return (
        <div>
            <h2>Driver Profile</h2>
            {loading ? (
                <p>Loading driver information...</p>
            ) : driverInfo ? (
                <>
                    <div className='profile'>
                        <p>Name: {driverInfo.name}</p>
                        <p>Surname: {driverInfo.surname}</p>
                        <p>Phone: {driverInfo.phone_number}</p>
                        <p>Driver License: {driverInfo.driver_license}</p>
                        <p>Email: {driverInfo.email}</p>
                        <p> Call Center: +7 708 212 2002</p>

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
                                                <br />
                                                <strong>Route Status:</strong> {route.status ? 'Completed' : 'Pending'}
                                                <br />
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

                                                {/* Button to update route status */}
                                                {!route.status ? (
                                                    <button onClick={() => handleUpdateStatus(route.id)}>
                                                        Update Status to Completed
                                                    </button>
                                                ) : (
                                                    <p>Status: Completed</p>
                                                )}
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
