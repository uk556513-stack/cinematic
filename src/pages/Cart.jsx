import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";
import { formatPrice } from "../data/products";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watch-cart")) || [];
    } catch {
      return [];
    }
  });

  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("watch-cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="watch-cart-page">
        <div className="watch-cart-empty">
          <div className="watch-cart-empty-icon">
            <ShoppingBag size={44} />
          </div>

          <span className="watch-eyebrow">YOUR SHOPPING BAG</span>

          <h1>Your cart is <span>empty.</span></h1>

          <p>
            Your next favorite timepiece is waiting to be discovered.
          </p>

          <Link to="/products" className="watch-primary-button">
            EXPLORE WATCHES <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="watch-cart-page">
      <div className="watch-cart-container">
        <div className="watch-cart-heading">
          <div>
            <span className="watch-eyebrow">YOUR SELECTION</span>
            <h1>Shopping <span>Cart</span></h1>
            <p>{totalQuantity} item(s) in your bag</p>
          </div>

          <Link to="/products" className="watch-continue-shopping">
            <ArrowLeft size={17} /> CONTINUE SHOPPING
          </Link>
        </div>

        {checkoutMessage && (
          <div className="watch-checkout-message">
            {checkoutMessage}
          </div>
        )}

        <div className="watch-cart-layout">
          <section className="watch-cart-items">
            {cart.map((item) => (
              <article className="watch-cart-item" key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="watch-cart-item-info">
                  <span className="watch-product-category">
                    {item.category}
                  </span>

                  <Link
                    to={`/products/${item.id}`}
                    className="watch-cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <strong>{formatPrice(item.price)}</strong>

                  <div className="watch-quantity-control">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="watch-cart-item-end">
                  <strong>
                    {formatPrice(item.price * item.quantity)}
                  </strong>

                  <button
                    type="button"
                    className="watch-remove-item"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                    <span>Remove</span>
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="watch-cart-summary">
            <h2>Order Summary</h2>

            <div className="watch-summary-row">
              <span>Items</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="watch-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="watch-summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="watch-summary-divider" />

            <div className="watch-summary-total">
              <span>Subtotal total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="watch-summary-note">
              Final delivery charges and payment details must be confirmed
              before placing an order.
            </p>

            <button
              type="button"
              className="watch-checkout-button"
              onClick={() => {
                setCheckoutMessage(
                  "Online checkout is not connected yet. Add a backend and payment gateway to accept real orders."
                );
              }}
            >
              PROCEED TO CHECKOUT <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="watch-clear-cart"
              onClick={() => setCart([])}
            >
              CLEAR CART
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}