import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./component/navbar";
import Footer from "./component/footer";

import Home from "./pages/home";
import Products from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderTracking from "./pages/ordertracking";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/track-order"
            element={<OrderTracking />}
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;