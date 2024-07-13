import React, { useState } from 'react';
import Slider from 'react-slider';

const FilterComponent = ({ onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSliderChange = (newValue) => {
    setPriceRange(newValue);
    onPriceChange(newValue);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
      <div className="flex justify-between mb-2">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
      <Slider
        className="slider"
        value={priceRange}
        onChange={handleSliderChange}
        min={0}
        max={1000}
        step={10}
        pearling
        minDistance={10}
      />
    </div>
  );
};

export default FilterComponent;
