import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ label = "INTRO" }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-background">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-sm font-bold tracking-wider text-foreground uppercase">
          SKINSTRIC
        </Link>
        <span className="text-xs tracking-widest text-muted-foreground uppercase flex items-center gap-1">
          <span className="text-muted-foreground/50">[</span>
          {label}
          <span className="text-muted-foreground/50">]</span>
        </span>
      </div>
      <button className="px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors">
        ENTER CODE
      </button>
    </header>
  );
}