import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  ArrowUpRight,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { products, formatPrice } from "../data/products";

export default function Products() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watch-cart")) || [];
    } catch {
      return [];
    }
  });

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    const updated = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updated);
    localStorage.setItem("watch-cart", JSON.stringify(updated));
  };

  return (
    <main className="watch-products-page">
      <section className="watch-products-hero">
        <div className="watch-products-hero-content">
          <span className="watch-eyebrow">THE TIMEPIECE COLLECTION</span>

          <h1>
            Find Your <span>Perfect Watch.</span>
          </h1>

          <p>
            Discover timeless designs made to complement
            every moment of your life.
          </p>

          <a href="#watch-catalog" className="watch-primary-button">
            EXPLORE COLLECTION
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="watch-catalog section-container" id="watch-catalog">
        <div className="watch-catalog-heading">
          <div>
            <span className="watch-eyebrow">CURATED FOR YOU</span>
            <h2>Our <span>Collection</span></h2>
          </div>

          <p>{filteredProducts.length} timepieces available</p>
        </div>

        <div className="watch-product-toolbar">
          <div className="watch-product-search">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search watches..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="watch-filter-control">
            <SlidersHorizontal size={18} />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <select
            className="watch-sort-select"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="watch-product-grid">
          {filteredProducts.map((product, index) => (
            <article
              className="watch-product-card"
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 80}
            >
              <Link
                to={`/products/${product.id}`}
                className="watch-product-image-link"
              >
                <div className="watch-product-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="watch-product-image"
                    loading="lazy"
                  />

                  {product.badge && (
                    <span className="watch-product-badge">
                      {product.badge}
                    </span>
                  )}

                  <span className="watch-product-view">
                    VIEW DETAILS <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>

              <div className="watch-product-info">
                <span className="watch-product-category">
                  {product.category}
                </span>

                <Link
                  to={`/products/${product.id}`}
                  className="watch-product-name"
                >
                  {product.name}
                </Link>

                <div className="watch-product-rating">
                  <Star size={15} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>

                <div className="watch-product-price-row">
                  <div>
                    <strong>{formatPrice(product.price)}</strong>
                    <del>{formatPrice(product.oldPrice)}</del>
                  </div>

                  <button
                    type="button"
                    className="watch-add-cart-button"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart size={19} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="watch-empty-products">
            <Search size={35} />
            <h3>No watches found</h3>
            <p>Try another search term or category.</p>

            <button
              type="button"
              className="watch-primary-button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

        <div className="watch-cart-shortcut">
          <ShoppingCart size={20} />
          <span>
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart
          </span>
          <Link to="/cart">VIEW CART <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}