import React, { useEffect } from 'react';
import './Contactus.css';
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook, CiTwitter, CiLocationOn } from "react-icons/ci";
import LogoWhite from '../../assets/LogoWhite.png';
import { CiMail } from "react-icons/ci";

const Contactus = () => {
  
  

  return (
    <div className="Contactus-Main">
      <div className="Golddust">
        <canvas id="Golddust" width="800" height="400"></canvas>
      </div>

      <footer className="footer">
        {/* Company Info */}
        <div className="footer-content">
          <div className="footer-section company-info">
            <img src={LogoWhite} className='footer-logoWhite' alt="Logo" />
            <p className="social-media">Social Media</p>
            <div className="social-icons">
              <a href="https://www.instagram.com/shrithillai_textiles?igsh=MXJweWl5czluMTl6Zw==" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="socialmedia-mainicons" />
              </a>
              {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <CiFacebook className="socialmedia-mainicons"/>
              </a> */}
              <a href="mailto:Shrithillaitextiles@gmail.com" target="_blank" rel="noopener noreferrer">
                <CiMail className="socialmedia-mainicons" />
              </a>
            </div>
          </div>

          {/* Company Address */}
          <div className="footer-section company-address">
            <h4>ADDRESS</h4>
            <a>
              140/70,No.2<br />
              Kumaran Street<br />
              Salem - 636001,Tamilnadu<br />
            </a>
          </div>

          {/* Shop Links */}
          <div className="footer-section shop-links">
            <h4>SHOP</h4>
            <a href="#products">PRODUCTS</a>
            <a href="#pricing">PRICING</a>
          </div>

          {/* Company Links */}
          <div className="footer-section company-links">
          <h4>COMPANY</h4>
          <a href="tel:+919876543210">📞 +91 98765 43210</a>
          <a href="mailto:shrithillaitextiles@gmail.com">✉️ shrithillaitextiles@gmail.com</a>
          <a 
            href="https://www.google.com/maps/place/Shri+Thillai+Textiles/@11.6538967,78.1664337,17z/data=!3m1!4b1!4m6!3m5!1s0x3babf1a3d4d24afd:0x4c67c4ee087f8464!8m2!3d11.6538915!4d78.169014!16s%2Fg%2F11hzwh6qz1?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 Location
          </a>
          </div>
          </div>

        <div className="footer-bottom">
          <div className="freeline"></div>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#cookies">Cookies</a>
        </div>

        <div className='wavecon'>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </footer>
    </div>
  );
};

export default Contactus;
