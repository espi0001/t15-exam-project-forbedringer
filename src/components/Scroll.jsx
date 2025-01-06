"use client";
import React from 'react';

const ScrollIndicator = () => {
  const scrollToParallax = () => {
    const parallaxSection = document.querySelector('section');
    if (parallaxSection) {
      parallaxSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={scrollToParallax}
      className="flex flex-col items-center gap-2 animate-bounce hover:opacity-80 transition-opacity"
      aria-label="Scroll to next section"
    >
      <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2 cursor-pointer">
        <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </button>
  );
};

export default ScrollIndicator;