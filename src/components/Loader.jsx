import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;

    const timer = setInterval(() => {
      const value = Math.min(
        100,
        Math.round(((Date.now() - start) / duration) * 100)
      );

      setProgress(value);

      if (value >= 100) {
        clearInterval(timer);
        setTimeout(() => onComplete?.(), 250);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="watch-loader">
      <div className="watch-loader-glow" />

      <div className="watch-loader-content">
        <div className="watch-loader-icon">
          <Clock size={44} strokeWidth={1.2} />
        </div>

        <p className="watch-loader-kicker">TIMELESS ELEGANCE</p>

        <h1>
          WATCH <span>SHOP</span>
        </h1>

        <p className="watch-loader-description">
          Every second tells a story.
        </p>

        <div className="watch-loader-track">
          <div
            className="watch-loader-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="watch-loader-bottom">
          <span>PREPARING YOUR EXPERIENCE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}