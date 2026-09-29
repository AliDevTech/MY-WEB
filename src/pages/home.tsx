import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, CreditCard, MapPin, ShieldCheck, Truck } from "lucide-react";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><BadgeCheck size={15} aria-hidden="true" /> LPG delivery, made dependable</span>
          <h1>Good food starts with <span>a full cylinder.</span></h1>
          <p>Order household and commercial LPG online, and have a trusted cylinder delivered to your door.</p>
          <div className="hero-buttons">
            <Link to="/products" className="primary-button">Shop cylinders <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link to="/track-order" className="secondary-button">Track an order</Link>
          </div>
          <div className="hero-note"><MapPin size={16} aria-hidden="true" /> Serving Lahore and nearby areas</div>
        </div>
        <div className="hero-visual">
          <img src={heroImage} alt="LPG cylinder ready for home delivery" />
          <div className="hero-visual-caption"><ShieldCheck size={18} aria-hidden="true" /> Quality checked cylinders</div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span className="feature-icon"><Truck size={20} aria-hidden="true" /></span>
          <div><h3>At your door</h3><p>Convenient delivery to your location.</p></div>
        </div>

        <div className="feature">
          <span className="feature-icon"><ShieldCheck size={20} aria-hidden="true" /></span>
          <div><h3>Safety checked</h3><p>Quality cylinders from trusted suppliers.</p></div>
        </div>

        <div className="feature">
          <span className="feature-icon"><CreditCard size={20} aria-hidden="true" /></span>
          <div><h3>Flexible payment</h3><p>Pay by cash or digital wallet.</p></div>
        </div>
      </section>
    </main>
  );
}

export default Home;