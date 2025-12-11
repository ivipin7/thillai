import React from 'react';
import './CartModal.css';
import { FaTimes, FaTrash } from 'react-icons/fa';

const CartModal = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onCheckout }) => {
    if (!isOpen) return null;

    const total = cartItems.reduce((sum, item) => {
        let price = 0;
        if (typeof item.price === 'number') {
            price = item.price;
        } else if (typeof item.price === 'string') {
            const numericString = item.price.replace(/Rs\.?/i, '').replace(/[^0-9.]/g, '');
            price = parseFloat(numericString);
        }
        return sum + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);

    return (
        <div className="modal-overlay">
            <div className="modal-content cart-modal">
                <div className="modal-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div key={index} className="cart-item">
                                    {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
                                    <div className="item-info">
                                        <h3>{item.name}</h3>
                                        <p className="item-price">{item.price}</p>
                                    </div>
                                    <div className="item-controls">
                                        <button onClick={() => onUpdateQuantity(item.name, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}>+</button>
                                        <button className="remove-btn" onClick={() => onRemove(item.name)}><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-footer">
                            <div className="cart-total">
                                <h3>Total: Rs.{total.toFixed(2)}</h3>
                            </div>
                            <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;
