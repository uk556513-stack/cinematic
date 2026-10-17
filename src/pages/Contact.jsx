import React, { useEffect, useState } from 'react';
import { Send, Mail, MapPin, Phone, Navigation } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const showroomLocation = 'Puliyampatti, Pochampalli, Krishnagiri';

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroomLocation)}`;

  return (
    <div className="contact-page">
      <div className="contact-container">

        <span className="contact-badge">GET IN TOUCH</span>

        <h1 className="contact-title">
          Visit Our Watch Boutique
        </h1>

        <p className="contact-description">
          Discover timeless elegance and premium craftsmanship.
          Contact our team for product enquiries, watch collections,
          orders, and personalised assistance.
        </p>

        <div className="contact-content-grid">

          <div className="contact-info-col">

            <div className="contact-showroom-image-wrapper">
              <img
                src="/images/showroom.jpg"
                alt="Luxury Watch Showroom"
                className="contact-showroom-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://estatesalesvegas.com/wp-content/uploads/2023/12/Luxury-watch-collections.jpg';
                }}
              />
            </div>

            <div className="contact-info-item">
              <MapPin className="contact-icon" />

              <div>
                <h4 className="contact-info-title">Our Location</h4>
                <p className="contact-info-text">
                  Puliyampatti, Pochampalli, Krishnagiri
                </p>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map-link"
                >
                  <Navigation size={15} />
                  Get Directions
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <Mail className="contact-icon" />

              <div>
                <h4 className="contact-info-title">Email Support</h4>
                <a
                  href="mailto:support@watchshop.com"
                  className="contact-info-text"
                >
                  uk556513@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <Phone className="contact-icon" />

              <div>
                <h4 className="contact-info-title">Contact Us</h4>
                <a
                  href="tel:+919342568375"
                  className="contact-info-text"
                >
                  +91 93425 68375
                </a>
              </div>
            </div>

            <div className="contact-map-wrapper">
              <iframe
                title="Watch Shop Location Map"
                src="https://maps.google.com/maps?q=Puliyampatti%2C%20Pochampalli%2C%20Krishnagiri&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-button"
              >
                <MapPin size={17} />
                Open Google Maps
              </a>
            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-form-col"
          >
            {submitted ? (
              <div className="contact-success-message">
                <h3>Message Received!</h3>
                <p>
                  Thank you for contacting Watch Shop.
                  Our team will get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <h2 className="contact-form-title">
                  Send Us a Message
                </h2>

                <p className="contact-form-description">
                  Have questions about a watch or your order?
                  Fill out the form below.
                </p>

                <div className="contact-input-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    autoComplete="name"
                    required
                    className="contact-input"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    aria-label="Email Address"
                    autoComplete="email"
                    required
                    className="contact-input"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  autoComplete="tel"
                  className="contact-input-full"
                />

                <select
                  aria-label="Enquiry Type"
                  className="contact-input-full"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select Enquiry Type
                  </option>
                  <option value="product">Product Enquiry</option>
                  <option value="order">Order Support</option>
                  <option value="delivery">Shipping & Delivery</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  placeholder="Your Message"
                  aria-label="Your Message"
                  rows="5"
                  required
                  className="contact-textarea"
                />

                <button
                  type="submit"
                  className="contact-submit-button"
                >
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}