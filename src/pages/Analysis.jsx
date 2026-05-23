import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/skinstric/Header';
import NavigationArrow from '../components/skinstric/NavigationArrow';
import DiamondShapes from '../components/skinstric/DiamondShapes';

export default function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Header label="ANALYSIS" />

      <div className="absolute top-16 left-6 md:left-10">
        <p className="text-[11px] font-medium tracking-wide uppercase text-foreground/70">
          TO GET PERSONALISED ANALYSIS
        </p>
      </div>

      <DiamondShapes />

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-10">SELECT HOW TO SHARE YOUR IMAGE</p>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Upload option */}
          <button
            onClick={() => navigate('/upload')}
            className="group flex flex-col items-center gap-4"
          >
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="absolute inset-0 border border-foreground/20 rotate-45 group-hover:scale-110 group-hover:border-foreground/50 transition-all duration-500" />
              <div className="absolute inset-3 border border-dashed border-foreground/10 rotate-45 group-hover:border-foreground/20 transition-all duration-500" />
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative z-10 text-foreground/60 group-hover:text-foreground transition-colors">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs tracking-widest uppercase text-foreground/60 group-hover:text-foreground transition-colors">
              UPLOAD PHOTO
            </span>
          </button>

          {/* Selfie option */}
          <button
            onClick={() => navigate('/selfie')}
            className="group flex flex-col items-center gap-4"
          >
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="absolute inset-0 border border-foreground/20 rotate-45 group-hover:scale-110 group-hover:border-foreground/50 transition-all duration-500" />
              <div className="absolute inset-3 border border-dashed border-foreground/10 rotate-45 group-hover:border-foreground/20 transition-all duration-500" />
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative z-10 text-foreground/60 group-hover:text-foreground transition-colors">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="text-xs tracking-widest uppercase text-foreground/60 group-hover:text-foreground transition-colors">
              TAKE A SELFIE
            </span>
          </button>
        </div>
      </div>

      <div className="fixed bottom-8 left-6 md:left-10 z-50">
        <NavigationArrow direction="left" label="BACK" onClick={() => navigate('/intro')} />
      </div>
    </div>
  );
}