
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; //for getting user's id (maybe?)
import SearchableTable from './SearchableTable';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createPortal } from 'react-dom'
import { GET_LIMITS, getVehicles, getUsers, UpdateButtonRow } from './PageUtils';
import './SwalModal.css';


// My sincere apologies for the bloat
// But I am no Web Developer, 
// and I know there is a Web Developer—
// somewhere out there—
// sitting and crying;
// reading this code


function MaintenancePage()
{
    // I suppose we need to know who is logged in
    // const location = useLocation();
    // const userId = location.state.userId;

    const [maintRecords, setMaintRecords] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const [swalShownAdd, setSwalShownAdd] = useState(false) // add record modal state
    const [swalShownUpdate, setSwalShownUpdate] = useState(false) // update record modal state

    // debug
    const dvehicles = [{vehicle_id: 1, license_plate: '123ABC', model: 'ToYEETa'}, 
                       {vehicle_id: 2, license_plate: 'GOOGLI', model: 'HOONda'}];

    const columns = [
        {
            name: 'Plate',
            selector: row => row.plate,
        },
        {
            name: 'Mileage',
            selector: row => row.mileage,
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
            name: 'Maintenance Description',
            selector: row => row.maintenance_description,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Cost',
            selector: row => row.total_cost,
        },
        {
            name: 'Images',
            selector: row => row.images,
        },
        {
            name: 'Repairing Parts',
            selector: row => row.repairing_parts,
        },
        {
            name: 'Replaced Parts',
            selector: row => row.replaced_parts,
        },
        {
            name: 'Actions',
            cell: (row) => // TODO: fix modal body popup for every row (reuse addbutton's modal body; feed it) 
                    <>
                    <UpdateButtonRow rowId={row.id} fetchMethod={fetchMaintRecords} setSwalShownUpdate={setSwalShownUpdate} page={'maintenance'} />
                    {swalShownUpdate &&
                        createPortal(
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', }}>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>vehicle_id:</div>
                            <select style={{ marginLeft: '0.5em', }} id="vehicle_id" className="swal2-select" defaultValue={row.vehicle_id}>
                            {vehicles.map((vehicle) => <option value={vehicle.id}>{vehicle.id} - {vehicle.license_plate} - {vehicle.model}</option>)}
                            </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>driver_id:</div>
                            <select style={{ marginLeft: '0.5em', }} id="driver_id" className="swal2-select" defaultValue={row.driver_id}>
                            {users.filter(user => user.role === 'driver').map((user) => <option value={user.id}>{user.id} - {user.surname} - {user.name} - {user.middlename}</option>)}
                            </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>maintainer_id:</div>
                            <select style={{ marginLeft: '0.5em', }} id="maintainer_id" className="swal2-select" defaultValue={row.maintainer_id}>
                            {users.filter(user => user.role === 'maintainer').map((user) => <option value={user.id}>{user.id} - {user.surname} - {user.name} - {user.middlename}</option>)}
                            </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>mileage:</div>
                            <input style={{ marginLeft: '0.5em', }} id="mileage" type="number" className="swal2-input" placeholder="mileage" defaultValue={row.mileage} /> 
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>date:</div>
                            <input style={{ marginLeft: '0.5em', }} id="date" type="date" className="swal2-input" placeholder="date" defaultValue={row.date} /> 
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>time:</div>
                            <input style={{ marginLeft: '0.5em', }} id="time" type="time" className="swal2-input" placeholder="time" defaultValue={row.time} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>maintenance_description:</div>
                            <input style={{ marginLeft: '0.5em', }} id="maintenance_description" className="swal2-input" placeholder="maintenance_description" defaultValue={row.maintenance_description} />
                            </div>
                            {/*<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><label style={{ marginBottom: 0, }} for="status">Status:</label><input style={{ marginTop: '8px', }} id="status" className="swal2-input" name="status" type="checkbox"></div>*/}
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>repairing_parts:</div>
                            <input style={{ marginLeft: '0.5em', }} id="repairing_parts" className="swal2-input" placeholder="repairing_parts" defaultValue={row.repairing_parts} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>replaced_parts:</div>
                            <input style={{ marginLeft: '0.5em', }} id="replaced_parts" className="swal2-input" placeholder="replaced_parts" defaultValue={row.replaced_parts} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>images:</div>
                            <input style={{ marginLeft: '0.5em', }} id="images" className="swal2-input" placeholder="images" defaultValue={row.images} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                            <div style={{ marginTop: '1em', }}>total_cost:</div>
                            <input style={{ marginLeft: '0.5em', }} id="total_cost" type="number" className="swal2-input" placeholder="total_cost" defaultValue={row.total_cost} />
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
        fetchMaintRecords(); // gets data from backend
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
    async function fetchMaintRecords() {
        try {
            console.log('fetchMaintRecords() fired');
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/maintenance_record/?skip=0&limit=${GET_LIMITS}`);
            const data = await response.json();
            setMaintRecords(data);

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
            let processedMaintRecords = data.map((entry) => (
                {
                    ...entry,
                    plate: plateNumbersData[entry['vehicle_id']],
                    driver: driverNamesData[entry['driver_id']],
                    //status: entry.status ? 'True' : 'False' // Map true to 'True', false to 'False'
                }));

            setMaintRecords(processedMaintRecords);
        }
        catch (error) {
            console.error('Error fetching maintenance records:', error);
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

    // logic for the maintenance record adding form (modal)
    async function handleAddButton() 
    {
        const { value: formValues } = await withReactContent(Swal).fire(
            {
                title: 'Add your Maintenance Record',
                focusConfirm: false,
                customClass: 'swal-wide',
                didOpen: () => setSwalShownAdd(true),
                didClose: () => setSwalShownAdd(false),
                preConfirm: () => {
                    return {
                        vehicle_id: document.getElementById('vehicle_id').value,
                        driver_id: document.getElementById('driver_id').value,
                        maintainer_id: document.getElementById('maintainer_id').value,
                        mileage: document.getElementById('mileage').value,
                        date: document.getElementById('date').value,
                        time: document.getElementById('time').value + 'Z',
                        maintenance_description: document.getElementById('maintenance_description').value,
                        //status: document.getElementById('status').value,
                        repairing_parts: document.getElementById('repairing_parts').value,
                        replaced_parts: document.getElementById('replaced_parts').value,
                        images: document.getElementById('images').value,
                        total_cost: document.getElementById('total_cost').value,
                    };
                },
            });

        if (formValues) {
            // Make the API call with formValues
            console.log('Trying to POST: ' + JSON.stringify(formValues));
            fetch('https://plankton-app-b4yn3.ondigitalocean.app/maintenance_record/', {
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
                    Swal.fire('Success!', 'Maintenance Record added successfully!', 'success');
                    fetchMaintRecords();
                })
                .catch(error => {
                    // Handle errors
                    Swal.fire('Error!', 'Failed to add Maintenance Record.', 'error');
                });
        }
    }

    return (
        <div className='maintenance-page'>
            <h1>Maintenance Page</h1>

            {/* Table of Maintenance Records */}
            <SearchableTable
                columns={columns}
                data={maintRecords}
                filter={'plate'}
                handleAddButton={handleAddButton}
                addButtonContext={'Maintenance Record'}
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
                    <select id="maintainer_id" className="swal2-select">
                    {users.filter(user => user.role === 'maintainer').map((user) => <option value={user.id}>{user.id} - {user.surname} - {user.name} - {user.middlename}</option>)}
                    </select>
                    <input id="mileage" className="swal2-input" placeholder="mileage" /> 
                    <input id="date" type="date" className="swal2-input" placeholder="date" /> 
                    <input id="time" type="time" className="swal2-input" placeholder="time" />
                    <input id="maintenance_description" className="swal2-input" placeholder="maintenance_description" />
                    {/*<div style="display: flex; align-items: center; justify-content: center"><label style="margin-bottom: 0;" for="status">Status:</label><input style="margin-top: 8px;" id="status" className="swal2-input" name="status" type="checkbox"></div>*/}
                    <input id="repairing_parts" className="swal2-input" placeholder="repairing_parts" />
                    <input id="replaced_parts" className="swal2-input" placeholder="replaced_parts" />
                    <input id="images" className="swal2-input" placeholder="images" />
                    <input id="total_cost" type="number" className="swal2-input" placeholder="total_cost" />
                    </div>,
                Swal.getHtmlContainer()
            )}
            
        </div>
    );
};

export default MaintenancePage;
