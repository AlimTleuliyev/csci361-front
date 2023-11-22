import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';
const MaintenancePage = () => {

    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [maintainers, setMaintainers] = useState([]);
    const [maintenanceRecord, setMaintenanceRecord] = useState({
        vehicle_id: '',
        driver_id: '',
        maintainer_id: '',
        mileage: '',
        date_time: '',
        maintenance_description: '',
        status: false, 
        repairing_parts: '',
        replaced_parts: '',
        images: '',
        total_cost: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDrivers();
        fetchVehicles();
        fetchMaintenance();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/drivers');
            const data = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle');
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const fetchMaintenance = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/maintenance_records');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMaintainers(data);
        } catch (error) {
            console.error('Error fetching maintenance records:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaintenanceRecord(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setMaintenanceRecord(prev => ({ ...prev, [name]: checked }));
    };

    const handleFileChange = (e) => {
        // Assuming only single image is handled, not multiple
        const { name, files } = e.target;
        if (files.length > 0) {
            setMaintenanceRecord(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append('vehicle_id', maintenanceRecord.vehicle_id);
        formData.append('driver_id', maintenanceRecord.driver_id);
        formData.append('maintainer_id', maintenanceRecord.maintainer_id);
        formData.append('mileage', maintenanceRecord.mileage.toString());
        formData.append('date_time', maintenanceRecord.date_time);
        formData.append('maintenance_description', maintenanceRecord.maintenance_description);
        formData.append('status', maintenanceRecord.status);
        formData.append('repairing_parts', maintenanceRecord.repairing_parts);
        formData.append('replaced_parts', maintenanceRecord.replaced_parts);
        formData.append('total_cost', maintenanceRecord.total_cost.toString());
    
        if (maintenanceRecord.images) {
            formData.append('images', maintenanceRecord.images);
        }
    
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/maintenance_record', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                fetchMaintenance();
                // Reset the newRoute form
                setMaintenanceRecord({
                    vehicle_id: '',
                    driver_id: '',
                    maintainer_id: '',
                    mileage: '',
                    date_time: '',
                    maintenance_description: '',
                    status: false, // assuming false as default for status
                    repairing_parts: '',
                    replaced_parts: '',
                    images: '',
                    total_cost: '',
                })
            } else {
                // If the server responds with an error, handle it here
                setError('Failed to save the maintenance record.');
            }
        } catch (err) {
            // Handle network errors or other exceptions
            setError('An error occurred during submission.');
        }
    };
    

    return (
        <div className="admin-page">
            <h2>Maintenance Record Entry</h2>
            
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Vehicle ID:</label>
                    <select name="vehicle_id" value={maintenanceRecord.vehicle_id} onChange={handleChange} required>
                        <option value="">Select a Vehicle</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.id}>{vehicle.id}</option>
                        ))}
                    </select>
                
                </div>

                {/* ... similar dropdowns for driver_id and maintainer_id ... */}
                <div className="form-group">
                    <label> Mileage:</label>
                        <input type="number" name="mileage" value={maintenanceRecord.mileage} onChange={handleChange} required />
                    
                </div>
                <div className="form-group">
                <label>Date and Time of Maintenance:</label>
                    <input type="datetime-local" name="date_time" value={maintenanceRecord.date_time} onChange={handleChange} required />
                
                </div>
                <div className="form-group">
                <label>Maintenance Description:</label>
                    <input name="maintenance_description" value={maintenanceRecord.maintenance_description} onChange={handleChange} required />
                
                </div>
                <div className="form-group">
                <label>Status:</label>
                    <input type="checkbox" name="status" checked={maintenanceRecord.status} onChange={handleCheckboxChange} />
                
                </div>
                <div className="form-group">
                <label>Repairing Parts:</label>
                    <input type="text" name="repairing_parts" value={maintenanceRecord.repairing_parts} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Replaced Parts:</label>
                    <input type="text" name="replaced_parts" value={maintenanceRecord.replaced_parts} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Total Cost:</label>
                    <input type="number" name="total_cost" value={maintenanceRecord.total_cost} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Images:</label>
                    <input type="file" name="images" onChange={handleFileChange} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MaintenancePage;
