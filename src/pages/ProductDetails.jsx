import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
} from "lucide-react";
import { products, formatPrice } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="watch-details-page">
        <div className="watch-not-found">
          <h1>Watch not found</h1>
          <p>This timepiece may no longer be available.</p>
          <Link to="/products" className="watch-primary-button">
            <ArrowLeft size={18} /> BACK TO COLLECTION
          </Link>
        </div>
      </main>
    );
  }

  const addToCart = () => {
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("watch-cart")) || [];
    } catch {
      cart = [];
    }

    const existing = cart.find((item) => item.id === product.id);

    const updated = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { ...product, quantity }];

    localStorage.setItem("watch-cart", JSON.stringify(updated));
    setAdded(true);
  };

  return (
    <main className="watch-details-page">
      <div className="watch-details-container">
        <Link to="/products" className="watch-back-link">
          <ArrowLeft size={18} /> BACK TO COLLECTION
        </Link>

        <div className="watch-details-grid">
          <div className="watch-details-image-wrap">
            <img src={product.image} alt={product.name} />
            {product.badge && (
              <span className="watch-product-badge">
                {product.badge}
              </span>
            )}
          </div>

          <div className="watch-details-info">
            <span className="watch-eyebrow">
              {product.category.toUpperCase()} COLLECTION
            </span>

            <h1>{product.name}</h1>

            <div className="watch-details-rating">
              <Star size={17} fill="currentColor" />
              <span>{product.rating} / 5</span>
              <span>Curated timepiece</span>
            </div>

            <div className="watch-details-price">
              <strong>{formatPrice(product.price)}</strong>
              <del>{formatPrice(product.oldPrice)}</del>
            </div>

            <p className="watch-details-description">
              {product.description}
            </p>

            <div className="watch-details-divider" />

            <div className="watch-details-feature">
              <ShieldCheck size={21} />
              <span>Product quality information</span>
            </div>

            <div className="watch-details-feature">
              <Truck size={21} />
              <span>Delivery details provided during checkout</span>
            </div>

            <div className="watch-details-feature">
              <RotateCcw size={21} />
              <span>Check return eligibility before ordering</span>
            </div>

            <div className="watch-quantity-row">
              <span>QUANTITY</span>

              <div className="watch-quantity-control">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="watch-details-add-button"
              onClick={addToCart}
            >
              {added ? <Check size={19} /> : <ShoppingCart size={19} />}
              {added ? "ADDED TO CART" : "ADD TO CART"}
            </button>

            {added && (
              <Link to="/cart" className="watch-details-cart-link">
                View your cart →
              </Link>
            )}

            <p className="watch-details-note">
              Product prices are displayed in Indian Rupees (INR).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}