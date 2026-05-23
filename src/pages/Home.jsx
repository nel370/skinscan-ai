import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/skinstric/Header';

export default function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null); // 'left' | 'right' | null

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Header label="INTRO" />

      {/* Diagonal line decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[15%] w-px h-[140%] bg-foreground/[0.04] -rotate-[25deg] origin-top" />
        <div className="absolute top-0 right-[15%] w-px h-[140%] bg-foreground/[0.04] rotate-[25deg] origin-top" />
      </div>

      {/* Full layout: left arrow | center text | right arrow */}
      <div className="flex-1 flex items-center justify-between px-6 md:px-10 relative">

        {/* LEFT arrow — DISCOVER A.I. */}
        <div
          className="flex flex-col items-center gap-3 cursor-pointer shrink-0 z-10"
          onMouseEnter={() => setHovered('left')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Triangle pointing left */}
          <div
            className="transition-all duration-400"
            style={{ opacity: hovered === 'right' ? 0 : 1, transform: hovered === 'left' ? 'scale(1.12)' : 'scale(1)' }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              {/* Outer diamond border */}
              <rect x="2" y="2" width="36" height="36" rx="0" transform="rotate(45 20 20)" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.6" />
              {/* Filled triangle pointing left */}
              <polygon points="24,12 24,28 12,20" fill="currentColor" />
            </svg>
          </div>
          <span
            className="text-[10px] tracking-widest uppercase font-medium transition-all duration-400 hidden md:block"
            style={{ opacity: hovered === 'right' ? 0 : 1 }}
          >
            DISCOVER A.I.
          </span>
        </div>

        {/* CENTER TEXT */}
        <div
          className="flex-1 flex items-center justify-center px-4 md:px-8 transition-all duration-500"
          style={{
            transform: hovered === 'left'
              ? 'translateX(-6%)'
              : hovered === 'right'
              ? 'translateX(6%)'
              : 'translateX(0)',
            opacity: hovered ? 0.6 : 1,
          }}
        >
          <h1 className="text-[clamp(2rem,7vw,6rem)] font-light text-foreground/80 text-center leading-[1.05] tracking-tight">
            Sophisticated<br />skincare
          </h1>
        </div>

        {/* RIGHT arrow — TAKE TEST */}
        <div
          className="flex flex-col items-center gap-3 cursor-pointer shrink-0 z-10"
          onMouseEnter={() => setHovered('right')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/intro')}
        >
          <div
            className="transition-all duration-400"
            style={{ opacity: hovered === 'left' ? 0 : 1, transform: hovered === 'right' ? 'scale(1.12)' : 'scale(1)' }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              {/* Outer diamond border */}
              <rect x="2" y="2" width="36" height="36" rx="0" transform="rotate(45 20 20)" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.6" />
              {/* Filled triangle pointing right */}
              <polygon points="16,12 28,20 16,28" fill="currentColor" />
            </svg>
          </div>
          <span
            className="text-[10px] tracking-widest uppercase font-medium transition-all duration-400 hidden md:block"
            style={{ opacity: hovered === 'left' ? 0 : 1 }}
          >
            TAKE TEST
          </span>
        </div>

      </div>

      {/* Bottom left description */}
      <div className="absolute bottom-8 left-6 md:left-10 max-w-[200px] md:max-w-xs">
        <p className="text-[10px] font-medium leading-relaxed tracking-wide uppercase text-foreground/50">
          Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
        </p>
      </div>
    </div>
  );
}