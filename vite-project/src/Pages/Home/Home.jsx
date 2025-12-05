
import React, { useEffect, useRef } from "react";
import "./Home.css";
import freedrawing from "../../assets/freehanddrawing.png";
import FooterQuickLinks from "../../Components/FooterQuickLinks/FooterQuickLinks";
import SareeVideo from "../../assets/SareeVideo.mp4";

const Home = ({ scrollToProducts }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Start muted autoplay (allowed by browsers)
      video.muted = true;
      video.play().catch(() => {
        // Autoplay blocked - silent fail
      });
    }

    // Enable sound on first user interaction
    const enableAudio = () => {
      if (video) {
        video.muted = false;
        video.play().catch(() => {});
      }
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  return (
    <div className="Home-Main">
      <div className="Home-Left">
        <h1 className="Home-h1">Your Thread to Timeless Style.</h1>
        <div className="Home-texturelines">
          <div className="main">
            <div className="card" id="c1">
              <div className="cardinner">
                <div className="card__content">
                  <p className="card__title">Premium Quality Fabrics</p>
                  <p className="card__description">
                    At Thillai Textiles, we offer only the finest fabrics,
                    ensuring durability, comfort, and elegance in every thread.
                  </p>
                </div>
              </div>
            </div>
            <div className="card" id="c2">
              <div className="cardinner">
                <div className="card__content">
                  <p className="card__title">Diverse Range of Choices</p>
                  <p className="card__description">
                    From traditional to trendy, our extensive collection caters
                    to all fashion needs, making us your one-stop shop for all
                    textile requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="card" id="c3">
              <div className="cardinner">
                <div className="card__content">
                  <p className="card__title">Affordable Bulk Solutions</p>
                  <p className="card__description">
                    We provide competitive pricing for bulk orders, making us a
                    trusted partner for businesses in the garment and fashion
                    industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="card" id="c4">
              <img src={freedrawing} alt="" className="freedrawing" />
              Our Values
            </div>
            <canvas id="canvas"></canvas>
          </div>
        </div>
        <button className="Home-ExploreBtn btn" onClick={scrollToProducts}>
          EXPLORE NOW
        </button>
      </div>

      <div className="Home-Right">
        <video
          ref={videoRef}
          className="SareeVideo"
          autoPlay
          loop
          playsInline
          controls
        >
          <source src={SareeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="FooterQuickLinks">
        <FooterQuickLinks />
      </div>
    </div>
  );
};

export default Home;
