import React, { useState, useEffect } from "react";
import './OurProducts.css';
import Product_Image from '../../assets/Product_Image.png';
import banarsi from '../../assets/banarsi saree.jpg'
import design from '../../assets/designer saree.jpg'
import cherfon from '../../assets/cherfon.jpg'
import kanji from '../../assets/kanjiveram saree.jpg'
import verget from '../../assets/verget.jpg'
import wast from '../../assets/wastern.jpg'
import cotton from '../../assets/cotton saree.jpg'
import FooterQuickLinks from "../../Components/FooterQuickLinks/FooterQuickLinks";
import ProductBg1 from '../../assets/ProductPageBg1.png'
import ProductBg2 from '../../assets/ProductPageBg2.png'


const products = [
  { name: "Designer Saree", price: "Rs.1000", rating: "5.0", image: Product_Image },
  { name: "Cotton Saree", price: "Rs.999", rating: "4.9", image: design },
  { name: "Western Saree", price: "Rs.899", rating: "4.8", image: wast },
  { name: "Silk Saree", price: "Rs.799", rating: "4.7", image: cotton },
  { name: "Banarasi Saree", price: "Rs.1200", rating: "4.9", image: banarsi },
  { name: "Kanjeevaram Saree", price: "Rs.1500", rating: "4.6", image: kanji },
  { name: "Georgette Saree", price: "Rs.1100", rating: "4.8", image: verget },
  { name: "Chiffon Saree", price: "Rs.1300", rating: "4.5", image: cherfon }
];

function OurProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProducts = products.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 4) % totalProducts);
    }, 4000); // Slide every 2 seconds
    return () => clearInterval(interval);
  }, [totalProducts]);

  const visibleProducts = products.slice(currentIndex, currentIndex + 4).concat(
    products.slice(0, Math.max(0, (currentIndex + 4) - totalProducts))
  );

  return (
    <div className="OurProduct-Main">
      <header >
        <div className="Product-header">
            <h1>Our products</h1>
            <nav>
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#" className="active">Hot</a>
                <div className="varieties-dropdown">
                <a href="#">Varieties</a>
                <div className="dropdown-content">
                  <a href="#">Designer Saree</a>
                  <a href="#">Banarasi Saree</a>
                  <a href="#">Silk Saree</a>
                  <a href="#">Cotton Saree</a>
                  <a href="#">Chiffon Saree</a>
                  <a href="#">Georgette Saree</a>
                  <a href="#">Kanchipuram Saree</a>
                  <a href="#">Paithani Saree</a>
                  <a href="#">Tussar Saree</a>
                  <a href="#">Linen Saree</a>
                  <a href="#">Chanderi Saree</a>
                  <a href="#">Patola Saree</a>
                </div>
              </div>

            </nav>
        </div>
        <div className="ProductsBg">
          <img src={ProductBg1} className="ProductsBg1" alt="" />
          <img src={ProductBg2} className="ProductsBg2" alt="" />
          
      </div>
      </header>

      <div className="products-carousel">
        <div className="products-grid">
          {visibleProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <h3 className="product-name">{product.name}</h3>
              <div className="product-details">
                <p>{product.price}</p>
                <div className="product-details-line"></div>
                <div className="rating">
                  {product.rating} <span>⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="OurProducts FooterQuickLinks">

      <FooterQuickLinks/>
      </div>
     
    </div>
  );
}

export default OurProducts;
