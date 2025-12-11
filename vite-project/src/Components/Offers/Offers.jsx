import React from 'react';
import './Offers.css';

const offersData = [
    { title: "Flat 50% Off", subtitle: "On Silk Sarees" },
    { title: "Buy 1 Get 1", subtitle: "Cotton Special" },
    { title: "New Arrival", subtitle: "Check It Out" },
    { title: "Best Seller", subtitle: "Trending Now" },
    { title: "Free Shipping", subtitle: "On Orders > 1000" }
];

const Offers = () => {
    return (
        <div className="offers-wrapper">
            <div className="offers-container">
                {offersData.map((offer, index) => (
                    <div className="offer-circle" key={index}>
                        <div className="offer-content">
                            <span>{offer.title}</span>
                            <span>{offer.subtitle}</span>
                            <span>Limited Time</span>
                            <span>Shop Now</span>
                            {/* Duplicate for smooth scroll */}
                            <span>{offer.title}</span>
                        </div>
                    </div>
                ))}
                {/* Duplicate the offers for seamless loop */}
                {offersData.map((offer, index) => (
                    <div className="offer-circle" key={`duplicate-${index}`}>
                        <div className="offer-content">
                            <span>{offer.title}</span>
                            <span>{offer.subtitle}</span>
                            <span>Limited Time</span>
                            <span>Shop Now</span>
                            <span>{offer.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;
