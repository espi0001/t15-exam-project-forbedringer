"use client";
import { useState } from "react";

export default function AboutSection({ bio }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <h2 className="">About the Band</h2>
      <div className={`relative ${!isExpanded ? "line-clamp-6" : ""}`}>
        <p className="text-step_p">{bio}</p>
        {!isExpanded && <div />}
      </div>
      <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 text-sm font-medium text-gray-700 italic hover:text-gray-300 transition-colors">
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
