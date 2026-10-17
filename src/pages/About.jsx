import React, { useEffect } from 'react';
import { Shield, Award, Compass } from 'lucide-react';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page animate-fade-in">
      <div className="about-container animate-slide-up">

        <span className="about-badge">THE ART OF TIME</span>

        <h1 className="about-title">
          Crafted Beyond Time
        </h1>

        <p className="about-description">
          Born from a passion for timeless elegance and precision
          craftsmanship, WATCH SHOP celebrates the art of fine
          watchmaking. Every timepiece in our collection combines
          exceptional design, reliable performance, and sophisticated
          details to complement every moment of your life.
        </p>

        <div className="about-image-wrapper">
          <img
            src="/images/about-hero.jpg"
            alt="Luxury Watch Manufacturing Studio"
            className="about-hero-image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                'https://www.luxurybazaar.com/grey-market/wp-content/uploads/2024/05/topplatwatch-1024x683.jpg';
            }}
          />
        </div>

        <div className="about-grid">

          <div className="about-card">
            <Shield className="about-icon" />
            <h3 className="about-card-title">Trusted Quality</h3>
            <p className="about-card-desc">
              Carefully selected timepieces designed with durable
              materials, dependable movements, and attention to detail.
            </p>
          </div>

          <div className="about-card">
            <Award className="about-icon" />
            <h3 className="about-card-title">
              Timeless Design
            </h3>
            <p className="about-card-desc">
              Discover elegant and contemporary watch designs
              created to complement every style and occasion.
            </p>
          </div>

          <div className="about-card">
            <Compass className="about-icon" />
            <h3 className="about-card-title">
              Precision Craftsmanship
            </h3>
            <p className="about-card-desc">
              Explore thoughtfully crafted timepieces that bring
              together precision, comfort, and everyday sophistication.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}