import { useRef } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Pages/Home/Home';
import Contactus from './Pages/Contactus/Contactus.jsx';
import About from './Pages/About/About.jsx';
import './App.css';
import OurProducts from './Pages/OurProducts/OurProducts.jsx';
import greenbg from './assets/Green-Background.png';
import { useParallax } from "react-scroll-parallax";
import { Parallax } from 'react-scroll-parallax';


function App() {
  const homeRef = useRef(null);
  const contactusRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRef = useRef(null); // Ref for OurProducts

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <Navbar
        onNavigateHome={() => scrollToSection(homeRef)}
        onNavigateContact={() => scrollToSection(contactusRef)}
        onNavigateAbout={() => scrollToSection(aboutRef)}
        onNavigateProducts={() => scrollToSection(productsRef)}
      />

      <div ref={homeRef}>
        <Home scrollToProducts={() => scrollToSection(productsRef)} /> {/* Pass scroll function */}
      </div>
      <div ref={productsRef}> {/* Ref for OurProducts */}
        <OurProducts />
      </div>
      <img src={greenbg} alt='greenbg' className='greenbg'/>
      {/* <Parallax speed={-10}> */}
      <div ref={aboutRef}>
        <About />
      </div>
    {/* </Parallax> */}
      <Parallax speed={20}>
      <div ref={contactusRef} className='contactusref'>
        <Contactus 
         onNavigateHome={() => scrollToSection(homeRef)}
         onNavigateContact={() => scrollToSection(contactusRef)} // Navbar scroll to Contactus
         onNavigateAbout={() => scrollToSection(aboutRef)}
         onNavigateProducts={() => scrollToSection(productsRef)}/>
      </div>
    </Parallax>
    </>
  );
}

export default App;
