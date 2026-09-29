import { useState } from "react";
import ProductCard from "../component/productcard";
import { products } from "../data/products";
import { BriefcaseBusiness, House, PackageCheck, PackageSearch, Search } from "lucide-react";

function Products() {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState<"all" | "home" | "business">("all");
  const [sort, setSort] = useState<"recommended" | "low-to-high" | "high-to-low">("recommended");

  const matchingProducts = products.filter((product) => {
    const matchesQuery = `${product.name} ${product.description} ${product.weight}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesAudience = audience === "all" || product.audiences.includes(audience);

    return matchesQuery && matchesAudience;
  });

  if (sort === "low-to-high") {
    matchingProducts.sort((first, second) => first.price - second.price);
  } else if (sort === "high-to-low") {
    matchingProducts.sort((first, second) => second.price - first.price);
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow"><PackageCheck size={15} aria-hidden="true" /> LPG cylinders</span>
        <h1>Choose your cylinder</h1>
        <p>Find the right size for your home or business.</p>
      </div>

      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cylinders"
            aria-label="Search cylinders"
          />
        </label>

        <div className="catalog-filters" role="group" aria-label="Filter by use">
          <button type="button" className={audience === "all" ? "selected" : ""} aria-pressed={audience === "all"} onClick={() => setAudience("all")}>
            All
          </button>
          <button type="button" className={audience === "home" ? "selected" : ""} aria-pressed={audience === "home"} onClick={() => setAudience("home")}>
            <House size={15} aria-hidden="true" /> Home
          </button>
          <button type="button" className={audience === "business" ? "selected" : ""} aria-pressed={audience === "business"} onClick={() => setAudience("business")}>
            <BriefcaseBusiness size={15} aria-hidden="true" /> Business
          </button>
        </div>

        <label className="catalog-sort">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="Sort products">
            <option value="recommended">Recommended</option>
            <option value="low-to-high">Price: low to high</option>
            <option value="high-to-low">Price: high to low</option>
          </select>
        </label>
      </div>

      <p className="catalog-count" aria-live="polite">
        {matchingProducts.length} {matchingProducts.length === 1 ? "cylinder" : "cylinders"}
      </p>

      {matchingProducts.length > 0 ? (
        <div className="product-grid">
          {matchingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <PackageSearch size={29} aria-hidden="true" />
          <h2>No cylinders match that search</h2>
          <p>Try a different name, weight, or use.</p>
          <button className="secondary-button" onClick={() => { setQuery(""); setAudience("all"); setSort("recommended"); }}>
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}

export default Products;