import React, { useState, useEffect } from 'react';

const AdminVehiclePage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({
        driver_id: 0,
        model: '',
        year: 0,
        license_plate: '',
        capacity: 0,
    });

    useEffect(() => {
        // Fetch the list of vehicles from the backend
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle/?skip=0&limit=10');
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleAddVehicle = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVehicle),
            });

            if (response.ok) {
                // Update the list of vehicles after adding a new one
                fetchVehicles();
                // Reset the newVehicle form
                setNewVehicle({
                    driver_id: 0,
                    model: '',
                    year: 0,
                    license_plate: '',
                    capacity: 0,
                });
            } else {
                console.error('Failed to add vehicle:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
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

    return (
        <div>
            <h2>Admin Vehicle Management</h2>

            {/* Form for adding a new vehicle */}
            <form onSubmit={handleAddVehicle}>
                <label>
                    Model:
                    <input type="text" value={newVehicle.model} onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })} />
                </label>
                <br />
                <label>
                    Year:
                    <input type="number" value={newVehicle.year} onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value, 10) })} />
                </label>
                <br />
                <label>
                    License Plate:
                    <input type="text" value={newVehicle.license_plate} onChange={(e) => setNewVehicle({ ...newVehicle, license_plate: e.target.value })} />
                </label>
                <br />
                <label>
                    Capacity:
                    <input type="number" value={newVehicle.capacity} onChange={(e) => setNewVehicle({ ...newVehicle, capacity: parseInt(e.target.value, 10) })} />
                </label>
                <br />
                <button type="submit">Add Vehicle</button>
            </form>

            {/* List of existing vehicles */}
            <ul>
                {vehicles.map((vehicle) => (
                    <li key={vehicle.id}>
                        {vehicle.model} ({vehicle.year}) - {vehicle.license_plate} - Capacity: {vehicle.capacity}
                        <button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminVehiclePage;
