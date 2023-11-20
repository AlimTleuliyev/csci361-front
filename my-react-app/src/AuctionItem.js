// AuctionItem.js
import React from 'react';
import './Auction.css';

const AuctionItem = ({ item }) => {
    return (
        <div>
            <img src={item.images} alt="Vehicle" />
            <h3>{item.information}</h3>
            <p>Status: {item.status ? 'Active' : 'Inactive'}</p>
            <p>Date Time: {new Date(item.date_time).toLocaleString()}</p>
            <button>Place Bid</button>
        </div>
    );
};

export default AuctionItem;