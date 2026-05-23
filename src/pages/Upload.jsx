import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/skinstric/Header';
import NavigationArrow from '../components/skinstric/NavigationArrow';
import DiamondShapes from '../components/skinstric/DiamondShapes';
import { toast } from 'sonner';

const PHASE_TWO_API = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!preview) return;

    setIsAnalyzing(true);
    try {
      // Extract base64 string (remove data:image/...;base64, prefix)
      const base64String = preview.split(',')[1];

      const response = await fetch(PHASE_TWO_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64String }),
      });
      const data = await response.json();
      console.log('Phase 2 response:', data);

      if (data.data) {
        localStorage.setItem('skinstric_demographics', JSON.stringify(data.data));
        localStorage.setItem('skinstric_image', preview);
        navigate('/demographics');
      } else {
        toast.error('Analysis failed. Please try a different image.');
      }
    } catch (error) {
      console.error('Phase 2 error:', error);
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Header label="ANALYSIS" />

      <div className="absolute top-16 left-6 md:left-10">
        <p className="text-[11px] font-medium tracking-wide uppercase text-foreground/70">
          UPLOAD YOUR PHOTO
        </p>
      </div>

      <DiamondShapes />

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {!preview ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group flex flex-col items-center gap-6"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-foreground/15 rotate-45 group-hover:scale-105 group-hover:border-foreground/30 transition-all duration-500" />
              <div className="flex flex-col items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-foreground/40 group-hover:text-foreground/70 transition-colors">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                  SELECT FILE
                </span>
              </div>
            </div>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 overflow-hidden rotate-45 border border-foreground/20">
                <img
                  src={preview}
                  alt="Preview"
                  className="-rotate-45 scale-[1.42] w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setPreview(null); fileInputRef.current.value = ''; }}
                className="px-5 py-2 text-[11px] tracking-widest uppercase border border-foreground/20 hover:border-foreground/50 transition-colors"
              >
                CHANGE
              </button>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-5 py-2 text-[11px] tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? 'ANALYZING...' : 'ANALYZE SKIN'}
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Loading overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border border-foreground/30 rotate-45 animate-spin-slow" />
              <div className="absolute inset-3 border border-dashed border-foreground/20 rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            </div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground">ANALYZING YOUR SKIN...</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 left-6 md:left-10">
        <NavigationArrow direction="left" label="BACK" onClick={() => navigate('/analysis')} />
      </div>
    </div>
  );
}