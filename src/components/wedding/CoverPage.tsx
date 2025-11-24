import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {Ampersand, Mail, Sparkles} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {theme, getCardOverlayStyle, writing} from '@/lib/theme';

interface CoverPageProps {
  onOpen: () => void;
  groomName: string;
  brideName: string;
  weddingDate: Date;
}

export default function CoverPage ({ onOpen, groomName, brideName, weddingDate }: CoverPageProps) {
  // Get invited name from URL parameters (you can handle this in your parent component)
  const [invitedName, setInvitedName] = useState('Bapak/Ibu/Saudara/i');

  // Get invited name from URL parameters (similar to your original useSearchParams)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const nameFromUrl = urlParams.get('name');
      if (nameFromUrl) {
        setInvitedName(nameFromUrl);
      }
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: theme.colors.primary[800] }}>
      {/* Background image for mobile - blur animation during fade-in */}
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(0px)' }}
        animate={{ opacity: 1, filter: 'blur(8px)' }}
        transition={{ 
          opacity: { duration: 0.5 },
          filter: { duration: 0.8, delay: 0.3 }
        }}
        className="lg:hidden absolute inset-0"
      >
        <Image
          src="https://photos.rever.cyou/pub-img/cover2.jpg"
          alt="Wedding background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      {/* Dark overlay to maintain readability */}
      <div className="lg:hidden absolute inset-0 bg-black/50" />
      
      {/* Desktop Layout: Photo left (2/3), Card right (1/3) */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Photo (2/3 on desktop, hidden on mobile) */}
        <div className="hidden lg:block lg:w-2/3 relative overflow-hidden">
          <Image
            src="https://photos.rever.cyou/pub-img/cover2.jpg"
            alt="Wedding couple"
            fill
            priority
            className="object-cover"
            sizes="66vw"
          />
          {/* Gradient overlay on photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary-800/60" style={{ background: `linear-gradient(to right, transparent 0%, transparent 70%, ${theme.colors.primary[800]} 100%)` }} />
        </div>

        {/* Right side - Card (1/3 on desktop, full width on mobile) */}
        <div className="relative z-20 lg:w-1/3 min-h-screen flex items-center justify-center p-6 lg:p-8">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-lg w-full text-center text-white bg-black/20 backdrop-blur-md rounded-2xl px-8 py-16 border border-white/10 shadow-2xl"
            style={getCardOverlayStyle()}
          >
          
          {/* Decorative Top Element */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px flex-1" style={{ backgroundColor: theme.colors.secondary[500], opacity: 0.4 }} />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />
            </div>
            <div className="h-px flex-1" style={{ backgroundColor: theme.colors.secondary[500], opacity: 0.4 }} />
          </div>

          {/* Main Title */}
          <div className="space-y-6 mt-8">
            <h1 className="text-xl md:text-2xl font-light tracking-[0.2em] opacity-90">
              THE WEDDING OF
            </h1>
            <br/>

            {/* Couple Names */}
            <div className="space-y-3">
              <h2 className={`${writing.className} text-5xl md:text-6xl font-medium tracking-wider ${theme.gradients.textPrimary} bg-clip-text`}>
                {brideName}
              </h2>
              <div className={`${writing.className} flex items-center justify-center space-x-6 my-1`}>
                <Ampersand className="w-6 h-6" style={{ color: theme.colors.secondary[400], opacity: 0.5 }} />
              </div>
              <h2 className={`${writing.className} text-5xl md:text-6xl font-medium tracking-wider ${theme.gradients.textSecondary} bg-clip-text`}>
                {groomName}
              </h2>
            </div>
          </div>
            {/* Decorative Top Element */}
            {/*<div className="flex items-center justify-center space-x-4 mb-8">*/}
            {/*  <div className="h-px flex-1" style={{ backgroundColor: theme.colors.secondary[500], opacity: 0.4 }} />*/}
            {/*  <div className="flex space-x-1">*/}
            {/*    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />*/}
            {/*    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />*/}
            {/*    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />*/}
            {/*  </div>*/}
            {/*  <div className="h-px flex-1" style={{ backgroundColor: theme.colors.secondary[500], opacity: 0.4 }} />*/}
            {/*</div>*/}

            {/* Decorative Middle Element */}
            {/*<div className="flex justify-center py-3">*/}
            {/*  <div className="flex items-center space-x-2">*/}
            {/*    <div className="w-8 h-px" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />*/}
            {/*    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />*/}
            {/*    <div className="w-12 h-px" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />*/}
            {/*    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.secondary[400] }} />*/}
            {/*    <div className="w-8 h-px" style={{ backgroundColor: theme.colors.secondary[400], opacity: 0.4 }} />*/}
            {/*  </div>*/}
            {/*</div>*/}

          {/* Wedding Date */}
          <div className="space-y-2 mt-16">
            <p className="text-xs md:text-lg font-light tracking-wide">
              {weddingDate.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long', 
                year: 'numeric'
              })}
            </p>
          </div>

          {/* Guest Name Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8" style={{ borderColor: theme.colors.secondary[500], borderWidth: '1px'}}>
            <p className="text-xs md:text-base font-light tracking-wide opacity-90 mb-3">
              Kepada Yth.
            </p>
            <div className="space-y-2">
              <p className={`text-lg md:text-2xl font-semibold ${theme.gradients.textPrimary} bg-clip-text drop-shadow-md break-words px-2`}>
                {invitedName}
              </p>
              {/* Themed underline effect */}
              <div className={`h-0.5 bg-gradient-to-r ${theme.gradients.decorativeLine} rounded-full mx-auto w-3/4`} />
            </div>
          </div>

          {/* Open Invitation Button */}
          <div className="mt-8">
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

          </motion.div>
        </div>
      </div>
    </div>
  );
};
