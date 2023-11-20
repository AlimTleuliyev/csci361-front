// Auction.js
import React, { useState, useEffect } from 'react';
import AuctionList from './AuctionList';


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
            <h1>Welcome to the Auction Page</h1>
            <AuctionList auctionItems={auctionItems} />
        </div>
    );
};

export default Auction;
