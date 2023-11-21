import React, { useState, useEffect } from 'react';
import SearchableTable from './SearchableTable';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createPortal } from 'react-dom'
import { GET_LIMITS, getVehicles, getUsers, UpdateButtonRow } from './PageUtils';
import './SwalModal.css';

function FuelingPage()
{
    const [fuelRecords, setFuelRecords] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const [swalShownAdd, setSwalShownAdd] = useState(false) // add record modal state
    const [swalShownUpdate, setSwalShownUpdate] = useState(false) // update record modal state

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'Plate',
            selector: row => row.plate,
        },
        {
            name: 'Images Before',
            selector: row => row.images_before,
        },
        {
            name: 'Images After',
            selector: row => row.images_after,
        },
        {
            name: 'Date',
            selector: row => row.date,
        },
        {
            name: 'Time',
            selector: row => row.time,
        },
        {
            name: 'Driver',
            selector: row => row.driver,
        },
        {
            name: 'Fuel',
            selector: row => row.fuel_amount,
        },
        {
            name: 'Cost',
            selector: row => row.total_cost,
        },
        {
            name: 'Station',
            selector: row => row.gas_station_name,
        },
        {
            name: 'Actions',
            cell: (row) => 
                    <>
                    <UpdateButtonRow rowId={row.id} fetchMethod={fetchFuelRecords} setSwalShownUpdate={setSwalShownUpdate} page={'fuel'} />
                    {swalShownUpdate &&
                        createPortal(
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', }}>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>vehicle_id:</div>
                            <select style={{ marginLeft: '0.5em', }} id="updf_vehicle_id" className="swal2-select" defaultValue={row.vehicle_id}>
                            {vehicles.map((vehicle) => <option value={vehicle.id}>{vehicle.id} - {vehicle.license_plate} - {vehicle.model}</option>)}
                            </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>driver_id:</div>
                            <select style={{ marginLeft: '0.5em', }} id="updf_driver_id" className="swal2-select" defaultValue={row.driver_id}>
                            {users.filter(user => user.role === 'driver').map((user) => <option value={user.id}>{user.id} - {user.surname} - {user.name} - {user.middlename}</option>)}
                            </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>fueler_id:</div>
                            <select style={{ marginLeft: '0.5em', }} id="updf_fueler_id" className="swal2-select" defaultValue={row.fueler_id}>
                            {users.filter(user => user.role === 'fueler').map((user) => <option value={user.id}>{user.id} - {user.surname} - {user.name} - {user.middlename}</option>)}
                            </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>date:</div>
                            <input style={{ marginLeft: '0.5em', }} id="updf_date" type="date" className="swal2-input" placeholder="date" defaultValue={row.date} /> 
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>time:</div>
                            <input style={{ marginLeft: '0.5em', }} id="updf_time" type="time" className="swal2-input" placeholder="time" defaultValue={row.time} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>fuel_amount:</div>
                            <input style={{ marginLeft: '0.5em', }} id="updf_fuel_amount" type="number" className="swal2-input" placeholder="fuel_amount" defaultValue={row.fuel_amount} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>total_cost:</div>
                            <input style={{ marginLeft: '0.5em', }} id="updf_total_cost" type="number" className="swal2-input" placeholder="total_cost" defaultValue={row.total_cost} />
                            </div>
                            {/*<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><label style={{ marginBottom: 0, }} for="status">Status:</label><input style={{ marginTop: '8px', }} id="status" className="swal2-input" name="status" type="checkbox"></div>*/}
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>gas_station_name:</div>
                            <input style={{ marginLeft: '0.5em', }} id="updf_gas_station_name" className="swal2-input" placeholder="gas_station_name" defaultValue={row.gas_station_name} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>images_before:</div>
                            <input style={{ marginLeft: '0.5em', }} id="updf_images_before" className="swal2-input" placeholder="images_before" defaultValue={row.images_before} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>images_after:</div>
                            <input style={{ marginLeft: '0.5em', }} id="updf_images_after" className="swal2-input" placeholder="images_after" defaultValue={row.images_after} />
                            </div>
                            </div>,
                            Swal.getHtmlContainer()
                        )}
                    </>,
        },
    ];

    // should run only once
    useEffect(() => 
    {
        fetchFuelRecords(); // gets data from backend
        fetchVehicles(); // gets a local copy for the add/update modal
        fetchUsers(); // same story
    }, []); // do not just remove the dependency array (the effect will fire continuosly)
    
    // fetch for the modals
    async function fetchVehicles() {
        const data = await getVehicles();
        setVehicles(data);
    }

    async function fetchUsers() {
        const data = await getUsers();
        setUsers(data);
    }

    // fetch for the table
    async function fetchFuelRecords() {
        try {
            console.log('fetchFuelRecords() fired');
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/fuel_record/?skip=0&limit=${GET_LIMITS}`);
            const data = await response.json();
            setFuelRecords(data);

            let uniqueVehicleIDs = new Set();
            let uniqueDriverIDs = new Set();

            for (const entry of data) {
                uniqueDriverIDs.add(entry['driver_id']);
                uniqueVehicleIDs.add(entry['vehicle_id']);
            }

            const [plateNumbersData, driverNamesData] = await Promise.all([
                fetchPlateNumbers(uniqueVehicleIDs),
                fetchDriverNames(uniqueDriverIDs),
            ]);

            // Process and update state after all async operations are complete
            let processedFuelRecords = data.map((entry) => (
                {
                    ...entry,
                    plate: plateNumbersData[entry['vehicle_id']],
                    driver: driverNamesData[entry['driver_id']],
                    //status: entry.status ? 'True' : 'False' // Map true to 'True', false to 'False'
                }));

            setFuelRecords(processedFuelRecords);
        }
        catch (error) {
            console.error('Error fetching fuel records:', error);
        }
    }

    async function fetchPlateNumbers(uniqueVehicleIDs) {
        let plateNumbersData = {};

        for (const vehicleId of uniqueVehicleIDs) {
            try {
                const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/vehicle/${vehicleId}`);
                const data = await response.json();
                plateNumbersData[vehicleId] = data.license_plate;
            }
            catch (error) {
                console.error(`Error fetching license plate of vehicleId=${vehicleId}:`, error);
            }
        }

        return plateNumbersData;
    }
    
    async function fetchDriverNames(uniqueDriverIDs) {
        let driverNamesData = {};

        for (const driverId of uniqueDriverIDs) {
            try {
                const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${driverId}`);
                const data = await response.json();
                driverNamesData[driverId] = `${data.surname} ${data.name} ${data.middlename}`;
            }
            catch (error) {
                console.error(`Error fetching name of driverId=${driverId}:`, error);
            }
        }

        return driverNamesData;
    }

    // logic for the fuel record adding form (modal)
    async function handleAddButton() 
    {
        const { value: formValues } = await withReactContent(Swal).fire(
            {
                title: 'Add your Fuel Record',
                focusConfirm: false,
                customClass: 'swal-wide',
                didOpen: () => setSwalShownAdd(true),
                didClose: () => setSwalShownAdd(false),
                preConfirm: () => {
                    return {
                        vehicle_id: document.getElementById('vehicle_id').value,
                        fueler_id: document.getElementById('fueler_id').value,
                        driver_id: document.getElementById('driver_id').value,
                        date: document.getElementById('date').value,
                        time: document.getElementById('time').value + 'Z',
                        fuel_amount: document.getElementById('fuel_amount').value,
                        total_cost: document.getElementById('total_cost').value,
                        gas_station_name: document.getElementById('gas_station_name').value,
                        images_before: document.getElementById('images_before').value,
                        images_after: document.getElementById('images_after').value,
                    };
                },
            });

        if (formValues) {
            // Make the API call with formValues
            console.log('Trying to POST: ' + JSON.stringify(formValues));
            fetch('https://plankton-app-b4yn3.ondigitalocean.app/fuel_record/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })
                .then(response => {
                    if (!response.ok) {
                        // Check for HTTP errors
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle the API response, show success message, etc.
                    Swal.fire('Success!', 'Fuel Record added successfully!', 'success');
                    fetchFuelRecords();
                })
                .catch(error => {
                    // Handle errors
                    Swal.fire('Error!', 'Failed to add Fuel Record.', 'error');
                });
        }
    }

    return (
        <div className='fueling-page'>
            <h1>Fueling Page</h1>

            {/* Table of Fueling Records */}
            <SearchableTable
                columns={columns}
                data={fuelRecords}
                filter={'plate'}
                handleAddButton={handleAddButton}
                addButtonContext={'Fuel Record'}
            />
            {/* Inspiration from: https://sweetalert2.github.io/recipe-gallery/input-datepicker.html */}
            {/* Use createPortal to use the same state between your app and SweetAlert2 */}
            {swalShownAdd &&
                createPortal(
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', }}>
                    <select id="vehicle_id" className="swal2-select">
                    {vehicles.map((vehicle) => <option value={vehicle.id}>{vehicle.id} - {vehicle.license_plate} - {vehicle.model}</option>)}
                    </select>
                    <select id="driver_id" className="swal2-select">
                    {users.filter(user => user.role === 'driver').map((user) => <option value={user.id}>{user.id} - {user.surname} - {user.name} - {user.middlename}</option>)}
                    </select>
                    <select id="fueler_id" className="swal2-select">
                    {users.filter(user => user.role === 'fueler').map((user) => <option value={user.id}>{user.id} - {user.surname} - {user.name} - {user.middlename}</option>)}
                    </select>
                    <input id="date" type="date" className="swal2-input" placeholder="date" /> 
                    <input id="time" type="time" className="swal2-input" placeholder="time" />
                    <input id="fuel_amount" type="number" className="swal2-input" placeholder="fuel_amount" />
                    <input id="total_cost" type="number" className="swal2-input" placeholder="total_cost" />
                    <input id="gas_station_name" className="swal2-input" placeholder="gas_station_name" />
                    <input id="images_before" className="swal2-input" placeholder="images_before" />
                    <input id="images_after" className="swal2-input" placeholder="images_after" />
                    </div>,
                Swal.getHtmlContainer()
            )}
            
        </div>
    );
}

export default FuelingPage;
