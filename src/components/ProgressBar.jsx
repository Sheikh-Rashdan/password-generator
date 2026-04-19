import { useState, useRef, useLayoutEffect } from 'react';

import "./ProgressBar.css";

function ProgressBar({ value, color, min, max }) {
  const [progressX, setProgressX] = useState();
  const trackRef = useRef();

  function calcThumbX(x, trackRect, thumbRect) {
    const progress = x / (trackRect.width - thumbRect.width);
    const value = min + progress * (max - min);
    return Math.floor(value);
  }

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();

    const clampedValue = Math.max(min, Math.min(value, max));
    const x = trackRect.width - (clampedValue - min) * (trackRect.width) / (max - min);

    setProgressX(x);
  }, [value, color, min, max]);

  return (
    <div className="progressBarContainer">
      <div className="progressBarTrack"
        ref={trackRef}
      >
        <div className="progressBarColoredTrack"
          style={{ "right": progressX, "backgroundColor": color }
          }
        />
      </div>
    </div>
  );
}

export default ProgressBar;