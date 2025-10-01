import React, { useState, useEffect } from 'react';
import { Heart, Mail, Sparkles, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-neutral-800 via-primary-900 to-primary-800">



      {/* Elegant border frame */}
      <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none">
        <div className="absolute inset-2 border border-white/10 rounded-md" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center text-white space-y-8 bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(59,130,246,0.1) 100%)'
          }}
        >
          
          {/* Decorative Top Element */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-primary-300/40 to-transparent flex-1" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-primary-300/40" />
              <div className="w-1 h-1 rounded-full bg-secondary-300/40" />
              <div className="w-1 h-1 rounded-full bg-accent-300/40" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary-300/40 to-transparent flex-1" />
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
            <h1 className="text-2xl font-light tracking-[0.2em] opacity-90">
              The Wedding of
            </h1>

            {/* Couple Names */}
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wider text-transparent bg-gradient-to-r from-primary-200 via-secondary-100 to-accent-200 bg-clip-text">
                {brideName}
              </h2>
              <div className="flex items-center justify-center space-x-6 my-4">
                <div className="h-px bg-primary-300/30 w-16" />
                <Heart className="w-6 h-6 text-primary-300" />
                <div className="h-px bg-primary-300/30 w-16" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wider text-transparent bg-gradient-to-r from-secondary-200 via-primary-100 to-primary-200 bg-clip-text">
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
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary-300/40" />
              <div className="w-2 h-2 rounded-full bg-primary-300/40" />
              <div className="w-12 h-px bg-primary-300/40" />
              <div className="w-2 h-2 rounded-full bg-secondary-300/40" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-secondary-300/40" />
            </div>
          </div>

          {/* Guest Name Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-sm font-light tracking-wide opacity-90 mb-3">
              Kepada Yth.
            </p>
            <div className="space-y-2">
              <p className="text-2xl font-serif font-semibold text-transparent bg-gradient-to-r from-primary-200 to-secondary-200 bg-clip-text drop-shadow-md">
                {invitedName}
              </p>
              {/* Themed underline effect */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent rounded-full mx-auto w-3/4" />
              
              {/* Only show input in demo mode */}
              {invitedName === 'Bapak/Ibu/Saudara/i' && (
                <div className="pt-2">
                  <Input
                    type="text"
                    value={invitedName}
                    onChange={(e) => setInvitedName(e.target.value)}
                    className="w-full text-center text-lg font-light tracking-wide bg-transparent border-b border-white/30 pb-2 focus:outline-none focus:border-sky-300/60 transition-colors text-transparent bg-gradient-to-r from-sky-200 to-blue-200 bg-clip-text"
                    placeholder="Enter guest name..."
                  />
                  <p className="text-xs opacity-70 italic mt-2">
                    (Demo: customize guest name, in real use this comes from URL ?name=GuestName)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Open Invitation Button */}
          <div className="pt-4">
            <Button
              onClick={onOpen}
              size="lg"
              className="group relative bg-gradient-to-r from-sky-500/20 to-blue-600/20 hover:from-sky-500/30 hover:to-blue-600/30 backdrop-blur-sm border border-sky-300/30 hover:border-sky-300/50 text-white px-8 py-4 rounded-full font-light tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
              
              <div className="flex items-center space-x-3 relative z-10">
                <div className="p-1 bg-sky-400/20 rounded-full group-hover:bg-sky-400/30 transition-colors duration-300">
                  <Mail className="w-4 h-4 group-hover:animate-pulse" />
                </div>
                <span className="font-medium">Buka Undangan</span>
                <div className="p-1 bg-blue-400/20 rounded-full group-hover:bg-blue-400/30 transition-colors duration-300">
                  <Sparkles className="w-3 h-3 group-hover:animate-spin" />
                </div>
              </div>
              
              {/* Enhanced button glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/10 via-blue-400/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Soft border highlight */}
              <div className="absolute inset-0 rounded-full border border-sky-200/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent flex-1" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-sky-300/40" />
              <div className="w-1 h-1 rounded-full bg-blue-300/40" />
              <div className="w-1 h-1 rounded-full bg-indigo-300/40" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent flex-1" />
          </div>

        </div>
      </div>
    </div>
  );
};