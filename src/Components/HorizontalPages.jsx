import React, { useState, useRef } from "react";
import "../Style/HorizontalPages.css";
import DirectionalButton from './DirectionalButton.jsx'

const HorizontalPages = ({ pages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Move to the next page
  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Move to the previous page
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Optional: Basic swipe handling
  let touchStartX = 0;
  let touchEndX = 0;

  const onTouchStart = (e) => {
    touchStartX = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // pixels
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left → go to next
      handleNext();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right → go to prev
      handlePrev();
    }
  };

  return (
    <div className="wrapper">
      {/* Arrows */}
      <DirectionalButton direction="left" currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} length={pages.length}/>
      <DirectionalButton direction="right" currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} length={pages.length}/>

      {/* Container that holds all pages side-by-side */}
      <div
        className="pages-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        ref={containerRef}
      >
        {pages.map((pageContent, idx) => (
          <div className="page" key={idx}>
            {pageContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalPages;
