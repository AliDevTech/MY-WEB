export type Product = {
  id: number;
  name: string;
  description: string;
  weight: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
};