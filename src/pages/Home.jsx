import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/skinstric/Header';
import NavigationArrow from '../components/skinstric/NavigationArrow';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Header label="INTRO" />

      {/* Diagonal line decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[15%] w-px h-[140%] bg-foreground/[0.04] -rotate-[25deg] origin-top" />
        <div className="absolute top-0 right-[15%] w-px h-[140%] bg-foreground/[0.04] rotate-[25deg] origin-top" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-light text-foreground/80 text-center leading-[1.05] tracking-tight">
          Sophisticated<br />skincare
        </h1>
      </div>

      {/* Left navigation */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2">
        <NavigationArrow direction="left" label="DISCOVER A.I." onClick={() => {}} />
      </div>

      {/* Right navigation */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2">
        <NavigationArrow direction="right" label="TAKE TEST" onClick={() => navigate('/intro')} />
      </div>

      {/* Bottom left description */}
      <div className="absolute bottom-8 left-6 md:left-10 max-w-xs">
        <p className="text-[11px] font-medium leading-relaxed tracking-wide uppercase text-foreground/70">
          Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
        </p>
      </div>
    </div>
  );
}