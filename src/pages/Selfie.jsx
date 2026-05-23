import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/skinstric/Header';
import NavigationArrow from '../components/skinstric/NavigationArrow';
import { toast } from 'sonner';

const PHASE_TWO_API = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export default function Selfie() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraError(null);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Unable to access camera. Please grant permission or try uploading a photo instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    // Mirror the image for selfie
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCaptured(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setCaptured(null);
    startCamera();
  };

  const handleAnalyze = async () => {
    if (!captured) return;

    setIsAnalyzing(true);
    try {
      const base64String = captured.split(',')[1];

      const response = await fetch(PHASE_TWO_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64String }),
      });
      const data = await response.json();
      console.log('Phase 2 response:', data);

      if (data.data) {
        localStorage.setItem('skinstric_demographics', JSON.stringify(data.data));
        localStorage.setItem('skinstric_image', captured);
        navigate('/demographics');
      } else {
        toast.error('Analysis failed. Please try again.');
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
          TAKE A SELFIE
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {cameraError ? (
          <div className="text-center space-y-4 max-w-sm">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto text-foreground/30">
              <path d="M1 1l22 22M21 21H3a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-xs tracking-wide text-muted-foreground">{cameraError}</p>
            <button
              onClick={() => navigate('/upload')}
              className="px-5 py-2 text-[11px] tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              UPLOAD PHOTO INSTEAD
            </button>
          </div>
        ) : !captured ? (
          <div className="flex flex-col items-center gap-6">
            {/* Video in diamond shape */}
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 overflow-hidden rotate-45 border border-foreground/20">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="-rotate-45 scale-[1.42] w-full h-full object-cover mirror"
                  style={{ transform: 'rotate(-45deg) scale(1.42) scaleX(-1)' }}
                />
              </div>
              {/* Corner guides */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-foreground/30 rotate-45" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-foreground/30 rotate-45" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-foreground/30 rotate-45" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-foreground/30 rotate-45" />
            </div>

            <button
              onClick={handleCapture}
              className="group relative w-16 h-16 flex items-center justify-center"
            >
              <div className="absolute inset-0 border-2 border-foreground/40 rotate-45 group-hover:scale-110 group-hover:border-foreground transition-all duration-300" />
              <div className="w-8 h-8 bg-foreground/80 rotate-45 group-hover:bg-foreground transition-colors" />
            </button>
            <p className="text-xs tracking-widest uppercase text-muted-foreground">TAP TO CAPTURE</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 overflow-hidden rotate-45 border border-foreground/20">
                <img
                  src={captured}
                  alt="Selfie"
                  className="-rotate-45 scale-[1.42] w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRetake}
                className="px-5 py-2 text-[11px] tracking-widest uppercase border border-foreground/20 hover:border-foreground/50 transition-colors"
              >
                RETAKE
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

      <div className="fixed bottom-8 left-6 md:left-10 z-50">
        <NavigationArrow direction="left" label="BACK" onClick={() => { stopCamera(); navigate('/analysis'); }} />
      </div>
    </div>
  );
}