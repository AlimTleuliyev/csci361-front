import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const AdminRoutePage = () => {
    const [routes, setRoutes] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [editingRoute, setEditingRoute] = useState(null);
    const [newRoute, setNewRoute] = useState({
        driver_id: '',
        vehicle_id: '',
        appointment_id: '',
        status: false,
        distance_covered: 0,
    });

    useEffect(() => {
        fetchDrivers();
        fetchVehicles();
        fetchAppointments();
        fetchRoutes();
    }, []);
    const fetchDrivers = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/all');
            const users = await response.json();
            const drivers = users.filter(user => user.role === 'driver');
            setDrivers(drivers);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };
    
    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle');
            const data = await response.json();
            setVehicles(data); // This should be setVehicles, not setRoutes
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };
    
    const fetchAppointments = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/appointment');
            const data = await response.json();
            setAppointments(data); // This should be setAppointments, not setRoutes
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    
    const fetchRoutes = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/route');
            const data = await response.json();
            setRoutes(data);
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    const handleUpdateRoute = (route) => {
        setEditingRoute(route);
        // You can also prefill the form with the route details if needed
        setNewRoute(route);
    };

    const handleAddRoute = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRoute),
            });

            if (response.ok) {
                // Update the list of routes after adding a new one
                fetchRoutes();
                // Reset the newRoute form
                setNewRoute({
                    driver_id: '',
                    vehicle_id: '',
                    appointment_id: '',
                    status: false,
                    distance_covered: 0,
                });
            } else {
                console.error('Failed to add route:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding route:', error);
        }
    };
    const handleSaveUpdate = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/route/${editingRoute.id}`, {
                method: 'PUT', // Use PUT method to update the route
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRoute),
            });
    
            if (response.ok) {
                // Update was successful, refresh the list of routes
                fetchRoutes();
                // Clear the editing state
                setEditingRoute(null);
            } else {
                // Handle errors, e.g., display a message to the user
                console.error('Failed to update route:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating route:', error);
        }
    };
    

    const handleDeleteRoute = async (id) => {
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/route/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update the list of routes after deleting one
                fetchRoutes();
            } else {
                console.error('Failed to delete route:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };
    

    return (
        <div className="admin-page">
            <h2>Admin Route Management</h2>
            <div className="link-container">
                <Link to="/adminVehicles" className="link-button">Manage Vehicles</Link>
                <Link to="/admin" className="link-button">Manage Users</Link>
                <Link to="/adminAuctions" className="link-button">Manage Auctions</Link>
            </div>
            <form onSubmit={handleAddRoute}>
                {/* Dropdown for Drivers */}
                <div className="form-group">
                    <label>Driver:</label>
                    <select value={newRoute.driver_id} onChange={(e) => setNewRoute({ ...newRoute, driver_id: e.target.value })}>
                        <option value="">Select a Driver</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>{driver.name}</option>
                        ))}
                    </select>
                </div>
                {/* Dropdown for Vehicles */}
                <div className="form-group">
                    <label>Vehicle:</label>
                    <select value={newRoute.vehicle_id} onChange={(e) => setNewRoute({ ...newRoute, vehicle_id: e.target.value })}>
                        <option value="">Select a Vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>{vehicle.model}</option>
                        ))}
                    </select>
                </div>
                {/* Dropdown for Appointments */}
                <div className="form-group">
                    <label>Appointment:</label>
                    <select value={newRoute.appointment_id} onChange={(e) => setNewRoute({ ...newRoute, appointment_id: e.target.value })}>
                        <option value="">Select an Appointment</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>{appointment.id}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add</button>
            </form>
            <h1>All Routes</h1>

            <div class="scrollmenu">
            <table>
                <thead>
                    <tr>
                        <th>Driver</th>
                        <th>Vehicle</th>
                        <th>Appointment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map((route) => (
                        <tr key={route.id}>
                            <td>{route.driver_id}</td>
                            <td>{route.vehicle_id}</td>
                            <td>{route.appointment_id}</td>
                            <td>
                            <button onClick={() => handleUpdateRoute(route)}
                                    style={{ marginDown: '5px' }}>Update</button>
                                <button onClick={() => handleDeleteRoute(route.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditional rendering for the update form */}
            {editingRoute && (
        <div>
        <h3>Update Route</h3>
        <form onSubmit={handleSaveUpdate}>
            {/* Dropdown for Drivers */}
            <div className="form-group">
            <label>Driver:</label>
            <select 
                value={newRoute.driver_id} 
                onChange={(e) => setNewRoute({ ...newRoute, driver_id: e.target.value })}
            >
                <option value="">Select a Driver</option>
                {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                ))}
            </select>
            </div>
            <div className="form-group">
            {/* Dropdown for Vehicles */}
            <label>Vehicle:</label>
            <select 
                value={newRoute.vehicle_id} 
                onChange={(e) => setNewRoute({ ...newRoute, vehicle_id: e.target.value })}
            >
                <option value="">Select a Vehicle</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>{vehicle.model}</option>
                ))}
            </select>
            </div>
            <div className="form-group">
            {/* Dropdown for Appointments */}
            <label>Appointment:</label>
            <select 
                value={newRoute.appointment_id} 
                onChange={(e) => setNewRoute({ ...newRoute, appointment_id: e.target.value })}
            >
                <option value="">Select an Appointment</option> 
                {appointments.map((appointment) => (
                    <option key={appointment.id} value={appointment.id}>{appointment.id}</option>
                ))}
            </select>
            </div>
            <div className="form-group">
            {/* Status Checkbox */}
            <label>Status:</label>
            <input 
                type="checkbox" 
                checked={newRoute.status} 
                onChange={(e) => setNewRoute({ ...newRoute, status: e.target.checked })}
            />
            </div>
            <div className="form-group">
            {/* Distance Covered Input */}
            <label>Distance Covered:</label>
            <input 
                type="number" 
                value={newRoute.distance_covered} 
                onChange={(e) => setNewRoute({ ...newRoute, distance_covered: parseFloat(e.target.value) })}
            />
            </div>

            <button type="submit">Save Updates</button>
                    </form>
                </div>
            )}
        </div>
        </div>
    );
};

export default AdminRoutePage;
