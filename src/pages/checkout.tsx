import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { ArrowRight, LockKeyhole, MapPin, PackageCheck, ShoppingBasket } from "lucide-react";
import { saveTrackedOrder } from "../data/orders";

type CheckoutForm = {
  name: string;
  phone: string;
  city: string;
  area: string;
  address: string;
  emptyCylinderExchange: boolean;
  paymentMethod: string;
};

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    city: "Lahore",
    area: "",
    address: "",
    emptyCylinderExchange: true,
    paymentMethod: "cod",
  });

  if (cart.length === 0) {
    return (
      <main className="page-container empty-cart">
        <span className="empty-cart-icon"><ShoppingBasket size={31} aria-hidden="true" /></span>
        <h1>Nothing to check out</h1>
        <p>Add a cylinder to your cart before placing an order.</p>
        <Link to="/products" className="primary-button">Browse cylinders <ArrowRight size={17} aria-hidden="true" /></Link>
      </main>
    );
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    const orderId = `LPG${Date.now()
      .toString()
      .slice(-6)}`;

    const deliveryAddress = [form.address, form.area, form.city]
      .filter(Boolean)
      .join(", ");

    saveTrackedOrder({
      orderId,
      deliveryAddress,
      createdAt: new Date().toISOString(),
      cart,
      totalPrice,
    });

    clearCart();

    navigate(
      `/track-order?order=${orderId}`,
    );
  };

  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow"><LockKeyhole size={15} aria-hidden="true" /> Secure checkout</span>
        <h1>Delivery details</h1>
        <p>Tell us where to bring your order.</p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <div className="checkout-form-heading">
            <span><MapPin size={20} aria-hidden="true" /></span>
            <h2>Delivery address</h2>
          </div>
          <label>
            Full Name

            <input
              type="text"
              required
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
            />
          </label>

          <label>
            Phone Number

            <input
              type="tel"
              placeholder="03XXXXXXXXX"
              required
              value={form.phone}
              onChange={(event) =>
                setForm({
                  ...form,
                  phone: event.target.value,
                })
              }
            />
          </label>

          <label>
            City

            <input
              type="text"
              required
              value={form.city}
              onChange={(event) =>
                setForm({
                  ...form,
                  city: event.target.value,
                })
              }
            />
          </label>

          <label>
            Area

            <input
              type="text"
              placeholder="Johar Town"
              required
              value={form.area}
              onChange={(event) =>
                setForm({
                  ...form,
                  area: event.target.value,
                })
              }
            />
          </label>

          <label>
            Complete Address

            <textarea
              required
              rows={4}
              value={form.address}
              onChange={(event) =>
                setForm({
                  ...form,
                  address: event.target.value,
                })
              }
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={
                form.emptyCylinderExchange
              }
              onChange={(event) =>
                setForm({
                  ...form,
                  emptyCylinderExchange:
                    event.target.checked,
                })
              }
            />

            I have an empty cylinder for exchange
          </label>

          <label>
            Payment Method

            <select
              value={form.paymentMethod}
              onChange={(event) =>
                setForm({
                  ...form,
                  paymentMethod:
                    event.target.value,
                })
              }
            >
              <option value="cod">
                Cash on Delivery
              </option>

              <option value="easypaisa">
                Easypaisa
              </option>

              <option value="jazzcash">
                JazzCash
              </option>

              <option value="bank">
                Bank Transfer
              </option>
            </select>
          </label>

          <button
            type="submit"
            className="primary-button"
          >
            Place order <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Your order</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="summary-row"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                Rs.{" "}
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </span>
            </div>
          ))}

          <hr />

          <div className="summary-row summary-total">
            <strong>Total</strong>

            <strong>
              Rs. {totalPrice.toLocaleString()}
            </strong>
          </div>
          <p className="secure-note"><PackageCheck size={16} aria-hidden="true" /> Your cylinder is checked before dispatch.</p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;