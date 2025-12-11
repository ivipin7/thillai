import { useRef, useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Pages/Home/Home';
import Contactus from './Pages/Contactus/Contactus.jsx';
import About from './Pages/About/About.jsx';
import './App.css';
import OurProducts from './Pages/OurProducts/OurProducts.jsx';
import greenbg from './assets/Green-Background.png';
import { Parallax } from 'react-scroll-parallax';

// Modals
import CartModal from './Components/CartModal/CartModal.jsx';
import WishlistModal from './Components/WishlistModal/WishlistModal.jsx';
import PaymentModal from './Components/PaymentModal/PaymentModal.jsx';
import TrackingModal from './Components/TrackingModal/TrackingModal.jsx';
import Offers from './Components/Offers/Offers.jsx';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Checkout from './Pages/Checkout/Checkout.jsx';
import OrderSuccess from './Pages/OrderSuccess/OrderSuccess.jsx';
import SareeCollection from './Pages/SareeCollection/SareeCollection.jsx';

function App() {
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const contactusRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRef = useRef(null);

  // State for Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // State for Data
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlistItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [checkoutItems, setCheckoutItems] = useState([]); // Items being purchased (Cart or Single Item)

  // Persist Data
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cart Handlers
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Optional: Open cart on add
  };

  const removeFromCart = (productName) => {
    setCartItems(prev => prev.filter(item => item.name !== productName));
  };

  const updateQuantity = (productName, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item =>
      item.name === productName ? { ...item, quantity } : item
    ));
  };

  // Wishlist Handlers
  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.name === product.name);
      if (exists) {
        return prev.filter(item => item.name !== product.name);
      }
      return [...prev, product];
    });
    setIsWishlistOpen(true);
  };

  const moveWishlistToCart = (product) => {
    addToCart(product);
    // toggleWishlist(product); // Remove from wishlist - logic in toggleWishlist handles toggle, so calling it again removes it if present
    setWishlistItems(prev => prev.filter(item => item.name !== product.name));
  };

  // Checkout Handlers
  const handleBuyNow = (product) => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    navigate('/checkout', { state: { items: [{ ...product, quantity: 1 }] } });
  };

  const handleCartCheckout = () => {
    setCheckoutItems(cartItems);
    setIsCartOpen(false);
    navigate('/checkout', { state: { items: cartItems } });
  };

  const handlePaymentSuccess = (orderId) => {
    // This might be handled in Checkout page now, but keeping for PaymentModal if used
    const purchasedNames = checkoutItems.map(i => i.name);
    setCartItems(prev => prev.filter(i => !purchasedNames.includes(i.name)));
    setIsPaymentOpen(false);
  };

  const handleNavigateToSection = (ref) => {
    // If not on home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => scrollToSection(ref), 100);
    } else {
      scrollToSection(ref);
    }
  };

  return (
    <>
      <Navbar
        onNavigateHome={() => handleNavigateToSection(homeRef)}
        onNavigateContact={() => handleNavigateToSection(contactusRef)}
        onNavigateAbout={() => handleNavigateToSection(aboutRef)}
        onNavigateProducts={() => handleNavigateToSection(productsRef)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Spacer to prevent fixed navbar from overlapping content */}
      <div style={{ height: '120px', width: '100%' }}></div>

      <Routes>
        <Route path="/" element={
          <>
            <div ref={homeRef}>
              <Home scrollToProducts={() => scrollToSection(productsRef)} />
            </div>
            <div ref={productsRef}>
              <OurProducts
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                handleBuyNow={handleBuyNow}
                wishlistItems={wishlistItems}
              />
            </div>

            {/* Offers Section */}
            <Offers />

            <div ref={aboutRef}>
              <About />
            </div>

            <Parallax speed={20}>
              <div ref={contactusRef} className='contactusref'>
                <Contactus
                  onNavigateHome={() => scrollToSection(homeRef)}
                  onNavigateContact={() => scrollToSection(contactusRef)}
                  onNavigateAbout={() => scrollToSection(aboutRef)}
                  onNavigateProducts={() => scrollToSection(productsRef)} />
              </div>
            </Parallax>
          </>
        } />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/sarees" element={
          <SareeCollection
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            handleBuyNow={handleBuyNow}
            wishlistItems={wishlistItems}
          />
        } />
      </Routes>

      {/* Modals */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCartCheckout}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onMoveToCart={moveWishlistToCart}
        onRemove={(name) => toggleWishlist({ name })}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        items={checkoutItems}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </>
  );
}

export default App;
