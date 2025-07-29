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
            <h2 className="footer-title">Shri Thillai Textiles</h2>
            <p className="social-media">Social Media</p>
            <div className="social-icons">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="socialmedia-mainicons" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <CiFacebook className="socialmedia-mainicons"/>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
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
            <a href="#contact">CONTACT</a>
            <a href="#location">LOCATION</a>
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
