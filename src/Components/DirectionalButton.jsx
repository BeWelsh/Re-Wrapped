import React from "react";
import "../Style/ArrowButton.css";

const ArrowButton = ({ direction, currentIndex, setCurrentIndex, length }) => {
  // Move to the next page
  const handleNext = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Move to the previous page
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <button
      className={`arrow-button ${direction === "right" ? "right" : "left"}`}
      onClick={direction === "right" ? handleNext : handlePrev}
    >
      <div className="arrow-shape"></div>
    </button>
  );
};

export default ArrowButton;
