import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage(
      "Your form is valid, but account creation requires a connected backend."
    );
  };

  return (
    <main className="watch-auth-page">
      <div className="watch-auth-decoration watch-auth-decoration-one" />
      <div className="watch-auth-decoration watch-auth-decoration-two" />

      <section className="watch-auth-card watch-signup-card">
        <Link to="/" className="watch-auth-brand">
          <Clock size={31} />
          <span>WATCH <b>SHOP</b></span>
        </Link>

        <span className="watch-eyebrow">JOIN OUR COMMUNITY</span>

        <h1>Create your <span>account.</span></h1>

        <p className="watch-auth-description">
          Join us and discover your next favorite timepiece.
        </p>

        <form className="watch-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Full name</label>

          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-email">Email address</label>

          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-password">Password</label>

          <div className="watch-password-wrap">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <label htmlFor="signup-confirm">Confirm password</label>

          <input
            id="signup-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {message && (
            <p className="watch-auth-message" role="alert">
              {message}
            </p>
          )}

          <button type="submit" className="watch-auth-submit">
            CREATE ACCOUNT <ArrowRight size={18} />
          </button>
        </form>

        <p className="watch-auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <Link to="/" className="watch-auth-home-link">
          Return to homepage
        </Link>
      </section>
    </main>
  );
}