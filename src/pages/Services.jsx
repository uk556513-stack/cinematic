import React, { useEffect } from "react";
import {
  Zap,
  Wrench,
  Headphones,
  Key,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Key,
    number: "01",
    title: "Personalized Watch Selection",
    desc: "Discover timepieces that match your personal style, preferences, and special occasions.",
    tag: "PERSONALIZATION",
  },
  {
    icon: Zap,
    number: "02",
    title: "Premium Collections",
    desc: "Explore elegant everyday watches, statement timepieces, and sophisticated designs for every occasion.",
    tag: "COLLECTIONS",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Watch Care & Maintenance",
    desc: "Keep your timepiece looking its best with proper care guidance and professional servicing recommendations.",
    tag: "MAINTENANCE",
  },
  {
    icon: Headphones,
    number: "04",
    title: "Customer Support",
    desc: "Get assistance with product enquiries, order updates, delivery information, and after-sales questions.",
    tag: "CUSTOMER CARE",
  },
];

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="apex-services-page">
      <div className="apex-services-container">
        {/* Page Heading */}
        <header className="apex-services-heading">
          <span className="apex-services-badge">
            WATCH SHOP SERVICES
          </span>

          <h1 className="apex-services-title">
            The WATCH <span>Experience</span>
          </h1>

          <p className="apex-services-description">
            Discover exceptional service, carefully selected
            timepieces, and personalized assistance designed
            to make every shopping experience special.
          </p>
        </header>

        {/* Feature Banner */}
        <section className="apex-service-banner">
          <div className="apex-service-banner-text">
            <span className="apex-service-eyebrow">
              MORE THAN A WATCH
            </span>

            <h2>
              Exceptional Service
              <span> Every Time</span>
            </h2>

            <p>
              From choosing your perfect timepiece to receiving
              help with an order, our customer support experience
              is designed around your needs and preferences.
            </p>

            <div className="apex-service-promise">
              <ShieldCheck size={21} />

              <span>
                Quality selection. Personal attention.
              </span>
            </div>

            <a
              href="mailto:support@watchshop.com?subject=Watch%20Shop%20Service%20Enquiry"
              className="apex-service-contact-link"
            >
              CONTACT OUR TEAM
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="apex-service-banner-image-wrap">
            <img
              src="/images/service-1.jpg"
              alt="Luxury watch service and craftsmanship"
              className="apex-service-banner-image"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85";
              }}
            />

            <div className="apex-service-image-overlay" />

            <span className="apex-service-image-caption">
              TIMELESS CRAFTSMANSHIP
            </span>
          </div>
        </section>

        {/* Services Grid */}
        <section className="apex-service-list">
          <div className="apex-service-list-heading">
            <div>
              <span className="apex-services-badge">
                EXCLUSIVE BENEFITS
              </span>

              <h2>
                Every Detail.
                <span> Every Moment.</span>
              </h2>
            </div>

            <p>
              Thoughtful assistance for finding, choosing,
              and caring for your favorite timepiece.
            </p>
          </div>

          <div className="apex-services-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  className="apex-service-card"
                  key={service.number}
                >
                  <div className="apex-service-card-top">
                    <span className="apex-service-number">
                      {service.number}
                    </span>

                    <ArrowUpRight
                      className="apex-service-arrow"
                      size={21}
                    />
                  </div>

                  <div className="apex-service-icon-box">
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <span className="apex-service-tag">
                    {service.tag}
                  </span>

                  <h3>{service.title}</h3>

                  <p>{service.desc}</p>

                  <div className="apex-service-card-line" />
                </article>
              );
            })}
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="apex-service-cta">
          <div className="apex-service-cta-content">
            <span>
              YOUR NEXT FAVORITE WATCH STARTS HERE
            </span>

            <h2>
              Need a helping <span>hand?</span>
            </h2>

            <p>
              Our support team is ready to help with your
              watch selection, order questions, and other enquiries.
            </p>
          </div>

          <a
            href="mailto:support@watchshop.com?subject=Watch%20Shop%20Support"
            className="apex-service-cta-button"
          >
            GET IN TOUCH
            <ArrowUpRight size={18} />
          </a>
        </section>
      </div>
    </main>
  );
}