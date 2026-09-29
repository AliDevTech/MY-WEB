import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ClipboardList, CreditCard, MapPin, PackageCheck, Route, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "../component/productcard";
import heroImage from "../assets/hero.png";
import { products } from "../data/products";

function Home() {
  const weights = products
    .map((product) => Number.parseFloat(product.weight))
    .filter(Number.isFinite);
  const weightRange = `${Math.min(...weights)}-${Math.max(...weights)} KG`;
  const useCases = new Set(products.flatMap((product) => product.audiences)).size;

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

      <section className="home-facts" aria-label="LPG Express service facts">
        <div className="home-facts-heading">
          <span className="eyebrow"><PackageCheck size={15} aria-hidden="true" /> At a glance</span>
          <p>Choose a size that fits your kitchen and delivery needs.</p>
        </div>
        <div className="home-facts-grid">
          <div className="home-fact"><strong>{products.length}</strong><span>cylinder options</span></div>
          <div className="home-fact"><strong>{weightRange}</strong><span>available sizes</span></div>
          <div className="home-fact"><strong>{useCases}</strong><span>home & business uses</span></div>
          <div className="home-fact"><strong>Lahore</strong><span>and nearby areas</span></div>
        </div>
      </section>

      <section className="ordering-guide">
        <div className="ordering-guide-heading">
          <span className="eyebrow"><ClipboardList size={15} aria-hidden="true" /> From selection to doorstep</span>
          <h2>Order in three steps</h2>
        </div>
        <div className="ordering-steps">
          <article className="ordering-step">
            <span className="step-icon"><PackageCheck size={20} aria-hidden="true" /></span>
            <span className="step-number">01</span>
            <h3>Choose your cylinder</h3>
            <p>Compare household and commercial sizes in the catalog.</p>
          </article>
          <article className="ordering-step">
            <span className="step-icon"><MapPin size={20} aria-hidden="true" /></span>
            <span className="step-number">02</span>
            <h3>Add delivery details</h3>
            <p>Enter your address and preferred payment at checkout.</p>
          </article>
          <article className="ordering-step">
            <span className="step-icon"><Route size={20} aria-hidden="true" /></span>
            <span className="step-number">03</span>
            <h3>Keep your order close</h3>
            <p>Use your order number to revisit its saved delivery location.</p>
          </article>
        </div>
      </section>

      <section className="home-products">
        <div className="home-products-heading">
          <div>
            <span className="eyebrow"><BadgeCheck size={15} aria-hidden="true" /> Popular choices</span>
            <h2>Ready when your kitchen is</h2>
            <p>Household sizes selected for everyday cooking.</p>
          </div>
          <Link to="/products" className="secondary-button">View all cylinders <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="product-grid home-product-grid">
          {products.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;