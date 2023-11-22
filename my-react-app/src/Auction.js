// Auction.js
import React, { useState, useEffect } from 'react';
import './Auction.css'; // Ensure you have a corresponding CSS file for styles

const Auction = () => {
    const [auctionItems, setAuctionItems] = useState([]);

    useEffect(() => {
        // Fetch auction items from the backend API
        const fetchAuctionItems = async () => {
            try {
                const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/auction/?skip=0&limit=10'); // Replace with your actual API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setAuctionItems(data);
                } else {
                    console.error('Failed to fetch auction items.');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchAuctionItems();
    }, []);

    return (
        <div>
            <h2 className="text-center">Welcome to the Auction Page</h2>
            <div className="row">
                {auctionItems.map((item) => (
                    <div className="column" key={item.id}>
                        <div className="card">
                            <img src={item.images} alt="Vehicle" style={{ width: '100%' }} />
                            <div className="container">
                                <h3>{item.information}</h3>
                                <p className="title">Status: {item.status ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Auction;
