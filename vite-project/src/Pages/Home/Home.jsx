import React ,{useEffect} from "react";
import Sareeimg from "../../assets/Saree.png";
import "./Home.css";
import freedrawing from '../../assets/freehanddrawing.png'
import FooterQuickLinks from "../../Components/FooterQuickLinks/FooterQuickLinks";

const Home = ({ scrollToProducts }) => {


  useEffect(() => {
    const canvas = document.getElementById('canvas');

    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    let X = (canvas.width = window.innerWidth);
    let Y = (canvas.height = window.innerHeight);
    const shapeNum = 300;
    const shapes = [];

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function Shape(ctx, x, y) {
      this.ctx = ctx;
      this.init(x, y);
    }

    Shape.prototype.init = function (x, y) {
      this.x = x;
      this.y = y;
      this.r = rand(10, 25);
      this.ga = Math.random() * Math.random() * Math.random() * Math.random();
      this.v = {
        x: Math.random(),
        y: -1,
      };
      this.l = rand(0, 20);
      this.sl = this.l;
    };

    Shape.prototype.updateParams = function () {
      this.l -= 1;
      if (this.l < 0) {
        this.init((X * (Math.random() + Math.random())) / 2, rand(0, Y));
      }
    };

    Shape.prototype.updatePosition = function () {
      this.x += Math.random();
      this.y += -Math.random();
    };

    Shape.prototype.draw = function () {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = this.ga;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.render = function (i) {
      this.updatePosition();
      this.updateParams();
      this.draw();
    };

    for (let i = 0; i < shapeNum; i++) {
      const s = new Shape(
        ctx,
        (X * (Math.random() + Math.random())) / 2,
        rand(0, Y)
      );
      shapes.push(s);
    }

    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    function onResize() {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="Home-Main">
      <div className="Home-Left">
        <h1 className="Home-h1">Your Thread to Timeless Style.</h1>
        <div className="Home-texturelines">
          <div class="main">
            <div class="card" id="c1">
              <div class="cardinner">
                {/* <div>PREMIUM</div> */}
                <div class="card__content">
                  <p class="card__title">Premium Quality Fabrics</p>
                  <p class="card__description">
                    
                    At Thillai Textiles, we offer only the finest fabrics,
                    ensuring durability, comfort, and elegance in every thread.
                  </p>
                </div>
              </div>
            </div>
            <div class="card" id="c2">
              <div class="cardinner">
                {/* <div>PREMIUM</div> */}
                <div class="card__content">
                  <p class="card__title">Diverse Range of Choices</p>
                  <p class="card__description">
                    From traditional to trendy, our extensive collection caters
                    to all fashion needs, making us your one-stop shop for all
                    textile requirements.
                  </p>
                </div>
              </div>
            </div>
            <div class="card" id="c3">
              <div class="cardinner">
                {/* <div>PREMIUM</div> */}
                <div class="card__content">
                  <p class="card__title">Affordable Bulk Solutions</p>
                  <p class="card__description">
                    {" "}
                    We provide competitive pricing for bulk orders, making us a
                    trusted partner for businesses in the garment and fashion
                    industry. .
                  </p>
                </div>
              </div>
            </div>
            <div class="card" id="c4">
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
        <img src={Sareeimg} alt="sareeimg" className="Sareeimg" />
      </div>
      <div className="FooterQuickLinks">

      <FooterQuickLinks/>
      </div>
    </div>
  );
};

export default Home;
