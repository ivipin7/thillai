import React, { useState } from 'react';
import './TrackingModal.css';
import { FaTimes, FaSearch, FaBoxOpen } from 'react-icons/fa';

const TrackingModal = ({ isOpen, onClose }) => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleTrack = (e) => {
        e.preventDefault();
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const order = orders.find(o => o.id === orderId.trim());

        if (order) {
            setOrderStatus(order);
            setError('');
        } else {
            setOrderStatus(null);
            setError('Order not found. Please check the ID.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content tracking-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Track Your Order</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <form onSubmit={handleTrack} className="tracking-form">
                    <div className="search-box">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID (e.g., ORD-123456)"
                            required
                        />
                        <button type="submit"><FaSearch /></button>
                    </div>
                </form>

                {error && <p className="error-msg">{error}</p>}

                {orderStatus && (
                    <div className="order-status">
                        <div className="status-header">
                            <FaBoxOpen className="status-icon" />
                            <div>
                                <h3>Order Found!</h3>
                                <p>ID: {orderStatus.id}</p>
                            </div>
                        </div>
                        <div className="status-details">
                            <div className="status-step completed">
                                <div className="dot"></div>
                                <p>Order Placed</p>
                                <span>{new Date(orderStatus.date).toLocaleDateString()}</span>
                            </div>
                            <div className="status-step active">
                                <div className="dot"></div>
                                <p>Processing</p>
                            </div>
                            <div className="status-step">
                                <div className="dot"></div>
                                <p>Shipped</p>
                            </div>
                            <div className="status-step">
                                <div className="dot"></div>
                                <p>Delivered</p>
                            </div>
                        </div>
                        <div className="order-items-preview">
                            <h4>Items:</h4>
                            <ul>
                                {orderStatus.items.map((item, idx) => (
                                    <li key={idx}>{item.name} (x{item.quantity || 1})</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackingModal;
