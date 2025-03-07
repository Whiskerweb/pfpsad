import React from 'react';

interface TraitSelectorProps {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export const TraitSelector: React.FC<TraitSelectorProps> = ({ 
  title, 
  options, 
  selected, 
  onChange 
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selected === option 
                ? 'border-yellow-300 ring-2 ring-yellow-300/50 scale-105' 
                : 'border-purple-400/30 hover:border-purple-300'
            }`}
            onClick={() => onChange(option)}
          >
            <div 
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${option})` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};