
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Watch,
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Watches", path: "/products" },
    { name: "Our Story", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchText.trim();

    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/products");
    }

    setSearchOpen(false);
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="luxe-header">
      {/* Announcement bar */}
      <div className="luxe-announcement">
        <p>
          <span className="announcement-line" />
          TIMELESS DESIGN · EXCEPTIONAL CRAFTSMANSHIP
          <span className="announcement-line" />
        </p>
      </div>

      {/* Main navbar */}
      <nav className="luxe-navbar">
        <div className="luxe-navbar-container">
          {/* Brand */}
          <Link
            to="/"
            className="luxe-brand"
            onClick={closeMenu}
            aria-label="Luxe Time home"
          >
            <span className="luxe-brand-icon">
              <Watch size={32} strokeWidth={1.4} />
            </span>

            <span className="luxe-brand-content">
              <strong>LUXE TIME</strong>
              <small>THE ART OF TIME</small>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="luxe-desktop-links">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `luxe-nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="luxe-navbar-actions">
            <button
              type="button"
              className={`luxe-action-icon ${
                searchOpen ? "active" : ""
              }`}
              aria-label="Toggle search"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <Link
              to="/login"
              className="luxe-account-link"
              aria-label="My account"
            >
              <UserRound size={19} />
              <span>ACCOUNT</span>
            </Link>

            <Link
              to="/cart"
              className="luxe-bag-link"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} />
              <span>BAG</span>
              <span className="luxe-bag-count">0</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="luxe-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen(!menuOpen);
                setSearchOpen(false);
              }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search panel */}
      {searchOpen && (
        <div className="luxe-search-panel">
          <form onSubmit={handleSearch} className="luxe-search-form">
            <Search size={21} />

            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search luxury watches..."
              aria-label="Search watches"
              autoFocus
            />

            <button type="submit">
              SEARCH <ArrowRight size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile navigation */}
      <div
        className={`luxe-mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="luxe-mobile-links">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `luxe-mobile-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.name}
              <ArrowRight size={17} />
            </NavLink>
          ))}

          <Link
            to="/login"
            className="luxe-mobile-account"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            <UserRound size={18} />
            MY ACCOUNT
          </Link>

          <Link
            to="/cart"
            className="luxe-mobile-account"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            <ShoppingBag size={18} />
            MY BAG
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
