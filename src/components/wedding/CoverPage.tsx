import React, { useState, useEffect } from 'react';
import { Heart, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { theme, getCardOverlayStyle } from '@/lib/theme';

interface CoverPageProps {
  onOpen: () => void;
  groomName: string;
  brideName: string;
  weddingDate: Date;
}

export default function CoverPage ({ onOpen, groomName, brideName, weddingDate }: CoverPageProps) {
  const [isClient, setIsClient] = useState(false);
  const [bouncingPhotos, setBouncingPhotos] = useState<any[]>([]);
  const [floatingElements, setFloatingElements] = useState<any[]>([]);
  
  // Get invited name from URL parameters (you can handle this in your parent component)
  const [invitedName, setInvitedName] = useState('Bapak/Ibu/Saudara/i');

  useEffect(() => {
    setIsClient(true);
    
    // Get invited name from URL parameters (similar to your original useSearchParams)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const nameFromUrl = urlParams.get('name');
      if (nameFromUrl) {
        setInvitedName(nameFromUrl);
      }
    }

    // Generate random data on client side only
    const generatedBouncingPhotos = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      photo: preWeddingPhotos[i % preWeddingPhotos.length],
      startX: Math.random() * 80 + 10,
      startY: Math.random() * 80 + 10,
      velocityX: (Math.random() - 0.5) * 4,
      velocityY: (Math.random() - 0.5) * 4,
      delay: Math.random() * 8,
      duration: 20 + Math.random() * 15,
      scale: 0.7 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: 0.15 + Math.random() * 0.15
    }));

    const generatedFloatingElements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3
    }));

    setBouncingPhotos(generatedBouncingPhotos);
    setFloatingElements(generatedFloatingElements);
  }, []);

  // Sample pre-wedding photos with enhanced modern wedding imagery
  const preWeddingPhotos = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIvMg6ZLVtyUqT1FHbkE8GJrd-EH0c7GBGA&s',
    'https://images.weddingku.com/images/upload/articles/images682/d28kb54aau0x41120191113.jpg',
    'https://alexandra.bridestory.com/image/upload/assets/l1000458-min-0I-Z6SATm.jpg',
    'https://i.pinimg.com/736x/32/85/ab/3285ab841670cc2bb1c680973ff07e14.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qX3nrHOmcuFcRkpv8ZyBx0n3H6hivlTMuA&s',
    'https://www.lesecretdaudrey.com/wp-content/uploads/2021/05/paris-pre-wedding-audrey-paris-photo-8-1200x1614.jpg',
    'https://thumbs.dreamstime.com/b/romantic-silhouette-couple-love-flowing-veil-stunning-prewedding-photoshoot-captivating-black-white-photo-338046548.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mYydYuiFcZeRrolZGQwuOYval2-TZlNDRA&s',
    'https://images.weddingku.com/images/upload/articles/images/u85ctg1srm7p41120191113.jpg',
    'https://bensonyin.com/main/wp-content/uploads/25-6940-post/paris_prewedding-1024x683.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKlwFJ-qsifFFTJT3zhssmE8fKXauDV4A8g&s',
    'https://media.weddingz.in/images/6f798ce01007e6623c18d9c2881def1d/black-and-white-pre-wedding-shoot-romantic-creative-ideas-goa2.jpg'
  ];


  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: theme.colors.primary[800] }}>
      {/* Background image for mobile - more visible */}
      <div 
        className="lg:hidden absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/hand1.jpg)',
          opacity: 0.35
        }}
      />
      {/* Dark overlay to maintain readability */}
      <div className="lg:hidden absolute inset-0 bg-black/40" />
      
      {/* Desktop Layout: Photo left (2/3), Card right (1/3) */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Photo (2/3 on desktop, hidden on mobile) */}
        <div className="hidden lg:block lg:w-2/3 relative overflow-hidden">
          <img
            src="/cover2.jpg"
            alt="Wedding couple"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay on photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary-800/60" style={{ background: `linear-gradient(to right, transparent 0%, transparent 70%, ${theme.colors.primary[800]} 100%)` }} />
        </div>

        {/* Right side - Card (1/3 on desktop, full width on mobile) */}
        <div className="relative z-20 lg:w-1/3 min-h-screen flex items-center justify-center p-6 lg:p-8">
          <div className="max-w-lg w-full text-center text-white space-y-8 bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
            style={getCardOverlayStyle()}
          >
          
          {/* Decorative Top Element */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-px flex-1" style={{ backgroundColor: theme.colors.secondary[500], opacity: 0.4 }} />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
            </div>
            <div className="h-px flex-1" style={{ backgroundColor: theme.colors.secondary[500], opacity: 0.4 }} />
          </div>

          {/* Islamic Opening */}
          <div className="space-y-2">
            <p className="text-sm font-light tracking-wider opacity-90 italic">
              Bismillahirrahmanirrahim
            </p>
            <p className="text-base font-light tracking-wide opacity-80">
              Kindly join us with our families for
            </p>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-xl font-light tracking-[0.2em] opacity-90">
              The Wedding of
            </h1>

            {/* Couple Names */}
            <div className="space-y-2">
              <h2 className={`text-4xl md:text-3xl font-serif font-light tracking-wider ${theme.gradients.textPrimary} bg-clip-text`}>
                {brideName}
              </h2>
              <div className="flex items-center justify-center space-x-6 my-4">
                <div className="h-px w-16" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />
                <Heart className="w-6 h-6" style={{ color: theme.colors.secondary[400], fill: theme.colors.secondary[400], opacity: 0.5 }} />
                <div className="h-px w-16" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />
              </div>
              <h2 className={`text-4xl md:text-4xl font-serif font-light tracking-wider ${theme.gradients.textSecondary} bg-clip-text`}>
                {groomName}
              </h2>
            </div>
          </div>

          {/* Wedding Date */}
          <div className="space-y-2">
            <p className="text-lg font-light tracking-wide">
              {weddingDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
            <p className="text-sm opacity-80">
              {weddingDate.toLocaleDateString('id-ID', { 
                weekday: 'long' 
              })}
            </p>
            <p className="text-sm opacity-80 font-light">
              Balai Prajurit Pulanggeni<br />
              Pekanbaru, Riau
            </p>
          </div>

          {/* Decorative Middle Element */}
          <div className="flex justify-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
              <div className="w-12 h-px" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
              <div className="w-8 h-px" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />
            </div>
          </div>

          {/* Guest Name Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6" style={{ borderColor: theme.colors.secondary[500], borderWidth: '1px'}}>
            <p className="text-sm font-light tracking-wide opacity-90 mb-3">
              Kepada Yth.
            </p>
            <div className="space-y-2">
              <p className={`text-2xl font-serif font-semibold ${theme.gradients.textPrimary} bg-clip-text drop-shadow-md`}>
                {invitedName}
              </p>
              {/* Themed underline effect */}
              <div className={`h-0.5 bg-gradient-to-r ${theme.gradients.decorativeLine} rounded-full mx-auto w-3/4`} />
            </div>
          </div>

          {/* Open Invitation Button */}
          <div className="pt-4">
            <Button
              onClick={onOpen}
              size="lg"
              className="group relative backdrop-blur-sm border text-white px-8 py-4 rounded-full font-light tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              style={{ 
                backgroundColor: `rgba(${parseInt(theme.colors.primary[600].slice(1,3), 16)}, ${parseInt(theme.colors.primary[600].slice(3,5), 16)}, ${parseInt(theme.colors.primary[600].slice(5,7), 16)}, 0.3)`,
                borderColor: theme.colors.primary[300],
              }}
            >
              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
              
              <div className="flex items-center space-x-3 relative z-10">
                <div className="p-1 rounded-full group-hover:opacity-80 transition-colors duration-300" style={{ backgroundColor: `rgba(${parseInt(theme.colors.secondary[500].slice(1,3), 16)}, ${parseInt(theme.colors.secondary[500].slice(3,5), 16)}, ${parseInt(theme.colors.secondary[500].slice(5,7), 16)}, 0.3)` }}>
                  <Mail className="w-4 h-4 text-white group-hover:animate-pulse" />
                </div>
                <span className="font-medium">Buka Undangan</span>
                <div className="p-1 rounded-full group-hover:opacity-80 transition-colors duration-300" style={{ backgroundColor: `rgba(${parseInt(theme.colors.secondary[500].slice(1,3), 16)}, ${parseInt(theme.colors.secondary[500].slice(3,5), 16)}, ${parseInt(theme.colors.secondary[500].slice(5,7), 16)}, 0.3)` }}>
                  <Sparkles className="w-3 h-3 text-white group-hover:animate-spin" />
                </div>
              </div>
            </Button>
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${theme.colors.secondary[400]}80, transparent)` }} />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.primary[300], opacity: 0.4 }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.primary[300], opacity: 0.4 }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.primary[300], opacity: 0.4 }} />
            </div>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${theme.colors.secondary[400]}80, transparent)` }} />
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};
