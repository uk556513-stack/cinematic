
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Gauge,
  BatteryCharging,
  ArrowRight,
  Check,
} from "lucide-react";

const TOTAL_FRAMES = 240;

const galleryImages = [
  {
    url: "https://images.stockcake.com/public/d/f/6/df69855c-5f40-4f02-a36e-27cfb2398ea9/luxury-watch-collection-stockcake.jpg",
    title: "Luxury Watch Collection",
    alt: "Premium luxury wristwatch",
  },
  {
    url: "https://images.stockcake.com/public/8/4/e/84e9e731-e6b1-4228-a5ac-1d9eeb71f7ab/precision-in-motion-stockcake.jpg",
    title: "Precision Dial",
    alt: "Elegant watch dial and craftsmanship",
  },
  {
    url: "https://www.machines.com.my/cdn/shop/products/Apple_Watch_Series_9_LTE_41mm_Silver_Stainless_Steel_Silver_Milanese_Loop_PDP_Image_Position-1__GBEN_1024x1024.jpg?v=1705477018",
    title: "Timeless Edition",
    alt: "Classic luxury timepiece",
  },
];

const watchFinishes = [
  { name: "Midnight Black", color: "#202020" },
  { name: "Royal Gold", color: "#c9a45c" },
  { name: "Silver Steel", color: "#bfc5ce" },
  { name: "Ocean Blue", color: "#245cff" },
];

