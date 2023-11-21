import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './SwalModal.css';

export const GET_LIMITS = 15; // for GET fetches (default: 10)

export async function getVehicles() {
    let data = [];
    try { // this API call is a bottleneck if we only need vehicle_id : license_plate pairs (no routes/auctions) 
        const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/vehicle/?skip=0&limit=${GET_LIMITS}`);
        data = await response.json();
    }
    catch (error) {
        console.error('Error fetching vehicles:', error);
    }

    return data;
}

export async function getUsers() {
    let data = [];
    try {
        const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/all/`);
        data = await response.json();
    }
    catch (error) {
        console.error('Error fetching users:', error);
    }

    return data;
}

export function UpdateButtonRow({ rowId, fetchMethod, setSwalShownUpdate, page }) 
{
    const handleUpdate = async () => {
        // Open the modal for updating the record
        const { value: formValues } = await withReactContent(Swal).fire(
            {
            title: 'Update Record',
            focusConfirm: false,
            customClass: 'swal-wide',
            didOpen: () => setSwalShownUpdate(true),
            didClose: () => setSwalShownUpdate(false),
            preConfirm: () => 
            {
                // get the correct JSON body
                switch (page) {
                    case 'maintenance':
                        return {
                            vehicle_id: document.getElementById('upd_vehicle_id').options[document.getElementById('upd_vehicle_id').selectedIndex].value,
                            driver_id: document.getElementById('upd_driver_id').options[document.getElementById('upd_driver_id').selectedIndex].value,
                            maintainer_id: document.getElementById('upd_maintainer_id').options[document.getElementById('upd_maintainer_id').selectedIndex].value,
                            mileage: document.getElementById('upd_mileage').value,
                            date: document.getElementById('upd_date').value,
                            time: document.getElementById('upd_time').value + 'Z', // last time, improper formats dropped the server
                            maintenance_description: document.getElementById('upd_maintenance_description').value,
                            repairing_parts: document.getElementById('upd_repairing_parts').value,
                            replaced_parts: document.getElementById('upd_replaced_parts').value,
                            images: document.getElementById('upd_images').value,
                            total_cost: document.getElementById('upd_total_cost').value,
                            };
                
                    case 'fuel':
                        return {
                            vehicle_id: document.getElementById('updf_vehicle_id').options[document.getElementById('updf_vehicle_id').selectedIndex].value,
                            fueler_id: document.getElementById('updf_fueler_id').options[document.getElementById('updf_fueler_id').selectedIndex].value,
                            driver_id: document.getElementById('updf_driver_id').options[document.getElementById('updf_driver_id').selectedIndex].value,
                            date: document.getElementById('updf_date').value,
                            time: document.getElementById('updf_time').value + 'Z',
                            fuel_amount: document.getElementById('updf_fuel_amount').value,
                            total_cost: document.getElementById('updf_total_cost').value,
                            gas_station_name: document.getElementById('updf_gas_station_name').value,
                            images_before: document.getElementById('updf_images_before').value,
                            images_after: document.getElementById('updf_images_after').value,
                            };
                    
                    default:
                        break;
                }
            },
            });

        if (formValues) 
        {
            // Make the API call with formValues
            console.log('Trying to POST: ' + JSON.stringify(formValues));
            fetch(`https://plankton-app-b4yn3.ondigitalocean.app/${page}_record/${rowId}`, {
                method: 'PUT',
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
                Swal.fire('Success!', `${page} Record updated successfully!`, 'success');
                fetchMethod(); // refetch maintenance records after update (could be better by just updating locally)
                })
            .catch(error => {
                    // Handle errors
                    Swal.fire('Error!', `Failed to update the ${page} Record.`, 'error');
                });
        }
    };

    return <button style={{ margin: 0 , marginRight: '16px'}} onClick={handleUpdate}>Update</button>;
}
