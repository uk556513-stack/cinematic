import React, { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  {
    url: "https://tse2.mm.bing.net/th/id/OIP.ufT-jTiiAIelB2ffmHYdmQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Luxury Watch Collection",
  },
  {
    url: "https://thewatcherhq.com/wp-content/uploads/2026/03/watch-10-10-display-position.png",
    title: "Precision Dial Details",
  },
  {
    url: "https://tse1.mm.bing.net/th/id/OIP.cRRhKBHAIpXTyRfF16q60QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Premium Gold Timepiece",
  },
  {
    url: "https://files.idyllic.app/files/static/4090536",
    title: "Elegant Watch Design",
  },
  {
    url: "https://tse1.mm.bing.net/th/id/OIP.WagUJzfoNYWGdnJwlNFSkAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Mechanical Craftsmanship",
  },
  {
    url: "https://files.idyllic.app/files/static/1902796",
    title: "Timeless Wristwear",
  },
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <main className="apex-gallery-page">
      <div className="apex-gallery-container">
        <span className="apex-gallery-badge">
          THE ART OF TIME
        </span>

        <h1 className="apex-gallery-title">
          WATCH <span>Gallery</span>
        </h1>

        <p className="apex-gallery-description">
          Explore the beauty of luxury timepieces, intricate dial
          designs, premium materials, and timeless craftsmanship.
          Discover watches designed to make every moment special.
        </p>

        <div className="apex-gallery-grid">
          {galleryImages.map((img) => (
            <button
              type="button"
              key={img.title}
              className="apex-gallery-card"
              onClick={() => setActiveImage(img)}
              aria-label={`View ${img.title}`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="apex-gallery-image"
                loading="lazy"
              />

              <span className="apex-gallery-overlay">
                <ZoomIn
                  className="apex-gallery-zoom-icon"
                  aria-hidden="true"
                />

                <span className="apex-gallery-image-title">
                  {img.title}
                </span>

                <span className="apex-gallery-view-label">
                  VIEW IMAGE
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="apex-gallery-modal-backdrop"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="apex-gallery-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="apex-gallery-close-btn"
              onClick={() => setActiveImage(null)}
              aria-label="Close image"
            >
              <X size={24} />
            </button>

            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="apex-gallery-modal-image"
            />

            <h3 className="apex-gallery-modal-title">
              {activeImage.title}
            </h3>
          </div>
        </div>
      )}
    </main>
  );
}