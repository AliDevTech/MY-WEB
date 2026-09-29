import ProductCard from "../component/productcard";
import { products } from "../data/products";
import { PackageCheck } from "lucide-react";

function Products() {
  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow"><PackageCheck size={15} aria-hidden="true" /> LPG cylinders</span>
        <h1>Choose your cylinder</h1>
        <p>Find the right size for your home or business.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}

export default Products;