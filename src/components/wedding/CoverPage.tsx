import React, { useState, useEffect } from 'react';
import { Heart, Mail, Sparkles, Star } from 'lucide-react';

interface CoverPageProps {
  onOpen: () => void;
  groomName: string;
  brideName: string;
  weddingDate: Date;
}

export default function CoverPage ({ onOpen, groomName, brideName, weddingDate }: CoverPageProps) {
  const [isClient, setIsClient] = useState(false);
  
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
  }, []);

  const handleOpen = () => {
    alert('Opening wedding invitation...');
  };

  // Sample pre-wedding photos (using your provided URLs plus some backups)
  const preWeddingPhotos = [
    'https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/l1000377-y2_tZ0GX5/lemia-project_black-white-prewedding-studio_1.webp',
    'https://images.weddingku.com/images/upload/articles/images/u85ctg1srm7p41120191113.jpg',
    'https://images.weddingku.com/images/upload/articles/images/imd5gtr21ah141120191113.jpg',
    'https://assets.satumomen.com/images/posts/ide-foto-prewedding-hitam-5-1686106681.jpg',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop'
  ];

  // Create abstract bouncing photos with random trajectories
  const bouncingPhotos = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    photo: preWeddingPhotos[i % preWeddingPhotos.length],
    startX: Math.random() * 80 + 10, // Random start position (10% to 90%)
    startY: Math.random() * 80 + 10,
    velocityX: (Math.random() - 0.5) * 4, // Random velocity between -2 and 2
    velocityY: (Math.random() - 0.5) * 4,
    delay: Math.random() * 8, // Random delay up to 8 seconds
    duration: 20 + Math.random() * 15, // 20-35 second cycles
    scale: 0.7 + Math.random() * 0.4, // Random size
    rotation: Math.random() * 360, // Random initial rotation
    rotationSpeed: (Math.random() - 0.5) * 2, // Rotation during movement
    opacity: 0.15 + Math.random() * 0.15 // Random opacity between 15-30%
  }));

  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900">
      {/* Bouncing Pre-wedding Photos */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {bouncingPhotos.map((item) => (
            <div
              key={item.id}
              className="absolute transition-opacity duration-700 hover:opacity-60"
              style={{
                left: `${item.startX}%`,
                top: `${item.startY}%`,
                opacity: item.opacity,
                transform: `scale(${item.scale}) rotate(${item.rotation}deg)`,
                animation: `bounce-abstract-${item.id} ${item.duration}s infinite linear`,
                animationDelay: `${item.delay}s`
              }}
            >
              <div className="relative group">
                <img
                  src={item.photo}
                  alt={`Pre-wedding ${item.id + 1}`}
                  className="w-40 h-32 md:w-48 md:h-36 object-cover rounded-2xl shadow-2xl border-2 border-white/20 group-hover:border-pink-300/50 transition-all duration-500"
                  style={{
                    filter: 'grayscale(20%) sepia(10%) saturate(120%) brightness(0.8) contrast(1.1)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 rounded-2xl" />
                
                {/* Romantic overlay effects */}
                <div className="absolute inset-0 rounded-2xl bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating heart */}
                <div className="absolute -top-2 -right-2 opacity-80">
                  <Heart className="w-4 h-4 text-pink-400 fill-current animate-pulse" />
                </div>
                
                {/* Corner sparkles */}
                <div className="absolute -bottom-1 -left-1 opacity-60">
                  <Sparkles className="w-3 h-3 text-yellow-300 animate-ping" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating decorative elements */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {floatingElements.map((item) => (
            <div
              key={item.id}
              className="absolute text-white/30 animate-pulse"
              style={{
                left: item.left,
                top: item.top,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`
              }}
            >
              {item.id % 3 === 0 ? (
                <Heart className="w-4 h-4" />
              ) : item.id % 3 === 1 ? (
                <Sparkles className="w-3 h-3" />
              ) : (
                <Star className="w-3 h-3" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* CSS Animation Styles */}
      <style jsx>{`
        ${bouncingPhotos.map((item, index) => `
          @keyframes bounce-abstract-${index} {
            0% {
              transform: translate(0px, 0px) scale(${item.scale}) rotate(${item.rotation}deg);
            }
            12.5% {
              transform: translate(${item.velocityX * 15}vw, ${item.velocityY * 10}vh) scale(${item.scale * 1.1}) rotate(${item.rotation + item.rotationSpeed * 45}deg);
            }
            25% {
              transform: translate(${item.velocityX * 25}vw, ${item.velocityY * 20}vh) scale(${item.scale}) rotate(${item.rotation + item.rotationSpeed * 90}deg);
            }
            37.5% {
              transform: translate(${item.velocityX * 15}vw, ${item.velocityY * 30}vh) scale(${item.scale * 0.9}) rotate(${item.rotation + item.rotationSpeed * 135}deg);
            }
            50% {
              transform: translate(${item.velocityX * -10}vw, ${item.velocityY * 25}vh) scale(${item.scale * 1.05}) rotate(${item.rotation + item.rotationSpeed * 180}deg);
            }
            62.5% {
              transform: translate(${item.velocityX * -20}vw, ${item.velocityX * 15}vh) scale(${item.scale}) rotate(${item.rotation + item.rotationSpeed * 225}deg);
            }
            75% {
              transform: translate(${item.velocityY * -15}vw, ${item.velocityX * -10}vh) scale(${item.scale * 1.1}) rotate(${item.rotation + item.rotationSpeed * 270}deg);
            }
            87.5% {
              transform: translate(${item.velocityY * -5}vw, ${item.velocityX * -20}vh) scale(${item.scale * 0.95}) rotate(${item.rotation + item.rotationSpeed * 315}deg);
            }
            100% {
              transform: translate(0px, 0px) scale(${item.scale}) rotate(${item.rotation + item.rotationSpeed * 360}deg);
            }
          }
        `).join('')}
        
        /* Ensure photos bounce off screen edges */
        .absolute img {
          transition: filter 0.3s ease;
        }
        
        .absolute:hover img {
          filter: grayscale(0%) sepia(5%) saturate(140%) brightness(0.9) contrast(1.1) !important;
        }
      `}</style>

      {/* Elegant border frame */}
      <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none">
        <div className="absolute inset-2 border border-white/10 rounded-md" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center text-white space-y-8 bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 100%)'
          }}
        >
          
          {/* Decorative Top Element */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="w-1 h-1 rounded-full bg-white/40" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1" />
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
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wider text-white">
                {brideName}
              </h2>
              <div className="flex items-center justify-center space-x-6 my-4">
                <div className="h-px bg-white/30 w-16" />
                <Heart className="w-6 h-6" />
                <div className="h-px bg-white/30 w-16" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wider text-white">
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
              123 Anywhere St.<br />
              Any City, ST 12345
            </p>
          </div>

          {/* Decorative Middle Element */}
          <div className="flex justify-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/40" />
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <div className="w-12 h-px bg-white/40" />
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/40" />
            </div>
          </div>

          {/* Guest Name Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-sm font-light tracking-wide opacity-90 mb-3">
              Kepada Yth.
            </p>
            <div className="space-y-2">
              <p className="text-2xl font-serif font-semibold text-yellow-200 drop-shadow-md">
                {invitedName}
              </p>
              {/* Gold underline effect */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full mx-auto w-3/4" />
              
              {/* Only show input in demo mode */}
              {invitedName === 'Bapak/Ibu/Saudara/i' && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={invitedName}
                    onChange={(e) => setInvitedName(e.target.value)}
                    className="w-full text-center text-lg font-light tracking-wide bg-transparent border-b border-white/30 pb-2 focus:outline-none focus:border-white/60 transition-colors text-yellow-200"
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
            <button
              onClick={onOpen}
              className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-full font-light tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 group-hover:animate-pulse" />
                <span>Buka Undangan</span>
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              </div>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="w-1 h-1 rounded-full bg-white/40" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1" />
          </div>

        </div>
      </div>
    </div>
  );
};
