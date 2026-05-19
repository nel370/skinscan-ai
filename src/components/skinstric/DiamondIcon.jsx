import React from 'react';

export default function DiamondIcon({ size = 32, filled = false, className = "" }) {
  const half = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <rect
        x={half}
        y="0"
        width={half * 0.95}
        height={half * 0.95}
        transform={`rotate(45 ${half} ${half})`}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
      />
    </svg>
  );
}