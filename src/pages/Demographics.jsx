import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/skinstric/Header';
import NavigationArrow from '../components/skinstric/NavigationArrow';
import DemographicSidebar from '../components/skinstric/DemographicSidebar';
import DemographicCategory from '../components/skinstric/DemographicCategory';

function getTopValue(data) {
  if (!data) return null;
  const sorted = Object.entries(data).sort(([, a], [, b]) => b - a);
  return sorted[0]?.[0] || null;
}

export default function Demographics() {
  const navigate = useNavigate();
  const [demographics, setDemographics] = useState(null);
  const [image, setImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('race');
  const [selectedValues, setSelectedValues] = useState({
    race: null,
    age: null,
    gender: null,
  });

  useEffect(() => {
    const stored = localStorage.getItem('skinstric_demographics');
    const storedImage = localStorage.getItem('skinstric_image');

    if (!stored) {
      navigate('/analysis');
      return;
    }

    const data = JSON.parse(stored);
    setDemographics(data);
    setImage(storedImage);

    // Set initial selected values to top predictions
    setSelectedValues({
      race: getTopValue(data.race),
      age: getTopValue(data.age),
      gender: getTopValue(data.gender),
    });
  }, [navigate]);

  if (!demographics) return null;

  const handleSelect = (category, value) => {
    setSelectedValues(prev => ({ ...prev, [category]: value }));
  };

  const categories = [
    { key: 'race', label: 'RACE' },
    { key: 'age', label: 'AGE' },
    { key: 'gender', label: 'GENDER' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header label="DEMOGRAPHICS" />

      <div className="flex-1 pt-20 pb-24 px-6 md:px-10">
        <p className="text-[11px] font-medium tracking-wide uppercase text-foreground/70 mb-8">
          A.I. ANALYSIS RESULTS
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left sidebar */}
          <DemographicSidebar image={image} selectedValues={selectedValues} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Category tabs */}
            <div className="flex gap-1 mb-6 border-b border-foreground/10">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-3 text-[11px] tracking-widest uppercase transition-colors relative ${
                    activeCategory === cat.key
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground/70'
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.key && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                  )}
                </button>
              ))}
            </div>

            {/* Active category content */}
            {demographics[activeCategory] && (
              <DemographicCategory
                title={activeCategory.toUpperCase()}
                data={demographics[activeCategory]}
                selectedValue={selectedValues[activeCategory]}
                onSelect={(value) => handleSelect(activeCategory, value)}
              />
            )}

            <p className="mt-6 text-[10px] tracking-wide text-muted-foreground/60 uppercase">
              Click on a value to set it as your actual attribute
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-6 md:left-10">
        <NavigationArrow direction="left" label="BACK" onClick={() => navigate('/analysis')} />
      </div>
    </div>
  );
}