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
                <div className='profile' style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{driverInfo.name}</td>
                            </tr>
                            <tr>
                                <td>Surname:</td>
                                <td>{driverInfo.surname}</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>{driverInfo.phone_number}</td>
                            </tr>
                            <tr>
                                <td>Driver License:</td>
                                <td>{driverInfo.driver_license}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{driverInfo.email}</td>
                            </tr>
                            <tr>
                                <td>Call Center:</td>
                                <td>+7 708 212 2002</td>
                            </tr>
                        </tbody>
                    </table>
                    {driverInfo.routes && driverInfo.routes.length > 0 && (
                        <>
                            <h3>Routes</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Route ID</th>
                                        <th>Distance Covered</th>
                                        <th>Route Time</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {driverInfo.routes.map((route) => (
                                        <tr key={route.id}>
                                            <td>{route.id}</td>
                                            <td>{route.distance_covered} km</td>
                                            <td>{route.route_time} hours</td>
                                            <td>{route.status ? 'Completed' : 'Pending'}</td>
                                            <td>
                                                {!route.status ? (
                                                    <button onClick={() => handleUpdateStatus(route.id)}>
                                                        Update Status to Completed
                                                    </button>
                                                ) : (
                                                    <span>Completed</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    {/* Add other driver information fields as needed */}
                </div>
            ) : (
                <p>Error loading driver information.</p>
            )}
        </div>
    );
};

export default Driver;
