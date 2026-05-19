import React from 'react';

export default function DemographicSidebar({ image, selectedValues }) {
  return (
    <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">
      {/* Image */}
      {image && (
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto lg:mx-0">
          <div className="w-full h-full overflow-hidden rotate-45 border border-foreground/20">
            <img
              src={image}
              alt="Your photo"
              className="-rotate-45 scale-[1.42] w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Selected values */}
      <div className="space-y-3 mt-4">
        <p className="text-[10px] tracking-widest uppercase text-muted-foreground">A.I. DETERMINED</p>

        {selectedValues.race && (
          <div className="border-b border-foreground/10 pb-2">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">RACE</p>
            <p className="text-sm font-medium capitalize text-foreground">{selectedValues.race}</p>
          </div>
        )}

        {selectedValues.age && (
          <div className="border-b border-foreground/10 pb-2">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">AGE</p>
            <p className="text-sm font-medium text-foreground">{selectedValues.age}</p>
          </div>
        )}

        {selectedValues.gender && (
          <div className="border-b border-foreground/10 pb-2">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">GENDER</p>
            <p className="text-sm font-medium capitalize text-foreground">{selectedValues.gender}</p>
          </div>
        )}
      </div>
    </div>
  );
}