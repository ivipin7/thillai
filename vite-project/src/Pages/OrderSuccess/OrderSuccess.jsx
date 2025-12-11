import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderSuccess.css';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load order details.');
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) return <div className="order-success-loading">Loading Order Details...</div>;
    if (error) return <div className="order-success-error">{error}</div>;
    if (!order) return <div className="order-success-error">Order not found.</div>;

    return (
        <div className="order-success-container">
            <div className="order-success-card">
                <div className="success-icon">
                    <FaCheckCircle />
                </div>
                <h1>Order Confirmed!</h1>
                <p className="order-id">Order ID: {order._id}</p>
                <p className="thank-you">Thank you for your purchase, {order.shippingAddress.name}!</p>

                <div className="delivery-info">
                    <div className="delivery-status">
                        <h3>Status</h3>
                        <span className="status-badge">{order.orderStatus || 'Processing'}</span>
                    </div>
                    <div className="delivery-date">
                        <h3>Estimated Delivery</h3>
                        <p>{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="order-items">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="order-item">
                                {item.image && <img src={item.image} alt={item.name} className="order-item-image" />}
                                <div className="order-item-details">
                                    <span className="order-item-name">{item.name}</span>
                                    <span className="order-item-qty">Qty: {item.quantity}</span>
                                </div>
                                <span className="order-item-price">Rs. {item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">
                        <span>Total Amount</span>
                        <span>Rs. {order.totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <div className="shipping-details">
                    <h3>Shipping To:</h3>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    <p>Phone: {order.shippingAddress.phone}</p>
                </div>

                <button className="continue-btn" onClick={() => navigate('/')}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
