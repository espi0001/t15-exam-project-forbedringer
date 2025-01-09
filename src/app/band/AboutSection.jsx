"use client";
import { useState, useRef, useEffect } from "react";

export default function AboutSection({ bio }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current && containerRef.current) {
        // Compare the scrollHeight (full content height) with the clientHeight (visible height)
        const hasOverflowingContent = 
          contentRef.current.scrollHeight > containerRef.current.clientHeight;
        setHasOverflow(hasOverflowingContent);
      }
    };

    // Check initially
    checkOverflow();

    // Add resize listener
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [bio]); // Re-run when bio changes

  return (
    <div>
      <h2 className="">About the band</h2>
      <div 
        ref={containerRef}
        className={`relative ${!isExpanded ? "line-clamp-6" : ""}`}
      >
        <p 
          ref={contentRef} 
          className="text-step_p"
        >
          {bio}
        </p>
        {!isExpanded && <div />}
      </div>
      
      {hasOverflow && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="mt-2 text-sm font-medium text-red_color italic hover:text-less_black_color transition-colors"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}