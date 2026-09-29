import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { ArrowRight, Flame, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="page-container empty-cart">
        <span className="empty-cart-icon"><ShoppingBasket size={31} aria-hidden="true" /></span>
        <h1>Your cart is empty</h1>
        <p>Choose a cylinder and it will be waiting here.</p>
        <Link to="/products" className="primary-button">Browse cylinders <ArrowRight size={17} aria-hidden="true" /></Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow"><ShoppingBasket size={15} aria-hidden="true" /> Your selection</span>
        <h1>Your cart</h1>
        <p>Review your cylinders before checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <div className="cart-item-details">
                <span className="cart-item-icon"><Flame size={24} aria-hidden="true" /></span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.weight}</p>
                  <strong className="cart-item-price">Rs. {item.price.toLocaleString()}</strong>
                </div>
              </div>

              <div className="quantity-control">
                <button
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  <Minus size={15} aria-hidden="true" />
                </button>

                <span className="quantity-value">{item.quantity}</span>

                <button
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  <Plus size={15} aria-hidden="true" />
                </button>
              </div>

              <button
                className="remove-button"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                <Trash2 size={17} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row summary-total">
            <span>Total</span>

            <strong>
              Rs. {totalPrice.toLocaleString()}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="primary-button full-width"
          >
            Continue to checkout <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;