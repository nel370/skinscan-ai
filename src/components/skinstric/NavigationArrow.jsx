import React from 'react';

export default function NavigationArrow({ direction = "right", label, onClick, disabled = false }) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-3 group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <span className="text-[10px] font-medium tracking-widest uppercase text-foreground group-hover:text-foreground/60 transition-colors">
        {label}
      </span>
      <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="transition-transform duration-300 group-hover:scale-110 pointer-events-none">
          {/* Diamond border */}
          <rect
            x="2" y="2" width="32" height="32"
            transform="rotate(45 18 18)"
            stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.6"
          />
          {/* Filled triangle */}
          {isLeft ? (
            <polygon points="22,11 22,25 11,18" fill="currentColor" />
          ) : (
            <polygon points="14,11 25,18 14,25" fill="currentColor" />
          )}
        </svg>
      </div>
    </button>
  );
}