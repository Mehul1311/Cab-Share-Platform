import React from 'react';

const Logo = ({ className = '', style = {}, height = 40 }) => {
  return (
    <svg 
      className={className} 
      style={style} 
      height={height} 
      viewBox="0 0 320 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0, 10)">
        {/* Left Person (Blue) */}
        <circle cx="28" cy="12" r="10" fill="#2E74D4" />
        <path d="M 8 55 C 8 22, 42 22, 48 30" stroke="#2E74D4" strokeWidth="8" strokeLinecap="round" fill="none" />
        
        {/* Right Person (Green) */}
        <circle cx="72" cy="12" r="10" fill="#70BB46" />
        <path d="M 92 55 C 92 22, 58 22, 52 30" stroke="#70BB46" strokeWidth="8" strokeLinecap="round" fill="none" />
        
        {/* Car (Blue) */}
        <path 
          d="
            M 24 40 
            C 24 25, 34 18, 50 18 
            C 66 18, 76 25, 76 40 
            L 82 43 
            L 82 56 
            C 82 59, 80 61, 77 61 
            L 74 61 
            L 74 66 
            C 74 70, 68 70, 68 66 
            L 68 61 
            L 32 61 
            L 32 66 
            C 32 70, 26 70, 26 66 
            L 26 61 
            L 23 61 
            C 20 61, 18 59, 18 56 
            L 18 43 
            Z
            
            M 28 38 
            C 32 25, 68 25, 72 38 
            L 28 38 
            Z
            
            M 24 50
            C 24 47, 34 47, 34 50
            C 34 53, 24 53, 24 50
            Z
            
            M 76 50
            C 76 47, 66 47, 66 50
            C 66 53, 76 53, 76 50
            Z
          " 
          fillRule="evenodd" 
          clipRule="evenodd" 
          fill="#2E74D4" 
        />
      </g>
      
      {/* Text */}
      <text 
        x="110" 
        y="58" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
        fontWeight="800" 
        fontSize="52" 
        fontStyle="italic"
        letterSpacing="-1"
      >
        <tspan fill="#2E74D4">Ride</tspan>
        <tspan fill="#70BB46">Share</tspan>
      </text>
    </svg>
  );
};

export default Logo;
