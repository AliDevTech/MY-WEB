import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Check, Circle, LocateFixed, LoaderCircle, MapPinned, PackageCheck, Search, Truck } from "lucide-react";
import { findTrackedOrder, type TrackedOrder } from "../data/orders";

type Coordinates = {
  latitude: number;
  longitude: number;
};

function OrderTracking() {
  const [searchParams] = useSearchParams();

  const initialOrder =
    searchParams.get("order") ?? "";

  const [orderId, setOrderId] =
    useState(initialOrder);

  const [searchedOrder, setSearchedOrder] =
    useState(initialOrder);

  const [trackedOrder, setTrackedOrder] =
    useState<TrackedOrder | null>(() => findTrackedOrder(initialOrder));

  const [hasSearched, setHasSearched] = useState(false);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleTrack = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedOrderId = orderId.trim().toUpperCase();
    setOrderId(normalizedOrderId);
    setSearchedOrder(normalizedOrderId);
    setTrackedOrder(findTrackedOrder(normalizedOrderId));
    setHasSearched(true);
    setLocation(null);
    setLocationError("");
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location is not available in this browser.");
      return;
    }

    setIsLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        setLocationError("We couldn't access your location. Check browser permissions and try again.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const destination = trackedOrder?.deliveryAddress ?? "";
  const mapQuery = new URLSearchParams({ q: destination, output: "embed" }).toString();
  const directionsQuery = new URLSearchParams({
    api: "1",
    destination,
    travelmode: "driving",
    ...(location ? { origin: `${location.latitude},${location.longitude}` } : {}),
  }).toString();

  return (
    <main className="page-container">
      <div className="tracking-box">
        <span className="eyebrow"><Truck size={15} aria-hidden="true" /> Delivery updates</span>
        <h1>Track your order</h1>
        <p>Enter your LPG order number to see its latest status.</p>

        <form className="tracking-form" onSubmit={handleTrack}>
          <input
            aria-label="Order number"
            autoComplete="off"
            value={orderId}
            placeholder="Example: LPG123456"
            onChange={(event) =>
              setOrderId(event.target.value)
            }
          />

          <button className="primary-button" type="submit">
            <Search size={16} aria-hidden="true" /> Track order
          </button>
        </form>

        {searchedOrder && trackedOrder && (
          <div className="tracking-result">
            <h3>
              Order #{searchedOrder}
            </h3>
            <p className="tracking-created">
              Placed {new Date(trackedOrder.createdAt).toLocaleString()}
            </p>

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

            <section className="tracking-location" aria-labelledby="delivery-location-title">
              <div className="tracking-location-heading">
                <span className="tracking-location-icon"><MapPinned size={19} aria-hidden="true" /></span>
                <div>
                  <h4 id="delivery-location-title">Delivery location</h4>
                  <p>{destination}</p>
                </div>
              </div>

              <iframe
                className="tracking-map"
                title={`Google Maps delivery destination for order ${searchedOrder}`}
                src={`https://maps.google.com/maps?${mapQuery}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="location-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={handleUseLocation}
                  disabled={isLocating}
                >
                  {isLocating ? <LoaderCircle size={16} aria-hidden="true" /> : <LocateFixed size={16} aria-hidden="true" />}
                  {isLocating ? "Finding location" : location ? "Refresh my location" : "Use my location"}
                </button>
                <a
                  className="primary-button"
                  href={`https://www.google.com/maps/dir/?${directionsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open directions <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              {location && <p className="location-feedback">Your location is ready and will be used as the route origin.</p>}
              {locationError && <p className="location-error" role="status">{locationError}</p>}
              <p className="location-disclaimer">Directions open in Google Maps. Live driver location is not available yet.</p>
            </section>
          </div>
        )}

        {hasSearched && !trackedOrder && (
          <div className="tracking-not-found" role="status">
            <Search size={18} aria-hidden="true" />
            <p>No matching order was found on this device. Check the number or use the device where the order was placed.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default OrderTracking;