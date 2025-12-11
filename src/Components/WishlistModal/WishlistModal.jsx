import React from 'react';
import './WishlistModal.css';
import { FaTimes, FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistModal = ({ isOpen, onClose, wishlistItems, onMoveToCart, onRemove }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content wishlist-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Your Wishlist</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">
                        <p>Your wishlist is empty.</p>
                    </div>
                ) : (
                    <div className="wishlist-items">
                        {wishlistItems.map((item, index) => (
                            <div key={index} className="wishlist-item">
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.price}</p>
                                </div>
                                <div className="item-actions">
                                    <button className="move-btn" onClick={() => onMoveToCart(item)}>
                                        <FaShoppingCart /> Move to Cart
                                    </button>
                                    <button className="remove-btn" onClick={() => onRemove(item.name)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistModal;
