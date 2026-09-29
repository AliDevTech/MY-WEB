import type { CartItem } from "../types/product";

const STORAGE_KEY = "lpg-express-orders";

export type TrackedOrder = {
  orderId: string;
  deliveryAddress: string;
  createdAt: string;
  cart: CartItem[];
  totalPrice: number;
};

export function saveTrackedOrder(order: TrackedOrder) {
  try {
    const orders = readOrders();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...orders.filter((savedOrder) => savedOrder.orderId !== order.orderId), order]),
    );
  } catch {
    return;
  }
}

export function findTrackedOrder(orderId: string): TrackedOrder | null {
  return readOrders().find((order) => order.orderId === orderId) ?? null;
}

function readOrders(): TrackedOrder[] {
  try {
    const storedOrders: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(storedOrders) ? storedOrders as TrackedOrder[] : [];
  } catch {
    return [];
  }
}