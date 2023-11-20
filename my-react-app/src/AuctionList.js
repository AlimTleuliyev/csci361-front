// AuctionList.js
import React from 'react';
import AuctionItem from './AuctionItem';

const AuctionList = ({ auctionItems }) => {
    return (
        <div>
            <h2>Auction Items</h2>
            {auctionItems.map((item) => (
                <AuctionItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default AuctionList;
