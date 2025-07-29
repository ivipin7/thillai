import React, { useState, useEffect } from 'react';
import logo from '../../assets/Logo.png';
import './Navbar.css';
import BrandNameLogo from '../../assets/ShriThillaiTextilesBrandNameLogo.png'


const Navbar = ({ onNavigateHome, onNavigateProducts, onNavigateAbout, onNavigateContact }) => {
  const [activePage, setActivePage] = useState('home');
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Add or remove class to body to prevent scrolling
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup to ensure body class is removed when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isActive]);

  const handleNavigation = (page, navigateFunction) => {
    setActivePage(page);
    setIsActive(false); // Close the menu when a navigation link is clicked
    navigateFunction();
  };

  return (
    <div className='Navbar-Main'>
      <span className='Nav-Branding'>
        <img src={logo} alt="logo" className='Nav-Logo' />
        <img src={BrandNameLogo} className='BrandNameLogo' alt="Shri Thillai Textiles" />
      </span>
      
      <div 
        className={`Nav-HandBurger ${isActive ? 'active' : ''}`} 
        onClick={toggleMenu}
      > 
        <li></li>
        <li></li>
        <li></li>
      </div>
      
      <span className={`Nav-Links ${isActive ? 'active' : ''}`}>
        <li
          onClick={() => handleNavigation('home', onNavigateHome)}
          className='Nav-li'
          style={{ fontWeight: activePage === 'home' ? 'bold' : 'normal' , transform: activePage === 'home' ? 'scale(1.1)' : null }}
        >
          HOME
        </li>
        <li
          onClick={() => handleNavigation('products', onNavigateProducts)}
          className='Nav-li'
          style={{ fontWeight: activePage === 'products' ? 'bold' : 'normal' , transform: activePage === 'products' ? 'scale(1.1)' : null }}
        >
          PRODUCTS
        </li>
        <li
          onClick={() => handleNavigation('about', onNavigateAbout)}
          className='Nav-li'
          style={{ fontWeight: activePage === 'about' ? 'bold' : 'normal' , transform: activePage === 'about' ? 'scale(1.1)' : null}}
        >
          ABOUT
        </li>
        <li
          onClick={() => handleNavigation('contact', onNavigateContact)}
          className='Nav-li'
          style={{ fontWeight: activePage === 'contact' ? 'bold' : 'normal' , transform: activePage === 'conatact' ? 'scale(1.1)' : null }}
        >
          CONTACT
        </li>
      </span>
    </div>
  );
};

export default Navbar;
