import React, { useState, useEffect } from 'react';
import './PaymentModal.css';
import { FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, items, onPaymentSuccess }) => {
    const [step, setStep] = useState('details'); // details, processing, success
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        paymentMethod: 'cod' // default to Cash on Delivery for simplicity, or 'card'
    });

    useEffect(() => {
        if (isOpen) {
            setStep('details');
            setFormData({ name: '', address: '', phone: '', paymentMethod: 'cod' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const total = items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return sum + price * (item.quantity || 1);
    }, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('processing');

        // Simulate payment processing
        setTimeout(() => {
            const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
            const order = {
                id: orderId,
                date: new Date().toISOString(),
                items: items,
                total: total,
                details: formData,
                status: 'Placed'
            };

            // Save to local storage
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

            setStep('success');
            setTimeout(() => {
                onPaymentSuccess(orderId);
            }, 2000);
        }, 2000);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content payment-modal">
                <div className="modal-header">
                    <h2>Checkout</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {step === 'details' && (
                    <form onSubmit={handleSubmit} className="payment-form">
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-items">
                                {items.map((item, idx) => (
                                    <div key={idx} className="summary-item">
                                        <span>{item.name} x {item.quantity || 1}</span>
                                        <span>{item.price}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-total">
                                <strong>Total: Rs.{total.toFixed(2)}</strong>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Delivery Address</label>
                            <textarea required name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St..." />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="9876543210" />
                        </div>

                        <button type="submit" className="pay-btn">Confirm Order</button>
                    </form>
                )}

                {step === 'processing' && (
                    <div className="processing-state">
                        <FaSpinner className="spinner" />
                        <p>Processing your order...</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="success-state">
                        <FaCheckCircle className="success-icon" />
                        <h3>Order Placed Successfully!</h3>
                        <p>Redirecting...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
