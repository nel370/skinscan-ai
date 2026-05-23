import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/skinstric/Header';
import NavigationArrow from '../components/skinstric/NavigationArrow';
import DiamondShapes from '../components/skinstric/DiamondShapes';
import { toast } from 'sonner';

const PHASE_ONE_API = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

function validateField(value) {
  if (!value || value.trim().length === 0) return "This field is required";
  if (/\d/.test(value)) return "Must not contain numbers";
  if (/[^a-zA-Z\s\-'.,'àáâãäåèéêëìíîïòóôõöùúûüýÿñçšžÀÁÂÃÄÅÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝŸÑÇŠŽ]/.test(value)) return "Contains invalid characters";
  if (value.trim().length < 2) return "Must be at least 2 characters";
  return null;
}

export default function IntroForm() {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState(null); // 'name' or 'location'
  const [name, setName] = useState(() => localStorage.getItem('skinstric_name') || '');
  const [location, setLocation] = useState(() => localStorage.getItem('skinstric_location') || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (activeField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeField]);

  const currentValue = activeField === 'name' ? name : activeField === 'location' ? location : '';
  const setValue = activeField === 'name' ? setName : setLocation;
  const placeholder = activeField === 'name' ? 'Enter your name' : activeField === 'location' ? 'Enter your location' : '';

  const handleProceed = async () => {
    const nameErr = validateField(name);
    const locErr = validateField(location);
    if (nameErr || locErr) {
      setErrors({ name: nameErr, location: locErr });
      if (nameErr) {
        setActiveField('name');
        toast.error(nameErr);
      } else if (locErr) {
        setActiveField('location');
        toast.error(locErr);
      }
      return;
    }

    setIsSubmitting(true);
    localStorage.setItem('skinstric_name', name);
    localStorage.setItem('skinstric_location', location);

    try {
      const response = await fetch(PHASE_ONE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), location: location.trim() }),
      });
      const data = await response.json();
      console.log('Phase 1 response:', data);
      navigate('/analysis');
    } catch (error) {
      console.error('Phase 1 error:', error);
      toast.error('Failed to submit data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (activeField === 'name' && !validateField(name)) {
        setActiveField('location');
      } else if (activeField === 'location') {
        setActiveField(null);
        handleProceed();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Header label="INTRO" />

      <div className="absolute top-16 left-6 md:left-10">
        <p className="text-[11px] font-medium tracking-wide uppercase text-foreground/70">
          TO START ANALYSIS
        </p>
      </div>

      <DiamondShapes />

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {!activeField ? (
          <div className="text-center space-y-2">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">CLICK TO TYPE</p>
            <button
              onClick={() => setActiveField(name ? 'location' : 'name')}
              className="text-[clamp(1.8rem,5vw,3.5rem)] font-light text-foreground/30 hover:text-foreground/50 transition-colors cursor-text"
            >
              Introduce Yourself
            </button>

            {/* Show entered values */}
            {(name || location) && (
              <div className="mt-8 space-y-2">
                {name && (
                  <button
                    onClick={() => setActiveField('name')}
                    className="block mx-auto text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <span className="text-muted-foreground text-xs uppercase mr-2">Name:</span>
                    {name}
                  </button>
                )}
                {location && (
                  <button
                    onClick={() => setActiveField('location')}
                    className="block mx-auto text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <span className="text-muted-foreground text-xs uppercase mr-2">Location:</span>
                    {location}
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center w-full max-w-lg">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
              {activeField === 'name' ? 'WHAT IS YOUR NAME?' : 'WHERE ARE YOU FROM?'}
            </p>
            <input
              ref={inputRef}
              type="text"
              value={currentValue}
              onChange={(e) => {
                setValue(e.target.value);
                setErrors(prev => ({ ...prev, [activeField]: null }));
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full text-center text-[clamp(1.5rem,4vw,3rem)] font-light bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none pb-2 text-foreground placeholder:text-foreground/20 transition-colors"
            />
            {errors[activeField] && (
              <p className="mt-3 text-xs text-destructive tracking-wide uppercase">{errors[activeField]}</p>
            )}
            <div className="mt-8 flex items-center justify-center gap-6">
              {activeField === 'location' && (
                <button
                  onClick={() => setActiveField('name')}
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Name
                </button>
              )}
              <button
                onClick={() => {
                  const err = validateField(currentValue);
                  if (err) {
                    setErrors(prev => ({ ...prev, [activeField]: err }));
                    return;
                  }
                  if (activeField === 'name') {
                    setActiveField('location');
                  } else {
                    setActiveField(null);
                  }
                }}
                className="px-6 py-2 text-xs tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                {activeField === 'name' ? 'Next' : 'Done'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-8 left-6 md:left-10 z-50">
        <NavigationArrow direction="left" label="BACK" onClick={() => navigate('/')} />
      </div>
      <div className="fixed bottom-8 right-6 md:right-10 z-50">
        <NavigationArrow
          direction="right"
          label="PROCEED"
          onClick={handleProceed}
          disabled={isSubmitting || !name || !location}
        />
      </div>
    </div>
  );
}