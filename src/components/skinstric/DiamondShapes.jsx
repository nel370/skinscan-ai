import React from 'react';

export default function DiamondShapes({ className = "" }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      {/* Large outer diamond */}
      <div className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] border border-dashed border-foreground/[0.08] rotate-45 rounded-sm" />
      {/* Medium diamond */}
      <div className="absolute w-[350px] h-[350px] md:w-[420px] md:h-[420px] border border-dotted border-foreground/[0.06] rotate-[30deg] rounded-sm" />
      {/* Small inner diamond */}
      <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] border border-dashed border-foreground/[0.10] rotate-[60deg] rounded-sm" />
    </div>
  );
}