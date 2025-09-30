import React from 'react';

const BicepFlexIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Sweat Drops */}
    <g strokeWidth="0" fill="currentColor">
        <circle cx="70" cy="22" r="2.5" className="animate-sweat-drip" style={{ animationDelay: '0s' }} />
        <circle cx="78" cy="28" r="2" className="animate-sweat-drip" style={{ animationDelay: '0.4s' }} />
        <circle cx="65" cy="32" r="2.2" className="animate-sweat-drip" style={{ animationDelay: '0.8s' }} />
    </g>
    
    {/* Arm */}
    <g transform="rotate(-15, 50, 95)">
      {/* Shoulder and forearm */}
      <path d="M 35 95 L 45 70 M 55 70 L 80 90" />
      {/* Bicep muscle that flexes */}
      <path
        d="M 45 70 C 45 55, 55 55, 55 70"
        className="animate-bicep-pump"
      />
      {/* Hand */}
      <path d="M 80 90 L 85 85" />
    </g>
  </svg>
);

export default BicepFlexIcon;