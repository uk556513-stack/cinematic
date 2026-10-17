
import { Link } from "react-router-dom";
import {
  Watch,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  ArrowUpRight,
} from "lucide-react";
function Footer() {
  return (
    <footer
      className="fashion-footer"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="container">
        {/* Top heading */}
        <div className="footer-top">
          <div className="footer-top-brand">
            <span className="footer-eyebrow">
              <span className="footer-gold-line" />
              TIMELESS BY DESIGN
            </span>

            <h2>
              Every second tells
              <br />
              <span>a story.</span>
            </h2>
          </div>

          <Link to="/products" className="footer-explore-button">
            EXPLORE COLLECTION
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="footer-divider" />

        {/* Main footer columns */}
        <div className="footer-row">
          {/* Brand */}
          <div className="footer-about">
            <Link to="/" className="footer-brand">
              <span className="footer-gem">
                <Watch size={30} strokeWidth={1.4} />
              </span>

              <span className="footer-brand-text">
                <strong>LUXE TIME</strong>
                <small>THE ART OF TIME</small>
              </span>
            </Link>

            <p>
              Discover the art of fine watchmaking.
              Explore timeless designs, refined details
              and exceptional style made for every moment.
            </p>

            <div className="footer-highlight">
              <Watch size={17} />
              <span>Timeless Design. Lasting Impression.</span>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-column">
            <h5>EXPLORE</h5>

            <Link to="/">
              
              Home
            </Link>

            <Link to="/products">
              
              All Watches
            </Link>

            <Link to="/about">
              
              Our Story
            </Link>

            <Link to="/gallery">
              
              Gallery
            </Link>

            <Link to="/contact">
              
              Contact
            </Link>
          </div>

          {/* Collections */}
          <div className="footer-column">
            <h5>COLLECTIONS</h5>

            <Link to="/products?category=luxury">
              
              Luxury Watches
            </Link>

            <Link to="/products?category=classic">
              
              Classic Collection
            </Link>

            <Link to="/products?category=sport">
              
              Sport Watches
            </Link>

            <Link to="/products?category=minimal">
              
              Minimal Designs
            </Link>

            <Link to="/products">
              
              New Arrivals
            </Link>
          </div>

          {/* Contact */}
          <div className="footer-column footer-contact">
            <h5>GET IN TOUCH</h5>

            <a
              href="tel:+919342568375"
              className="footer-contact-item"
            >
              <span className="footer-contact-icon">
                <Phone size={17} />
              </span>
              <span>
                <small>CALL US</small>
                +91 93425 68375
              </span>
            </a>

            <a
              href="mailto:uk556513@gmail.com"
              className="footer-contact-item"
            >
              <span className="footer-contact-icon">
                <Mail size={17} />
              </span>
              <span>
                <small>EMAIL US</small>
                uk556513@gmail.com
              </span>
            </a>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <MapPin size={17} />
              </span>
              <span>
                <small>LOCATION</small>
                Puliyampatti, Pochampalli, Krishnagiri
              </span>
            </div>

            <a
              href="https://wa.me/919342568375"
              target="_blank"
              rel="noreferrer"
              className="footer-whatsapp"
            >
              <i className="bi bi-whatsapp" />
              Chat on WhatsApp
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()}{" "}
            <span>LUXE TIME</span>. All Rights Reserved.
          </p>

          <p className="footer-bottom-right">
            Crafted with
            <Heart size={14} fill="currentColor" />
            <span>for watch lovers</span>
          </p>

          <Link to="/" className="footer-back-top">
            BACK TO TOP
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
