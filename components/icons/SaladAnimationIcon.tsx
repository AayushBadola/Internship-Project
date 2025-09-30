import React from 'react';

const SaladAnimationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Bowl */}
    <path
      d="M 15 75 Q 50 105, 85 75"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      className="text-slate-400"
      strokeLinecap="round"
    />

    {/* Ingredients */}
    <g className="animate-ingredient-drop" style={{ animationDelay: '0s' }}>
      {/* Tomato Slice */}
      <circle cx="40" cy="20" r="10" fill="#ef4444" />
      <circle cx="40" cy="20" r="5" fill="#fde047" />
    </g>
    <g className="animate-ingredient-drop" style={{ animationDelay: '0.5s' }}>
      {/* Lettuce Leaf */}
      <path d="M 60 20 Q 70 5, 80 20 T 90 25" fill="#84cc16" />
    </g>
    <g className="animate-ingredient-drop" style={{ animationDelay: '1s' }}>
      {/* Cucumber Slice */}
      <circle cx="55" cy="15" r="8" fill="#22c55e" />
      <circle cx="55" cy="15" r="4" fill="#a3e635" />
    </g>
    
    {/* Static ingredients in the bowl */}
    <g transform="translate(0, 40)">
        <path d="M 25 25 Q 35 10, 45 25 T 55 30" fill="#84cc16" opacity="0.8" />
        <circle cx="65" cy="30" r="8" fill="#22c55e" opacity="0.8" />
    </g>
  </svg>
);

export default SaladAnimationIcon;