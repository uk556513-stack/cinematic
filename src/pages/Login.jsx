import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Frontend demo only; this does not authenticate a real account.
    setError(
      "Login is not connected to a backend yet. Connect authentication to sign in securely."
    );
  };

  return (
    <main className="watch-auth-page">
      <div className="watch-auth-decoration watch-auth-decoration-one" />
      <div className="watch-auth-decoration watch-auth-decoration-two" />

      <section className="watch-auth-card">
        <Link to="/" className="watch-auth-brand">
          <Clock size={31} />
          <span>WATCH <b>SHOP</b></span>
        </Link>

        <span className="watch-eyebrow">WELCOME BACK</span>

        <h1>Sign in to <span>your world.</span></h1>

        <p className="watch-auth-description">
          Continue discovering timepieces that define your style.
        </p>

        <form className="watch-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>

          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>

          <div className="watch-password-wrap">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

          {error && (
            <p className="watch-auth-message" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="watch-auth-submit">
            SIGN IN <ArrowRight size={18} />
          </button>
        </form>

        <p className="watch-auth-switch">
          Don't have an account? <Link to="/signup">Create account</Link>
        </p>

        <Link to="/" className="watch-auth-home-link">
          Return to homepage
        </Link>
      </section>
    </main>
  );
}