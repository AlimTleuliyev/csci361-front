import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const GET_LIMITS = 15; // for GET fetches (default: 10)

export async function getVehicles() {
    let data = [];
    try {
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
        const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/?skip=0&limit=${GET_LIMITS}`);
        data = await response.json();
    }
    catch (error) {
        console.error('Error fetching users:', error);
    }

    return data;
}

const maint_record_elements = {
    vehicle_id: document.getElementById('upd_vehicle_id').value,
    driver_id: document.getElementById('upd_driver_id').value,
    maintainer_id: document.getElementById('upd_maintainer_id').value,
    mileage: document.getElementById('upd_mileage').value,
    date: document.getElementById('upd_date').value,
    time: document.getElementById('upd_time').value + ':00.000Z', // last time, improper formats dropped the server
    maintenance_description: document.getElementById('upd_maintenance_description').value,
    repairing_parts: document.getElementById('upd_repairing_parts').value,
    replaced_parts: document.getElementById('upd_replaced_parts').value,
    images: document.getElementById('upd_images').value,
    total_cost: document.getElementById('upd_total_cost').value,
    };

const fuel_record_elements = {
    vehicle_id: document.getElementById('vehicle_id').value,
    fueler_id: document.getElementById('fueler_id').value,
    driver_id: document.getElementById('driver_id').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value + ':00.000Z',
    fuel_amount: document.getElementById('fuel_amount').value,
    total_cost: document.getElementById('total_cost').value,
    gas_station_name: document.getElementById('gas_station_name').value,
    images_before: document.getElementById('images_before').value,
    images_after: document.getElementById('images_after').value,
    };

export function UpdateButtonRow({ rowId, fetchMethod, setSwalShownUpdate, page }) 
{
    const handleUpdate = async () => {
        // Open the modal for updating the record
        const { value: formValues } = await withReactContent(Swal).fire(
            {
            title: 'Update Record',
            focusConfirm: false,
            didOpen: () => setSwalShownUpdate(true),
            didClose: () => setSwalShownUpdate(false),
            preConfirm: () => 
            {
                // get the correct JSON body
                switch (page) {
                    case 'Maintenance':
                        return maint_record_elements;
                
                    case 'Fuel':
                        return fuel_record_elements;
                    
                    default:
                        break;
                }
            },
            });

        if (formValues) 
        {
            // Make the API call with formValues
            console.log('Trying to POST: ' + JSON.stringify(formValues));
            fetch(`https://plankton-app-b4yn3.ondigitalocean.app/maintenance_record/${rowId}`, {
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
