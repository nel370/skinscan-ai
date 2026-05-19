import React from 'react';

export default function NavigationArrow({ direction = "right", label, onClick, disabled = false }) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-3 group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <span className="text-xs font-medium tracking-widest uppercase text-foreground group-hover:text-foreground/70 transition-colors">
        {label}
      </span>
      <div className={`relative w-10 h-10 flex items-center justify-center`}>
        {/* Diamond border */}
        <div className="absolute inset-0 border border-foreground/80 rotate-45 group-hover:scale-110 transition-transform duration-300" />
        {/* Arrow */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`relative z-10 ${isLeft ? "" : ""}`}
        >
          {isLeft ? (
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </div>
    </button>
  );
}