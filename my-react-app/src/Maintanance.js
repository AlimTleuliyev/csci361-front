import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';
import { useParams } from 'react-router-dom';
const MaintenancePage = () => {
    const { userId } = useParams();
    const [maintainerId, setMaintainerId] = useState(userId);
    const [vehicles, setVehicles] = useState([]);
    const [maintainers, setMaintainers] = useState([]);
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);
    const [maintenanceRecord, setMaintenanceRecord] = useState({
        vehicle_id: '',
        driver_id: '',
        maintainer_id: userId,
        mileage: '',
        date_time: '',
        maintenance_description: '',
        repairing_parts: '',
        replaced_parts: '',
        images: '',
        total_cost: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        setMaintainerId(userId);
        console.log('Maintainer ID:', userId);
        fetchVehicles();
        fetchMaintenance();
        fetchMaintenanceRecords();
    }, [userId]);

    const fetchMaintenanceRecords = async () => {
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            let m_records = data.maintainer_maintenance_records; // Declare f_records with const or let
            setMaintenanceRecords(m_records);
        } catch (error) {
            console.error('Error fetching maintenance records:', error);
            setError('Failed to fetch maintenance records');
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

    const fetchDriver = async (vehicleId) => {
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/vehicle/${vehicleId}`);
            
            if (response.ok) {
                const vehicleData = await response.json();
                const driverId = vehicleData.driver_id;
                setMaintenanceRecord(prev => ({ ...prev, driver_id: driverId }));
                console.log(maintenanceRecord);
            } else {
                console.error('Error fetching driver:', response.status);
            }
        } catch (error) {
            console.error('Error fetching driver:', error);
        }
    };
    
    const fetchMaintenance = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/maintenance_record');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Fetch the driver_id based on the selected vehicle's ID
        const selectedVehicleId = maintenanceRecord.vehicle_id;
        fetchDriver(selectedVehicleId);
        const [date, time] = maintenanceRecord.date_time.split('T');

        const maintenanceRecordWithDateAndTime = {
            ...maintenanceRecord,
            date, // Assuming your backend requires a separate date field
            time, // Assuming your backend requires a separate time field
        };
    
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/maintenance_record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(maintenanceRecordWithDateAndTime),
            });
    
            if (response.ok) {
                fetchMaintenance();
                // setError('');
                setMaintenanceRecord({
                    vehicle_id: '',
                    driver_id: '',
                    mileage: '',
                    date_time: '',
                    maintenance_description: '',
                    repairing_parts: '',
                    replaced_parts: '',
                    images: '',
                    total_cost: '',
                });
            } else {
                const errorData = await response.json();
                setError('Failed to save the maintenance record: ' + JSON.stringify(errorData));
            }
        } catch (err) {
            setError('An error occurred: ' + err.message);
        }
    };
    
    

    return (
        <div className="admin-page">
            <h2>Maintenance Record Entry</h2>
            
            {error && <p>Error: {error}</p>}
            <p>Maintainer ID: {maintainerId}</p>
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
                    <input type="text" name="images" onChange={handleChange} />
                </div>

                <button type="submit">Submit</button>
                <div>
            <h2>Maintenance Records</h2>
            {error && <p>Error: {error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vehicle ID</th>
                        <th>Driver ID</th>
                        <th>Date Time</th>
                        <th>Maintenance Description</th>
                        <th>Repairing Parts</th>
                        <th>Replaced Parts</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {maintenanceRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.vehicle_id}</td>
                            <td>{record.driver_id}</td>
                            <td>{record.date_time}</td>
                            <td>{record.maintenance_description}</td>
                            <td>{record.repairing_parts}</td>
                            <td>{record.replaced_parts}</td>
                            <td>{record.total_cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            </form>
        </div>
    );
};

export default MaintenancePage;
