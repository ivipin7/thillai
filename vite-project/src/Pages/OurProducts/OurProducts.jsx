import React from "react";
import { useNavigate } from "react-router-dom";
import "./OurProducts.css";
import FooterQuickLinks from "../../Components/FooterQuickLinks/FooterQuickLinks";
import { FaShoppingCart, FaHeart, FaArrowRight } from 'react-icons/fa';
import BgForProductsPage from "../../assets/BgForProductsPage.png";

// ✅ Background images
import ProductBg1 from "../../assets/ProductPageBg1.png";
import ProductBg2 from "../../assets/ProductPageBg2.png";

// 🎥 Videos for products
import cottonVideo from "../../assets/cotton.mp4";            // Kalyani Cotton Sarees
import westernVideo from "../../assets/Onam.mp4";            // Onam Sarees
import silkVideo from "../../assets/Softsilk.mp4";           // Softsilk Sarees
import kanjeevaramVideo from "../../assets/kanjeevaram.mp4"; // Kanchipuram Sarees
import chettinadVideo from "../../assets/chettinad.mp4";     // Chettinad Cotton Sarees
import vaalainaarVideo from "../../assets/vaalainaar.mp4";   // Vaalainaar Pattu Sarees

// ✅ Product list
const products = [
  { name: "Kanchipuram Saree", price: "Rs.1500", video: kanjeevaramVideo },
  { name: "Onam Saree", price: "Rs.899", video: westernVideo },
  { name: "Kalyani Cotton Saree", price: "Rs.999", video: cottonVideo },
  { name: "Softsilk Saree", price: "Rs.799", video: silkVideo },
  { name: "Chettinad Cotton Saree", price: "Rs.1299", video: chettinadVideo },
  { name: "Vaalainaar Pattu Saree", price: "Rs.1999", video: vaalainaarVideo },
];

function OurProducts({ addToCart, toggleWishlist, handleBuyNow, wishlistItems = [] }) {
  const navigate = useNavigate();

  const isLiked = (productName) => {
    return wishlistItems.some(item => item.name === productName);
  };

  return (
    <div className="our-products-main">
      {/* Header Section */}
      <header className="product-header">
        <button className="view-all-sarees-btn" onClick={() => navigate('/sarees')}>
          View All Sarees Collection <FaArrowRight />
        </button>
        <div className="products-bg">
          <img src={BgForProductsPage} alt="Background" />
        </div>
      </header>

      {/* Products Grid */}
      <section className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="video-container">
              <video
                src={product.video}
                autoPlay
                loop
                muted
                playsInline
                className="product-video"
              />
              <button
                className={`wishlist-btn ${isLiked(product.name) ? 'liked' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <FaHeart />
              </button>
            </div>

            <h3 className="product-name">{product.name}</h3>
            <div className="product-details">
              <p className="product-price">{product.price}</p>
            </div>

            <div className="product-actions">
              <button className="add-cart-btn" onClick={() => addToCart(product)}>
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="buy-now-btn" onClick={() => handleBuyNow(product)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer-links">
        <FooterQuickLinks />
      </footer>
    </div>
  );
}

export default OurProducts;
