import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SareeCollection.css";
import { FaShoppingCart, FaHeart, FaArrowLeft, FaFilter } from 'react-icons/fa';
import bgSection from "../../assets/bg-section-ourprod.jpg";

// Import videos
import cottonVideo from "../../assets/cotton.mp4";
import westernVideo from "../../assets/Onam.mp4";
import silkVideo from "../../assets/Softsilk.mp4";
import kanjeevaramVideo from "../../assets/kanjeevaram.mp4";
import chettinadVideo from "../../assets/chettinad.mp4";
import vaalainaarVideo from "../../assets/vaalainaar.mp4";

// Expanded saree collection with more details
const sareeCollection = [
  {
    id: 1,
    name: "Kanchipuram Silk Saree",
    price: "Rs.1500",
    category: "Silk",
    video: kanjeevaramVideo,
    description: "Traditional Kanchipuram silk saree with intricate zari work",
    colors: ["Red", "Gold", "Maroon"],
    occasion: "Wedding, Festival"
  },
  {
    id: 2,
    name: "Onam Special Saree",
    price: "Rs.899",
    category: "Cotton",
    video: westernVideo,
    description: "Beautiful Kerala style saree perfect for Onam celebrations",
    colors: ["White", "Gold"],
    occasion: "Festival, Casual"
  },
  {
    id: 3,
    name: "Kalyani Cotton Saree",
    price: "Rs.999",
    category: "Cotton",
    video: cottonVideo,
    description: "Comfortable cotton saree with elegant designs",
    colors: ["Blue", "Green", "Pink"],
    occasion: "Daily Wear, Office"
  },
  {
    id: 4,
    name: "Softsilk Saree",
    price: "Rs.799",
    category: "Silk",
    video: silkVideo,
    description: "Soft silk saree with modern patterns",
    colors: ["Purple", "Teal", "Orange"],
    occasion: "Party, Function"
  },
  {
    id: 5,
    name: "Chettinad Cotton Saree",
    price: "Rs.1299",
    category: "Cotton",
    video: chettinadVideo,
    description: "Traditional Chettinad cotton with bold checks",
    colors: ["Black", "Red", "Yellow"],
    occasion: "Casual, Festival"
  },
  {
    id: 6,
    name: "Vaalainaar Pattu Saree",
    price: "Rs.1999",
    category: "Silk",
    video: vaalainaarVideo,
    description: "Premium silk saree with rich texture and shine",
    colors: ["Royal Blue", "Emerald", "Ruby"],
    occasion: "Wedding, Special Events"
  },
];

function SareeCollection({ addToCart, toggleWishlist, handleBuyNow, wishlistItems = [] }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const isLiked = (productName) => {
    return wishlistItems.some(item => item.name === productName);
  };

  // Filter sarees based on selected filters
  const filteredSarees = sareeCollection.filter(saree => {
    const categoryMatch = selectedCategory === "All" || saree.category === selectedCategory;
    
    let priceMatch = true;
    if (priceRange !== "All") {
      const price = parseInt(saree.price.replace(/Rs\.|,/g, ''));
      if (priceRange === "under1000") priceMatch = price < 1000;
      else if (priceRange === "1000-1500") priceMatch = price >= 1000 && price <= 1500;
      else if (priceRange === "above1500") priceMatch = price > 1500;
    }
    
    return categoryMatch && priceMatch;
  });

  return (
    <div className="saree-collection-main">
      {/* Combined Header & Filter Section */}
      <header className="saree-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <div className="header-content">
          <h1 className="saree-title">Saree Collection</h1>
          <p className="saree-subtitle">Discover our exclusive range of traditional and modern sarees</p>
        </div>
        
        {/* Filter Section inside header */}
        <div className="filter-section">
        <div className="filter-container">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Sarees</option>
              <option value="Silk">Silk Sarees</option>
              <option value="Cotton">Cotton Sarees</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range:</label>
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Prices</option>
              <option value="under1000">Under Rs.1000</option>
              <option value="1000-1500">Rs.1000 - Rs.1500</option>
              <option value="above1500">Above Rs.1500</option>
            </select>
          </div>

          <div className="results-count">
            <span>{filteredSarees.length} Sarees Found</span>
          </div>
        </div>
        </div>
      </header>

      {/* Saree Grid */}
      <section className="saree-grid">
        {filteredSarees.map((saree) => (
          <div className="saree-card" key={saree.id}>
            <div className="saree-video-container">
              <video
                src={saree.video}
                autoPlay
                loop
                muted
                playsInline
                className="saree-video"
              />
              <button
                className={`wishlist-btn ${isLiked(saree.name) ? 'liked' : ''}`}
                onClick={() => toggleWishlist(saree)}
              >
                <FaHeart />
              </button>
              <span className="category-badge">{saree.category}</span>
            </div>

            <div className="saree-info">
              <h3 className="saree-name">{saree.name}</h3>
              <p className="saree-description">{saree.description}</p>
              
              <div className="saree-details">
                <div className="color-options">
                  <span className="detail-label">Colors:</span>
                  <div className="color-dots">
                    {saree.colors.map((color, idx) => (
                      <span 
                        key={idx} 
                        className="color-dot" 
                        title={color}
                        style={{ background: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="occasion-tag">
                  <span className="detail-label">Occasion:</span>
                  <span className="occasion-text">{saree.occasion}</span>
                </div>
              </div>

              <div className="saree-footer">
                <p className="saree-price">{saree.price}</p>
                <div className="saree-actions">
                  <button 
                    className="add-cart-btn" 
                    onClick={() => addToCart(saree)}
                    title="Add to Cart"
                  >
                    <FaShoppingCart />
                  </button>
                  <button 
                    className="buy-now-btn" 
                    onClick={() => handleBuyNow(saree)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Empty State */}
      {filteredSarees.length === 0 && (
        <div className="empty-state">
          <p>No sarees found matching your filters.</p>
          <button 
            className="reset-btn" 
            onClick={() => {
              setSelectedCategory("All");
              setPriceRange("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default SareeCollection;
