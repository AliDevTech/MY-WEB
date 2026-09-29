import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Flame, House, MapPin, Package, ShoppingBasket } from "lucide-react";
import { useCart } from "../context/cartContext";
import { products } from "../data/products";

function Navbar() {
  const { totalItems } = useCart();
  const weightValues = products.map((product) => Number.parseFloat(product.weight));
  const weightRange = `${Math.min(...weightValues)}-${Math.max(...weightValues)} KG`;

  return (
    <header className="site-header">
      <div className="service-bar">
        <a
          className="service-bar-location"
          href="https://www.google.com/maps/search/?api=1&query=Lahore%2C+Pakistan"
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={14} aria-hidden="true" />
          <span>Delivery in Lahore & nearby</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        <span className="service-bar-catalog">
          <Package size={14} aria-hidden="true" />
          {products.length} cylinder options · {weightRange}
        </span>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo">
          <span className="logo-mark"><Flame size={20} aria-hidden="true" /></span>
          <span className="brand-copy">
            <span>LPG Express</span>
            <small>Home & commercial delivery</small>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            <House size={17} aria-hidden="true" /><span>Home</span>
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link nav-order${isActive ? " active" : ""}`}>
            <Package size={17} aria-hidden="true" /><span>Order LPG</span>
          </NavLink>
          <NavLink to="/track-order" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            <MapPin size={17} aria-hidden="true" /><span>Track</span>
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `nav-link cart-link${isActive ? " active" : ""}`}>
            <ShoppingBasket size={17} aria-hidden="true" /><span>Cart</span>
            <span className="cart-count" aria-label={`${totalItems} items`}>{totalItems > 99 ? "99+" : totalItems}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;