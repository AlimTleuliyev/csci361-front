import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FuelerPage = () => {
    const { userId } = useParams();
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [fuelerId, setFuelerId] = useState(userId);
    const [fuelRecord, setFuelRecord] = useState({
        vehicle_id: '', // Initialize with an empty string
        driver_id: '',  // Initialize with an empty string
        fueler_id: userId,
        date: '',
        fuel_amount: 0, // Initialize with 0
        total_cost: 0,  // Initialize with 0
        gas_station_name: '',
        images_before: '',
        images_after: '',
    });
    const [allRecords, setFuelRecords] = useState([]);
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false);

    const handleSearch = (results) => {
        setSearchResults(results);
        setIsTableVisible(true); 

    };
    const fetchRecords = async () => {
    try {
        const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${userId}`);
        const data = await response.json();
        console.log('Raw API Response:', data); // Log the raw API response

        let f_records = data.fueler_fuel_records; // Declare f_records with const or let
        setFuelRecords(f_records); // Set the fuel records fetched from the API
    } catch (error) {
        console.error('Error fetching fuel records:', error);
    }
};

    const fetchFuelRecords = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/fuel_record');
            const data = await response.json();
            setFuelRecord(data[0]); // Assuming the response is an array with one object
        } catch (error) {
            console.error('Error fetching fuel records:', error);
        }
    };

    useEffect(() => {
        setFuelerId(userId);
        fetchDrivers();
        fetchRecords();
    }, [userId]);

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

    const fetchVehiclesForDriver = async (driverId) => {
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${driverId}`);
            const driverData = await response.json();
            
            // Assuming that "vehicles" is a field within the driver object
            const vehiclesData = driverData.vehicles;
    
            setVehicles(vehiclesData);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };
    

    const handleDriverSelect = (selectedDriverId) => {
        setFuelRecord({
            ...fuelRecord,
            driver_id: selectedDriverId,
            vehicle_id: '',
            fueler_id: userId,
            date: '',
            fuel_amount: 0, // Initialize with 0
            total_cost: 0,  // Initialize with 0
            gas_station_name: '',
            images_before: '',
            images_after: '',
        });
        fetchVehiclesForDriver(selectedDriverId);
    };

    const handleChange = (e) => {
        setFuelRecord({ ...fuelRecord, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    // Add a sample time value (replace with a valid time)
    const updatedFuelRecord = { ...fuelRecord, time: '11:19:00.000Z' };
    try {
        const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/fuel_record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFuelRecord),
        });
        if (response.ok) {
            fetchFuelRecords();
            // setError('');
            setFuelRecord({
                fuelRecord
            });
        } else {
            const errorData = await response.json();
            setError('Failed to save the fuel record: ' + JSON.stringify(errorData));
        }
    } catch (err) {
        setError('An error occurred: ' + err.message);
    }
};


    return (
        <div>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="fueler-page">
                <h2>Fueler Profile</h2>
                <>
                    <SearchForm onSearch={handleSearch} />
                    {isTableVisible && searchResults.length > 0 && (
                        <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Driver ID</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>License Plate</th>
                            <th>Capacity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.driver_id}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.license_plate}</td>
                                <td>{vehicle.capacity}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                </>
                <p>Fueler ID: {fuelerId}</p>
                </div>
                <div className="form-group">
                    <label>Driver:</label>
                    <select
                        name="driver_id"
                        value={fuelRecord.driver_id}
                        onChange={(e) => handleDriverSelect(e.target.value)}
                        required
                    >
                        <option value="">Select a Driver</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name} - {driver.id}
                            </option>
                        ))}
                    </select>
                    {/* <button onClick={() => handleDriverSelect(fuelRecord.driver_id)}>Pick the Driver</button> */}
                </div>
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
                        type="text"
                        name="images_before"
                        value={fuelRecord.images_before}
                        onChange={handleChange}
                        multiple
                    />
                </div>
                <div className="form-group">
                    <label>Images After Refueling:</label>
                    <input
                        type="text"
                        name="images_after"
                        value={fuelRecord.images_after}
                        onChange={handleChange}
                        multiple
                    />
                </div>
                <button type="submit">Submit Record</button>
                <div>
    <h2>Fuel Records</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Fueler ID</th>
                <th>Vehicle ID</th>
                <th>Driver ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Fuel Amount</th>
                <th>Total Cost</th>
                <th>Gas Station Name</th>
            </tr>
        </thead>
        <tbody>
            {allRecords.map((record) => (
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.fueler_id}</td>
                    <td>{record.vehicle_id}</td>
                    <td>{record.driver_id}</td>
                    <td>{record.date}</td>
                    <td>{record.time}</td>
                    <td>{record.fuel_amount}</td>
                    <td>{record.total_cost}</td>
                    <td>{record.gas_station_name}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            </form>
        </div>
    );
};
function SearchForm({ onSearch }) {
    const [plateNumber, setPlateNumber] = useState('');
  
    const handlePlateInputChange = (e) => {
        setPlateNumber(e.target.value); // No longer converting to uppercase
    }
    const handlePlateSearchSubmit = (e) => {
        e.preventDefault();
        if (!plateNumber) {
          console.error('Please enter a plate number.');
          return;
        }
        const url = `https://plankton-app-b4yn3.ondigitalocean.app/vehicle/license_plate/${plateNumber}`;
        console.log('good')
        fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Search results:', data); // Log the search results
          onSearch(data); 
        })
        .catch((error) => {
          console.error('Error searching for vehicle:', error);
        });
      };
      
  
    return (
      <div className="search">
        <form onSubmit={handlePlateSearchSubmit}>
          <input
            type="text"
            placeholder="Search by plate number"
            value={plateNumber}
            onChange={handlePlateInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
  
export default FuelerPage;