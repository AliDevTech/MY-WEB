import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Domestic LPG Cylinder",
    description: "Suitable for normal household cooking.",
    weight: "11.8 KG",
    price: 3200,
    audiences: ["home"],
  },
  {
    id: 2,
    name: "Medium LPG Cylinder",
    description: "Suitable for larger households and small businesses.",
    weight: "15 KG",
    price: 4100,
    audiences: ["home", "business"],
  },
  {
    id: 3,
    name: "Commercial LPG Cylinder",
    description: "Suitable for restaurants and commercial kitchens.",
    weight: "45.4 KG",
    price: 12500,
    audiences: ["business"],
  },
];