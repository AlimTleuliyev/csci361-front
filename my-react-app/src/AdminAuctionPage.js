import React, { useState, useEffect } from 'react';
import './admin.css';
import { Link } from 'react-router-dom';

const AdminAuctionPage = () => {
  const [newAuction, setNewAuction] = useState({
    vehicle_id: '',
    images: '',
    information: '',
  });
  const [editingAuction, setEditingAuction] = useState(null);
  const [carIds, setCarIds] = useState([]);
  const [auctionItems, setAuctionItems] = useState([]);

  useEffect(() => {
    fetchCarIds();
    fetchAuctionItems();
  }, []);

  const fetchAuctionItems = async () => {
    try {
      const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/auction/?skip=0&limit=10');
      if (response.ok) {
        const data = await response.json();
        setAuctionItems(data);
      } else {
        console.error('Failed to fetch auction items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching auction items:', error);
    }
  };

  const fetchCarIds = async () => {
    try {
      const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/vehicle/?skip=0&limit=10');
      if (response.ok) {
        const data = await response.json();
        const ids = data.map((car) => car.id);
        setCarIds(ids);
      } else {
        console.error('Failed to fetch car IDs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching car IDs:', error);
    }
  };

  //https://plankton-app-b4yn3.ondigitalocean.app/auction/?skip=0

  const handleAddAuction = async (e) => {
    e.preventDefault();
    try {
      const auctionToCreate = {
        ...newAuction,
        status: true, // Status is always true
        date_time: new Date().toISOString(), // Date and time are auto-generated
      };

      const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/auction/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionToCreate),
      });

      if (response.ok) {
        setNewAuction({
          vehicle_id: '',
          images: '',
          information: '',
        });
        fetchAuctionItems();
      } else {
        const errorDetails = await response.json();
        console.error('Failed to add auction:', response.statusText, 'Error details:', errorDetails);
      }
    } catch (error) {
      console.error('Error adding auction:', error);
    }
  };

const handleUpdateAuction = (auction) => {
  setEditingAuction(auction);
  setNewAuction({
      vehicle_id: auction.vehicle_id,
      images: auction.images,
      information: auction.information,
  });
};

const handleSaveUpdate = async (e) => {
  e.preventDefault();
  const auctionToUpdate = {
      ...newAuction,
      id: editingAuction.id, // Preserve the ID of the auction being edited
  };

  try {
      const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/auction/${editingAuction.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(auctionToUpdate),
      });

      if (response.ok) {
          setEditingAuction(null);
          setNewAuction({
              vehicle_id: '',
              images: '',
              information: '',
          });
          fetchAuctionItems();
      } else {
          console.error('Failed to update auction:', response.statusText);
      }
  } catch (error) {
      console.error('Error updating auction:', error);
  }
};

const handleDeleteAuction = async (id) => {
    try {
        const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/auction/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchAuctionItems();
        } else {
            console.error('Failed to delete auction:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting auction:', error);
    }
};

  return (
    <div>
      <h2>Create Auction</h2>
      <div className="link-container">
                <Link to="/adminVehicles" className="link-button">Manage Vehicles</Link>
                <Link to="/adminRoutes" className="link-button">Manage Routes</Link>
                <Link to="/admin" className="link-button">Manage Users</Link>
                <Link to="/Reports" className="link-button">Reports</Link>
            </div>
      <div> 
        {/* <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px' }}> */}
          <form onSubmit={handleAddAuction}>
          <div className="form-group">
            <label>Vehicle ID:</label>
              <select
                value={newAuction.vehicle_id}
                onChange={(e) => setNewAuction({ ...newAuction, vehicle_id: e.target.value })}
              >
                <option value="">Select a Vehicle ID</option>
                {carIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
          </div>
          <div className="form-group">
            <label>Image URLs:</label>
              <input
                type="text"
                value={newAuction.images}
                onChange={(e) => setNewAuction({ ...newAuction, images: e.target.value })}
              />
            
          </div>
          <div className="form-group">
            <label>Information about Car:</label>
              <input
                value={newAuction.information}
                onChange={(e) => setNewAuction({ ...newAuction, information: e.target.value })}
              />
          </div>
          <button type="submit">Create Auction</button>
        </form>
        {editingAuction && (
          <div>
            <form onSubmit={handleSaveUpdate}>
              <div className="form-group">
                {/* ...other inputs... */}
              </div>
              <button type="submit">Save Updates</button>
            </form>
          </div>
        )}
        {/* </div> */}
      </div>
      



      <h2>Existing Auctions</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Images</th>
            <th>Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctionItems.map((auction) => (
            <tr key={auction.id}>
              <td>{auction.vehicle_id}</td>
              <td>{auction.images}</td>
              <td>{auction.information}</td>
              <td>
                <button onClick={() => handleUpdateAuction(auction)}>Update</button>
                <button onClick={() => handleDeleteAuction(auction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

    </div>
  );
};

export default AdminAuctionPage;