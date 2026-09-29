import { Link, NavLink } from "react-router-dom";
import { Flame, House, MapPin, Package, ShoppingBasket } from "lucide-react";
import { useCart } from "../context/cartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark"><Flame size={20} aria-hidden="true" /></span>
        LPG Express
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          <House size={17} aria-hidden="true" /><span>Home</span>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          <Package size={17} aria-hidden="true" /><span>Order LPG</span>
        </NavLink>
        <NavLink to="/track-order" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          <MapPin size={17} aria-hidden="true" /><span>Track</span>
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => `nav-link cart-link${isActive ? " active" : ""}`}>
          <ShoppingBasket size={17} aria-hidden="true" /><span>Cart</span>
          <span className="cart-count" aria-label={`${totalItems} items`}>{totalItems}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;