export default function Home() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const renderRef = useRef(null);
  const spacerRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Midnight Black");

  // 1. Load all 240 images from public/frames/.
  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;
    let settledCount = 0;
    let successCount = 0;

    const frames = new Array(TOTAL_FRAMES);
    imagesRef.current = frames;

    setImagesLoaded(false);
    setLoadingProgress(0);

    const settle = (success, frameNumber) => {
      if (cancelled) return;

      settledCount += 1;

      if (success) {
        successCount += 1;
      } else {
        console.error(
          `Could not load frame ${frameNumber}: /frames/ezgif-frame-${frameNumber}.jpg`
        );
      }

      setLoadingProgress(
        Math.round((settledCount / TOTAL_FRAMES) * 100)
      );

      if (settledCount === TOTAL_FRAMES) {
        console.info(
          `Watch frames loaded successfully: ${successCount}/${TOTAL_FRAMES}`
        );

        if (successCount !== TOTAL_FRAMES) {
          console.error(
            "Some frames failed to load. Check the missing filenames above."
          );
        }

        const firstValidIndex = frames.findIndex(
          (image) => image?.complete && image.naturalWidth > 0
        );

        if (firstValidIndex !== -1) {
          frameIndexRef.current = firstValidIndex;
          setCurrentFrameIndex(firstValidIndex);
        }

        setImagesLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i += 1) {
      const frameNumber = String(i).padStart(3, "0");
      const image = new Image();

      frames[i - 1] = image;

      image.onload = () => settle(true, frameNumber);
      image.onerror = () => settle(false, frameNumber);

      image.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Draw the current frame on canvas.
  useEffect(() => {
    if (!imagesLoaded) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let rafId = 0;

    const renderFrame = (index) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      const targetWidth = Math.round(width * ratio);
      const targetHeight = Math.round(height * ratio);

      if (
        canvas.width !== targetWidth ||
        canvas.height !== targetHeight
      ) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const frames = imagesRef.current;
      let image = frames[index];

      // Fall back to the nearest valid image if a frame is missing.
      if (!image?.complete || image.naturalWidth === 0) {
        image = null;

        for (let distance = 1; distance < TOTAL_FRAMES; distance += 1) {
          const before = frames[index - distance];
          const after = frames[index + distance];

          if (before?.complete && before.naturalWidth > 0) {
            image = before;
            break;
          }

          if (after?.complete && after.naturalWidth > 0) {
            image = after;
            break;
          }
        }
      }

      if (!image?.complete || image.naturalWidth === 0) return;

      // Contain the whole image within the viewport.
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight
      );

      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      ctx.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    };

    const requestRender = () => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        renderFrame(frameIndexRef.current);
      });
    };

    renderRef.current = requestRender;
    requestRender();

    window.addEventListener("resize", requestRender);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", requestRender);
      renderRef.current = null;
    };
  }, [imagesLoaded]);

  // 3. Map scrolling through the spacer to frames 001–240.
  useEffect(() => {
    let rafId = 0;

    const updateScrollFrame = () => {
      rafId = 0;

      const spacer = spacerRef.current;
      if (!spacer) return;

      const rect = spacer.getBoundingClientRect();

      // At the top: spacer top is at the bottom of the viewport.
      // At the end: spacer bottom has passed the top of the viewport.
      const totalDistance =
        spacer.offsetHeight + window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / totalDistance
        )
      );

      const nextIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.round(progress * (TOTAL_FRAMES - 1))
      );

      if (nextIndex !== frameIndexRef.current) {
        frameIndexRef.current = nextIndex;
        setCurrentFrameIndex(nextIndex);
        renderRef.current?.();
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateScrollFrame);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    updateScrollFrame();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const heroVisible = currentFrameIndex < 30;

  const speedVisible =
    currentFrameIndex >= 80 && currentFrameIndex <= 130;

  const rangeVisible =
    currentFrameIndex >= 160 && currentFrameIndex <= 210;

  return (
    <main className="apex-home">
      {!imagesLoaded && (
        <div className="apex-home-loader">
          <div className="apex-loader-ring" />

          <p className="apex-loader-brand">WATCH SHOP</p>

          <h2 className="apex-loader-title">
            LOADING LUXURY EXPERIENCE
          </h2>

          <div
            className="apex-loader-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={loadingProgress}
          >
            <span
              className="apex-loader-fill"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <span className="apex-loader-percent">
            {loadingProgress}%
          </span>
        </div>
      )}

      <section className="apex-hero-sticky">
        <canvas
          ref={canvasRef}
          className="apex-hero-canvas"
          aria-label="Scroll to rotate the luxury watch"
        />

        <div className="apex-hero-vignette" />

        <div
          className={`apex-hero-content ${
            heroVisible ? "is-visible" : "is-hidden"
          }`}
        >
          <span className="apex-home-badge">THE ART OF TIME</span>

          <h1 className="apex-hero-title">
            WATCH <span>SHOP</span>
          </h1>

          <p className="apex-hero-subtitle">
            Timeless elegance. Precision craftsmanship.
            Discover luxury timepieces designed for every moment.
          </p>

          <Link to="/products" className="apex-hero-button">
            EXPLORE COLLECTION
            <ArrowRight size={17} />
          </Link>

          <div className="apex-scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="apex-bounce-icon" size={19} />
          </div>
        </div>

        <div
          className={`apex-spec-badge apex-spec-left ${
            speedVisible ? "is-visible" : "is-hidden"
          }`}
        >
          <Gauge className="apex-spec-icon" />
          <div>
            <h4 className="apex-spec-title">MOVEMENT</h4>
            <p className="apex-spec-value">PRECISION ENGINEERED</p>
          </div>
        </div>

        <div
          className={`apex-spec-badge apex-spec-right ${
            rangeVisible ? "is-visible" : "is-hidden"
          }`}
        >
          <BatteryCharging className="apex-spec-icon" />
          <div>
            <h4 className="apex-spec-title">CRAFTSMANSHIP</h4>
            <p className="apex-spec-value">TIMELESS QUALITY</p>
          </div>
        </div>

        <div className="apex-frame-counter">
          FRAME{" "}
          <span>
            {String(currentFrameIndex + 1).padStart(3, "0")}
          </span>
          <span className="apex-frame-divider">/</span>
          {TOTAL_FRAMES}
        </div>
      </section>

      <div
        ref={spacerRef}
        className="apex-scroll-spacer"
        aria-hidden="true"
      />

      <section className="apex-home-extra">
        <div className="apex-home-container">
          <div className="apex-section-heading">
            <span className="apex-section-badge">
              THE WATCH SHOP DIFFERENCE
            </span>

            <h2 className="apex-section-title">
              Designed for Every Moment
              <br />
              <span>Built to Last</span>
            </h2>

            <p className="apex-section-description">
              Explore sophisticated timepieces that bring together
              elegant design, dependable movements, premium materials,
              and attention to every detail.
            </p>
          </div>

          <div className="apex-metrics-grid">
            <article className="apex-metric-card">
              <span className="apex-metric-number">01</span>
              <h3 className="apex-metric-value">Premium</h3>
              <p className="apex-metric-label">WATCH COLLECTIONS</p>
            </article>

            <article className="apex-metric-card">
              <span className="apex-metric-number">02</span>
              <h3 className="apex-metric-value">Precision</h3>
              <p className="apex-metric-label">CRAFTSMANSHIP</p>
            </article>

            <article className="apex-metric-card">
              <span className="apex-metric-number">03</span>
              <h3 className="apex-metric-value">Timeless</h3>
              <p className="apex-metric-label">DESIGN PHILOSOPHY</p>
            </article>

            <article className="apex-metric-card">
              <span className="apex-metric-number">04</span>
              <h3 className="apex-metric-value">Everyday</h3>
              <p className="apex-metric-label">ELEGANT COMFORT</p>
            </article>
          </div>
        </div>

        <div className="apex-home-container">
          <div className="apex-gallery-header">
            <div>
              <span className="apex-section-badge">
                SELECTED TIMEPIECES
              </span>

              <h2 className="apex-section-title apex-title-left">
                Discover the Details
                <br />
                <span>Behind Every Watch</span>
              </h2>
            </div>

            <Link to="/gallery" className="apex-view-all">
              View Full Gallery
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="apex-preview-grid">
            {galleryImages.map((image) => (
              <Link
                to="/gallery"
                className="apex-preview-card"
                key={image.title}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="apex-preview-image"
                  loading="lazy"
                />

                <div className="apex-preview-overlay">
                  <span>{image.title}</span>
                  <ArrowRight size={19} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="apex-home-container apex-color-section">
          <span className="apex-section-badge">FIND YOUR STYLE</span>

          <h2 className="apex-section-title">
            Choose Your <span>Finish</span>
          </h2>

          <p className="apex-section-description">
            Explore different finishes and select the look
            that best matches your personal style.
          </p>

          <div className="apex-selected-color">
            Selected finish: <strong>{selectedColor}</strong>
          </div>

          <div className="apex-color-picker">
            {watchFinishes.map((finish) => {
              const selected = selectedColor === finish.name;

              return (
                <button
                  type="button"
                  key={finish.name}
                  className={`apex-color-button ${
                    selected ? "is-selected" : ""
                  }`}
                  onClick={() => setSelectedColor(finish.name)}
                  aria-pressed={selected}
                >
                  <span
                    className="apex-color-swatch"
                    style={{ backgroundColor: finish.color }}
                  />

                  <span>{finish.name}</span>

                  {selected && (
                    <Check className="apex-color-check" size={16} />
                  )}
                </button>
              );
            })}
          </div>

          <p className="apex-color-note">
            * Finish selection is a visual preference preview.
          </p>
        </div>
      </section>
    </main>
  );
}
