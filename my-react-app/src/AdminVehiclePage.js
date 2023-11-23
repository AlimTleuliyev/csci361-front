import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const AdminVehiclePage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [vehicleToUpdate, setVehicleToUpdate] = useState(null);
    const [newVehicle, setNewVehicle] = useState({
        driver_id: '',
        model: '',
        year: 0,
        license_plate: '',
        capacity: 0,
    });

    useEffect(() => {
        fetchVehicles();
        fetchDrivers();
    }, []);
    const showUpdateForm = (vehicle) => {
        setIsUpdating(true);
        setVehicleToUpdate(vehicle);
    };

    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle/all');
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
        
    };
    const fetchDrivers = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/');
            const users = await response.json();
            const drivers = users.filter(user => user.role === 'driver');
            setDrivers(drivers);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };
    const handleAddVehicle = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVehicle),
            });
    
            const responseBody = await response.json();
            
            if (response.ok) {
                // If the server responds with the added vehicle, use it directly
                setVehicles(prevVehicles => [...prevVehicles, responseBody]);
                setNewVehicle({
                    driver_id: '',
                    model: '',
                    year: 0,
                    license_plate: '',
                    capacity: 0,
                });
            } else {
                console.error('Failed to add vehicle:', responseBody.message);
            }
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };
    
    const getDriverNameById = (driver_id) => {
        const driver = drivers.find(driver => driver.id === driver_id);
        return driver ? driver.name : 'Unknown'; // or any fallback text you want
    };
    
    const handleDeleteVehicle = async (id) => {
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/vehicle/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update the list of vehicles after deleting one
                fetchVehicles();
            } else {
                console.error('Failed to delete vehicle:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };
    const handleUpdateVehicle = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/vehicle/${vehicleToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleToUpdate),
            });

            if (response.ok) {
                // Update was successful, refresh the list of vehicles
                fetchVehicles();
                setIsUpdating(false);
            } else {
                // Handle errors
                console.error('Failed to update vehicle:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };
    return (
        <div>
            <h2>Admin Vehicle Management</h2>
            <div className="link-container">
                <Link to="/admin" className="link-button">Manage Users</Link>
                <Link to="/adminRoutes" className="link-button">Manage Routes</Link>
                <Link to="/adminAuctions" className="link-button">Manage Auctions</Link>
                <Link to="/Reports" className="link-button">Reports</Link>
            </div>
            {/* Form for adding a new vehicle */}
            <form onSubmit={handleAddVehicle}>
                <div className="form-group">
                    <label>Driver:</label>
                    <select
                        value={newVehicle.driver_id}
                        onChange={(e) => setNewVehicle({ ...newVehicle, driver_id: e.target.value })}
                    >
                        <option value="">Select a Driver</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        Model:
                    </label>
                    <input type="text" value={newVehicle.model} onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })} />
                </div>
                <div class="form-group">
                    <label>
                        Year:
                    </label>
                    <input type="number" value={newVehicle.year} onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value, 10) })} />
                </div>
                <div class="form-group">
                    <label>
                        License Plate:
                    </label>
                    <input type="text" value={newVehicle.license_plate} onChange={(e) => setNewVehicle({ ...newVehicle, license_plate: e.target.value })} />
                </div>
                <div class="form-group">

                    <label>
                        Capacity:
                    </label>
                        <input type="number" value={newVehicle.capacity} onChange={(e) => setNewVehicle({ ...newVehicle, capacity: parseInt(e.target.value, 10) })} />
                </div>
                <button type="submit">Add</button>
            </form>
            {isUpdating && vehicleToUpdate && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsUpdating(false)}>&times;</span>
                        <h3>Update Vehicle</h3>
                        <form onSubmit={handleUpdateVehicle}>
                            <div className="form-group">
                                <label>Driver:</label>
                                <select
                                    value={vehicleToUpdate.driver_id}
                                    onChange={(e) => setVehicleToUpdate({ ...vehicleToUpdate, driver_id: e.target.value })}
                                >
                                    <option value="">Select a Driver</option>
                                    {drivers.map((driver) => (
                                        <option key={driver.id} value={driver.id}>
                                            {driver.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Model:</label>
                                <input
                                    type="text"
                                    value={vehicleToUpdate.model}
                                    onChange={(e) => setVehicleToUpdate({ ...vehicleToUpdate, model: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Year:</label>
                                <input
                                    type="number"
                                    name="year"
                                    value={vehicleToUpdate.year}
                                    onChange={(e) => setVehicleToUpdate({ ...vehicleToUpdate, year: parseInt(e.target.value, 10) || '' })}
                                />
                            </div>
                            <div className="form-group">
                                <label>License Plate:</label>
                                <input
                                    type="text"
                                    name="license_plate"
                                    value={vehicleToUpdate.license_plate}
                                    onChange={(e) => setVehicleToUpdate({ ...vehicleToUpdate, license_plate: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Capacity (kg):</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={vehicleToUpdate.capacity}
                                    onChange={(e) => setVehicleToUpdate({ ...vehicleToUpdate, capacity: parseInt(e.target.value, 10) || '' })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Updates</button>
                        </form>
                    </div>
                </div>
            )}
            {/* List of existing vehicles */}
            <h1>All Vehicles</h1>
             <div class="scrollmenu">
             <table>
                <thead>
                    <tr>
                    <th>Driver</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>License plate</th>
                    <th>Capacity</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} >
                        <td>{getDriverNameById(vehicle.driver_id)}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.license_plate}</td>
                        <td>{vehicle.capacity}</td>
                        <td>
                        <button className="update-button" onClick={() => showUpdateForm(vehicle)}>Update</button>
                        <button className="delete-button" onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            </div>
        </div>
    );
};

export default AdminVehiclePage;
