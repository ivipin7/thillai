import React, { useState, useEffect } from 'react';
import logo from '../../assets/Logo.png';
import './Navbar.css';
import { FaShoppingCart, FaHeart, FaTruck } from 'react-icons/fa';

const Navbar = ({
  onNavigateHome,
  onNavigateProducts,
  onNavigateAbout,
  onNavigateContact,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking
}) => {
  const [activePage, setActivePage] = useState('home');
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isActive]);

  const handleNavigation = (page, navigateFunction) => {
    setActivePage(page);
    setIsActive(false);
    navigateFunction();
  };

  return (
    <div className="Navbar-Main">
      <div className="Nav-Branding">
        <img src={logo} alt="logo" className="Nav-Logo" />
      </div>

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
          style={{ fontWeight: activePage === 'home' ? 'bold' : 'normal' }}
        >
          HOME
        </li>
        <li
          onClick={() => handleNavigation('products', onNavigateProducts)}
          className='Nav-li'
          style={{ fontWeight: activePage === 'products' ? 'bold' : 'normal' }}
        >
          PRODUCTS
        </li>
        <li
          onClick={() => handleNavigation('about', onNavigateAbout)}
          className='Nav-li'
          style={{ fontWeight: activePage === 'about' ? 'bold' : 'normal' }}
        >
          ABOUT
        </li>
        <li
          onClick={() => handleNavigation('contact', onNavigateContact)}
          className='Nav-li'
          style={{ fontWeight: activePage === 'contact' ? 'bold' : 'normal' }}
        >
          CONTACT
        </li>
      </span>

      <div className="Nav-Icons">
        <div className="icon-wrapper" onClick={onOpenTracking} title="Track Order">
          <FaTruck className="nav-icon" />
        </div>
        <div className="icon-wrapper" onClick={onOpenWishlist} title="Wishlist">
          <FaHeart className="nav-icon" />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </div>
        <div className="icon-wrapper" onClick={onOpenCart} title="Cart">
          <FaShoppingCart className="nav-icon" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
