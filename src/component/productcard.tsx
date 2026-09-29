import type { Product } from "../types/product";
import { useCart } from "../context/cartContext";
import { Flame, Plus } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-card-art" aria-hidden="true">
        <Flame />
      </div>
      <span className="product-weight">{product.weight} cylinder</span>
      <span className="product-audience">
        {product.audiences.length > 1 ? "Home + business" : product.audiences[0] === "home" ? "Household" : "Business"}
      </span>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className="product-card-bottom">
        <span className="product-price">Rs. {product.price.toLocaleString()}</span>
        <button className="primary-button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>
          <Plus size={17} aria-hidden="true" /> Add
        </button>
      </div>
    </div>
  );
}

export default ProductCard;