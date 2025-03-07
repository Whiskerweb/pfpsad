import React, { useState, useRef, useEffect } from 'react';
import { Download } from 'lucide-react';
import { TraitSelector } from './components/TraitSelector';
import { CharacterPreview } from './components/CharacterPreview';
import { traits } from './data/traits';
import html2canvas from 'html2canvas';

function App() {
  const [selectedTraits, setSelectedTraits] = useState({
    background: traits.backgrounds[0],
    face: traits.faces[0],
    eyes: traits.eyes[0],
    clothes: traits.clothes[0],
    accessory: traits.accessories[0],
    hat: traits.hats[0], // <-- Initialisation correcte
  });

  const [activeCategory, setActiveCategory] = useState('background');
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleTraitChange = (category: string, value: string) => {
    setSelectedTraits(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;
    
    setDownloading(true);
    
    try {
      // Create a clone of the preview element to manipulate for download
      const previewClone = previewRef.current.cloneNode(true) as HTMLElement;
      previewClone.style.width = '1000px';
      previewClone.style.height = '1000px';
      previewClone.style.position = 'fixed';
      previewClone.style.top = '-1000px';
      previewClone.style.left = '-1000px';
      document.body.appendChild(previewClone);
      
      // Use html2canvas to capture the element
      const canvas = await html2canvas(previewClone, {
        useCORS: true,
        allowTaint: true,
        width: 1000,
        height: 1000,
        scale: 2, // Higher quality
      });
      
      document.body.removeChild(previewClone);
      
      // Convert canvas to data URL and trigger download
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'my-pfp.png';
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setDownloading(false);
    }
  };

  // Preload images to ensure they're available for download
  useEffect(() => {
    const preloadImages = () => {
      const allImages = [
        ...traits.backgrounds,
        ...traits.faces,
        ...traits.eyes,
        ...traits.clothes,
        ...traits.accessories,
        ...traits.hats,
      ];
      
      allImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, []);

  const categories = [
    { id: 'background', label: 'Background' },
    { id: 'face', label: 'Face' },
    { id: 'eyes', label: 'Eyes' },
    { id: 'clothes', label: 'Clothes' },
    { id: 'accessory', label: 'Accessory' },
    { id: 'hat', label: 'Hat' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-white">
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8">
      <a href="https://sad.show" className="hover:underline">
        Back to SAD Website
      </a>
    </h1>
   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preview Section - Always visible */}
          <div className="flex flex-col items-center sticky top-4">
            <div className="bg-blue-700 p-4 rounded-xl shadow-2xl mb-6 w-full max-w-md">
              <CharacterPreview 
                ref={previewRef}
                traits={selectedTraits} 
              />
            </div>
            
            <button 
              onClick={downloadImage}
              disabled={downloading}
              className={`flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 w-full max-w-md ${downloading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Download size={20} />
              {downloading ? 'Processing...' : 'Download PFP'}
            </button>
          </div>
          
          {/* Trait Selection Section */}
          <div className="bg-blue-700/50 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">$SAD PFP GENERATOR</h2>
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto mb-6 pb-2 gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-blue-500 text-white font-medium' 
                      : 'bg-blue-700/70 hover:bg-blue-600/70 text-white/80'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            {/* Only show the active category */}
            <div className="space-y-6">
              {activeCategory === 'background' && (
                <TraitSelector 
                  title="Background" 
                  options={traits.backgrounds}
                  selected={selectedTraits.background}
                  onChange={(value) => handleTraitChange('background', value)}
                />
              )}
              
              {activeCategory === 'face' && (
                <TraitSelector 
                  title="Face" 
                  options={traits.faces}
                  selected={selectedTraits.face}
                  onChange={(value) => handleTraitChange('face', value)}
                />
              )}
              
              {activeCategory === 'eyes' && (
                <TraitSelector 
                  title="Eyes" 
                  options={traits.eyes}
                  selected={selectedTraits.eyes}
                  onChange={(value) => handleTraitChange('eyes', value)}
                />
              )}
              
              {activeCategory === 'clothes' && (
                <TraitSelector 
                  title="clothes" 
                  options={traits.clothes}
                  selected={selectedTraits.clothes}
                  onChange={(value) => handleTraitChange('clothes', value)}
                />
              )}
              
              {activeCategory === 'accessory' && (
                <TraitSelector 
                  title="Accessory" 
                  options={traits.accessories}
                  selected={selectedTraits.accessory}
                  onChange={(value) => handleTraitChange('accessory', value)}
                />
              )}

              {activeCategory === 'hat' && (
                <TraitSelector 
                  title="Hat" 
                  options={traits.hats}
                  selected={selectedTraits.hat}
                  onChange={(value) => handleTraitChange('hat', value)}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;