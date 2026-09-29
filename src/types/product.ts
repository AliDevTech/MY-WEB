export type ProductAudience = "home" | "business";

export type Product = {
  id: number;
  name: string;
  description: string;
  weight: string;
  price: number;
  audiences: ProductAudience[];
};

export type CartItem = Product & {
  quantity: number;
};