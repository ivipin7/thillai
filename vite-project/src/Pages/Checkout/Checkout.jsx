import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (location.state && location.state.items) {
            setItems(location.state.items);
        } else {
            // Fallback to cart if no state passed (optional)
            const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
            setItems(savedCart);
        }
    }, [location]);

    const total = items.reduce((sum, item) => {
        let price = 0;
        if (typeof item.price === 'number') {
            price = item.price;
        } else if (typeof item.price === 'string') {
            // Remove "Rs." or "Rs" (case insensitive) and any non-numeric characters except dot
            const numericString = item.price.replace(/Rs\.?/i, '').replace(/[^0-9.]/g, '');
            price = parseFloat(numericString);
        }
        const quantity = item.quantity || 1;
        return sum + (isNaN(price) ? 0 : price) * quantity;
    }, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!isConfirmed) {
            setIsConfirmed(true);
            return;
        }

        setLoading(true);

        const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order on Backend
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const orderData = {
                orderItems: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity || 1,
                    image: item.image || '', // Ensure image is passed if available
                    price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
                    product: item._id // Assuming item has _id if from DB, else optional
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: 'India',
                    phone: formData.phone,
                    name: formData.name,
                    email: formData.email
                },
                paymentMethod: 'Razorpay',
                itemsPrice: total,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: total,
                user: null // Guest for now
            };

            const { data } = await axios.post('http://localhost:5000/api/orders', orderData, config);

            // 2. Initialize Razorpay
            const options = {
                key: data.key,
                amount: data.order.totalPrice * 100,
                currency: 'INR',
                name: 'Thillai Textiles',
                description: 'Order Payment',
                image: '/logo.png', // Add logo path
                order_id: data.razorpayOrderId,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            order_id: data.order._id
                        };

                        await axios.post('http://localhost:5000/api/orders/verify', verifyData, config);

                        alert('Payment Successful! Order Placed.');
                        localStorage.removeItem('cartItems'); // Clear cart
                        navigate(`/order-success/${data.order._id}`); // Redirect to Order Success
                    } catch (error) {
                        alert('Payment Verification Failed');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setLoading(false);

        } catch (error) {
            console.error(error);
            alert('Error creating order');
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-form-section">
                    <h2>Shipping Details</h2>
                    <form onSubmit={handlePayment} className="checkout-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={isConfirmed} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={isConfirmed} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled={isConfirmed} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea required name="address" value={formData.address} onChange={handleInputChange} rows="3" disabled={isConfirmed}></textarea>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input required type="text" name="city" value={formData.city} onChange={handleInputChange} disabled={isConfirmed} />
                        </div>
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} disabled={isConfirmed} />
                        </div>

                        {isConfirmed && (
                            <div className="confirmation-message">
                                <p>Please review your details above. Click "Pay" to proceed.</p>
                                <button type="button" className="edit-btn" onClick={() => setIsConfirmed(false)}>Edit Details</button>
                            </div>
                        )}

                        <button type="submit" className="pay-btn" disabled={loading}>
                            {loading ? 'Processing...' : (isConfirmed ? `Pay Rs.${total.toFixed(2)}` : 'Confirm Details')}
                        </button>
                    </form>
                </div>

                <div className="checkout-summary-section">
                    <h2>Order Summary</h2>
                    <div className="checkout-summary-content">
                        {!isConfirmed ? (
                            <div className="summary-placeholder">
                                <div className="placeholder-icon">🔒</div>
                                <p>Please confirm your shipping details to view your order summary and proceed to payment.</p>
                            </div>
                        ) : (
                            <>
                                {items.map((item, index) => (
                                    <div key={index} className="summary-item">
                                        {/* Assuming item.image is available, otherwise show placeholder or nothing */}
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="summary-item-image" />
                                        ) : (
                                            <div className="summary-item-image-placeholder">No Image</div>
                                        )}
                                        <div className="summary-item-details">
                                            <span className="summary-item-name">{item.name}</span>
                                            <span className="summary-item-qty">Qty: {item.quantity || 1}</span>
                                        </div>
                                        <span className="summary-item-price">{item.price}</span>
                                    </div>
                                ))}
                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>Rs.{total.toFixed(2)}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
