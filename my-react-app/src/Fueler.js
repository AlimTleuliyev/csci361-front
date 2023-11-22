import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { isAuthenticated, isFueler } from '../auth'; // hypothetical auth helper functions

const FuelerPage = () => {
    // const history = useHistory();
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [fuelers, setFuelers] = useState([]);

    const [fuelRecord, setFuelRecord] = useState({
        vehicle_id: '',
        driver_id: '',
        fueler_id: '',
        date: '',
        fuel_amount: '',
        total_cost: '',
        gas_station_name: '',
        images_before: '',
        images_after: '',
    });
    const [error, setError] = useState('');

    // Redirect if not authenticated or not a fueler
    // if (!isAuthenticated() || !isFueler()) {
    //     history.push('/login'); // Or some error page
    // }

    const fetchFuelRecords = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/fuel_record');
            const data = await response.json();
            setFuelRecord(data);
        } catch (error) {
            console.error('Error fetching fuel records:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch vehicles
                let response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle');
                let data = await response.json();
                console.log("Vehicles:", data); // Log to check the structure
                setVehicles(data);

                response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users');
                const users = await response.json();
                // Fetch fuelers
                const fuelersData = users.filter(user => user.role === 'fueler');
                setFuelers(fuelersData);

                // Fetch drivers
                const driversData = users.filter(user => user.role === 'driver');
                setDrivers(driversData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleChange = (e) => {
        setFuelRecord({ ...fuelRecord, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        // For simplicity, let's assume you only want one image for before and after
        if (e.target.files && e.target.files[0]) {
            const fieldName = e.target.name;
            // Assuming you have a state variable to hold the file itself
            setFuelRecord({ ...fuelRecord, [fieldName]: e.target.files[0] });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to handle file uploads and then submit the form data to the backend
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/fuel_record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fuelRecord),
                // include credentials if necessary for auth
            });
            if (response.ok) {
                fetchFuelRecords();
                // Reset the newRoute form
                setFuelRecord({
                    vehicle_id: '',
                    driver_id: '',
                    fueler_id: '',
                    date: '',
                    fuel_amount: '',
                    total_cost: '',
                    gas_station_name: '',
                    images_before: '',
                    images_after: '',

                });
            } else {
                setError('Failed to save the fuel record.');
            }
        } catch (err) {
            setError('An error occurred.');
        }
    };

    return (
        <div>
            <h2>Fuel Record Entry</h2>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
            {/* Dropdown for Vehicle ID */}
            <div className="form-group">
                <label>Vehicle:</label>
                <select
                    name="vehicle_id"
                    value={fuelRecord.vehicle_id}
                    onChange={handleChange}
                    required
                >                       
                 <option value="">Select a Vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.name} - {vehicle.id}
                            </option>
                        ))}
                    </select>
            </div>
            {/* Dropdown for Driver ID */}
            <div className="form-group">
                <label>Driver:</label>
                <select
                    name="fueler_id"
                    value={fuelRecord.fueler_id}
                    onChange={handleChange}
                    required
                >                        
                <option value="">Select a Driver</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name} - {driver.id}
                            </option>
                        ))}
                    </select>
            </div>

            {/* Dropdown for Fueler ID */}
            <div className="form-group">
                <label>Fueler:</label>
                <select
                    name="fueler_id"
                    value={fuelRecord.fueler_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Fueler</option>
                    {fuelers.map((fueler) => (
                        <option key={fueler.id} value={fueler.id}>
                            {fueler.name} - {fueler.id}
                        </option>
                    ))}
                </select>
            </div>
            <br />

            <div className="form-group">              
            <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={fuelRecord.date}
                    onChange={handleChange}
                    required
                />
            </div>  
            <div className="form-group"> 
            <label>Fuel Amount (in liters):</label>
                <input
                    type="number"
                    name="fuel_amount"
                    value={fuelRecord.fuel_amount}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
            </div>
            <br />
            <div className="form-group"> 
            <label>Total Cost:</label>
                <input
                    type="number"
                    name="total_cost"
                    value={fuelRecord.total_cost}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
            </div>
            <div className="form-group">
            <label>Gas Station Name:</label>
                <input
                    type="text"
                    name="gas_station_name"
                    value={fuelRecord.gas_station_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
            <label>Images Before Refueling:</label>
                <input
                    type="file"
                    name="images_before"
                    onChange={handleFileChange} // You'll need to implement this
                    multiple
                />
            </div>
            <div className="form-group">

            <label>Images After Refueling:</label>
                <input
                    type="file"
                    name="images_after"
                    onChange={handleFileChange} 
                    multiple
                />
            </div>
            <button type="submit">Submit Record</button>
        </form>

        </div>
    );
};

export default FuelerPage;