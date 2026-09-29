import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Circle, PackageCheck, Search, Truck } from "lucide-react";

function OrderTracking() {
  const [searchParams] = useSearchParams();

  const initialOrder =
    searchParams.get("order") ?? "";

  const [orderId, setOrderId] =
    useState(initialOrder);

  const [searchedOrder, setSearchedOrder] =
    useState(initialOrder);

  const handleTrack = () => {
    setSearchedOrder(orderId);
  };

  return (
    <main className="page-container">
      <div className="tracking-box">
        <span className="eyebrow"><Truck size={15} aria-hidden="true" /> Delivery updates</span>
        <h1>Track your order</h1>
        <p>Enter your LPG order number to see its latest status.</p>

        <div className="tracking-form">
          <input
            value={orderId}
            placeholder="Example: LPG123456"
            onChange={(event) =>
              setOrderId(event.target.value)
            }
          />

          <button
            className="primary-button"
            onClick={handleTrack}
          >
            <Search size={16} aria-hidden="true" /> Track order
          </button>
        </div>

        {searchedOrder && (
          <div className="tracking-result">
            <h3>
              Order #{searchedOrder}
            </h3>

            <div className="status active">
              <Check size={17} aria-hidden="true" /> Order received
            </div>

            <div className="status">
              <Circle size={17} aria-hidden="true" /> Preparing cylinder
            </div>

            <div className="status">
              <Truck size={17} aria-hidden="true" /> Out for delivery
            </div>

            <div className="status">
              <PackageCheck size={17} aria-hidden="true" /> Delivered
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default OrderTracking;