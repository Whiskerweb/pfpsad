import React, { forwardRef } from 'react';

interface CharacterPreviewProps {
  traits: {
    background: string;
    face: string;
    eyes: string;
    clothes: string; // <-- Correction ici (remplacez "mouth" par "clothes")
    accessory: string;
    hat: string; // <-- Ajoutez cette ligne
  };
}

export const CharacterPreview = forwardRef<HTMLDivElement, CharacterPreviewProps>(
  ({ traits }, ref) => {
    return (
      <div 
        ref={ref}
        className="relative aspect-square rounded-lg overflow-hidden"
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${traits.background})` }}
        />
        
        {/* Face */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${traits.face})` }}
        />
        
        {/* Eyes */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${traits.eyes})` }}
        />
        
        {/* Clothes */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${traits.clothes})` }}
        />
        
        {/* Hat */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${traits.hat})` }} // <-- Correction ici (hat au lieu de hats)
        />
        
        {/* Accessory */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${traits.accessory})` }}
        />
      </div>
    );
  }
);