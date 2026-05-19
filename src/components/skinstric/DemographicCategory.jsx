import React from 'react';

export default function DemographicCategory({ title, data, selectedValue, onSelect }) {
  // Sort entries by value descending
  const sortedEntries = Object.entries(data).sort(([, a], [, b]) => b - a);

  return (
    <div>
      <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">{title}</h3>
      <div className="space-y-1">
        {sortedEntries.map(([label, score]) => {
          const percentage = (score * 100).toFixed(2);
          const isSelected = selectedValue === label;

          return (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-all duration-200 group ${
                isSelected
                  ? 'bg-foreground text-background'
                  : 'hover:bg-foreground/5'
              }`}
            >
              <span className={`text-xs tracking-wide uppercase ${
                isSelected ? 'font-medium' : 'text-foreground/70 group-hover:text-foreground'
              }`}>
                {label}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1 bg-foreground/10 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isSelected ? 'bg-background/60' : 'bg-foreground/30'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={`text-[11px] font-mono tabular-nums ${
                  isSelected ? 'text-background/70' : 'text-muted-foreground'
                }`}>
                  {percentage}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}