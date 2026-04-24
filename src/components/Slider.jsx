import { useState, useRef, useLayoutEffect } from 'react';

import "./Slider.css";

function Slider({ startValue, setValue, min, max }) {
  const trackRef = useRef();
  const thumbRef = useRef();

  const [thumbHeld, setThumbHeld] = useState(false);
  const [thumbX, setThumbX] = useState(0);

  function holdThumb(e) {
    e.preventDefault();
    setThumbHeld(true);
  }

  function calcThumbX(x, trackRect, thumbRect) {
    const progress = x / (trackRect.width - thumbRect.width);
    const value = min + progress * (max - min);
    return Math.floor(value);
  }

  useLayoutEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const trackRect = track.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();

    const clampedStartValue = Math.max(min, Math.min(startValue, max));
    const startX = (clampedStartValue - min) * (trackRect.width - thumbRect.width) / (max - min);

    setThumbX(startX);
  }, []);

  useLayoutEffect(() => {
    if (!thumbHeld) return;
    function moveThumb(e) {

      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!track || !thumb) return;

      const trackRect = track.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();

      let newX = e.clientX - trackRect.left - thumbRect.width / 2;

      newX = Math.max(0, Math.min(newX, trackRect.width - thumbRect.width))
      setThumbX(newX);

      const value = calcThumbX(newX, trackRect, thumbRect);
      setValue(value);
    }

    function releaseThumb() {
      setThumbHeld(false);
    }

    window.addEventListener("mousemove", moveThumb);
    window.addEventListener("mouseup", releaseThumb);

    return () => {
      window.removeEventListener("mousemove", moveThumb)
      window.removeEventListener("mouseup", releaseThumb)
    };
  }, [thumbHeld]);

  return (
    <div className="sliderContainer">
      <div className="sliderTrack" ref={trackRef}>
        <div className="sliderUncoloredTrack"
          style={{ "left": thumbX }}
        />
        <div className="sliderThumb"
          ref={thumbRef}
          onMouseDown={holdThumb}
          style={{ left: thumbX }}
        />
      </div>
    </div>
  );
}

export default Slider;