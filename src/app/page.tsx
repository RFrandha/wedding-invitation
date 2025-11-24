'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Sparkles, Heart, Star } from 'lucide-react'
import CoverPage from '@/components/wedding/CoverPage'
import QuoteSection from '@/components/wedding/QuoteSection'
import HeroSection from '@/components/wedding/HeroSection'
import EventDetails from '@/components/wedding/EventDetails'
import CountdownTimer from '@/components/wedding/CountdownTimer'
import LocationMap from '@/components/wedding/LocationMap'
import GiftSection from '@/components/wedding/GiftSection'
import WishesSection from '@/components/wedding/WishesSection'
import PhotoMosaic from '@/components/wedding/PhotoMosaic'
import MobilePhotoGallery from '@/components/wedding/MobilePhotoGallery'
import { theme, hexToRgba, getBgColor } from '@/lib/theme'
import MusicPlayer from '@/components/wedding/MusicPlayer'


export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [config, setConfig] = useState({
    weddingDate: new Date('2025-12-6T10:00:00'),
    groomName: 'Restow Frandha',
    brideName: 'Verina Mardhatillah',
    groomShortName: 'Restow',
    brideShortName: 'Verina',
  })
  
  // Load configuration from environment variables on client side
  useEffect(() => {
    const weddingDateStr = process.env.NEXT_PUBLIC_WEDDING_DATE || '2025-12-6T10:00:00'
    const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Restow Frandha'
    const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Verina Mardhatillah'
    const groomShortName = process.env.NEXT_PUBLIC_GROOM_SHORT_NAME || 'Restow'
    const brideShortName = process.env.NEXT_PUBLIC_BRIDE_SHORT_NAME || 'Verina'
    
    setConfig({
      weddingDate: new Date(weddingDateStr),
      groomName,
      brideName,
      groomShortName,
      brideShortName,
    })
  }, [])

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  if (!isOpened) {
    return (
      <CoverPage 
        onOpen={() => setIsOpened(true)}
        groomName={config.groomShortName}
        brideName={config.brideShortName}
        weddingDate={config.weddingDate}
      />
    )
  }
  
  return (
    <main className="min-h-screen relative overflow-hidden scroll-smooth" style={getBgColor(theme.colors.primary[900])}>
      {/* Photo Mosaic Sidebars - Hidden on mobile, darker background */}
      <div className="hidden xl:block">
        <PhotoMosaic side="left" />
        <PhotoMosaic side="right" />
      </div>

      {/* Continuous Flow Layout Container - Elevated effect */}
      <div className="relative space-y-0 xl:mx-80 xl:shadow-2xl xl:border-x" style={{ borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}>
        {/* Quote Section */}
        <QuoteSection />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Event Details - Continuous Flow */}
        <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 60,
              damping: 15
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-20"
          >
            <EventDetails />
          </motion.div>

          {/* Countdown Timer - Continuous Flow */}
          <motion.div
            initial={{ opacity: 0, y: 120, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.9, 
              type: "spring",
              stiffness: 50,
              damping: 12
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-30"
          >
            <CountdownTimer targetDate={config.weddingDate} />
          </motion.div>

          {/* Location Map - Continuous Flow */}
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.6, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ 
              duration: 1.0, 
              type: "spring",
              stiffness: 45,
              damping: 10
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-40"
          >
            <LocationMap />
          </motion.div>

          {/* Gift Section - Continuous Flow */}
          <motion.div
            initial={{ opacity: 0, y: 175, scale: 0.55 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.0, 
              type: "spring",
              stiffness: 42,
              damping: 9
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-45"
          >
            <GiftSection />
          </motion.div>

          {/* Wishes Section - Continuous Flow */}
          <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.0, 
              type: "spring",
              stiffness: 40,
              damping: 8
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-50"
          >
            <WishesSection />
          </motion.div>

          {/* Mobile Photo Gallery - Only visible on mobile */}
          <MobilePhotoGallery />
        </div>

      {/* Floating Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollToTop ? 1 : 0,
          scale: showScrollToTop ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50 p-4 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border border-white/20"
        style={{ ...getBgColor(theme.colors.secondary[500]), opacity: showScrollToTop ? 1 : 0, pointerEvents: showScrollToTop ? 'auto' : 'none' }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

        <MusicPlayer
            audioUrl="https://photos.rever.cyou/pub-img/like_it_was_meant_to_be.mp3"
            songTitle="Like It Was Meant To Be"
            artist="Vira Talisa"
            autoPlay={true}
        />
      
      {/* Footer */}
      <footer className="relative text-white overflow-hidden" style={getBgColor(theme.colors.primary[900])}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle glow effects */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl"
            style={getBgColor(theme.colors.secondary[500], 0.2)}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl"
            style={getBgColor(theme.colors.secondary[400], 0.15)}
          />
        </div>

        {/* Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                ...getBgColor(theme.colors.secondary[300]),
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <div className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {/* Elegant Header */}
              <div className="mb-12">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full backdrop-blur-md mb-8"
                  style={{ ...getBgColor(theme.colors.secondary[600], 0.2), borderWidth: '1px', borderColor: hexToRgba(theme.colors.secondary[400], 0.3) }}
                >
                  <Heart className="w-8 h-8" style={{ color: theme.colors.secondary[400] }} />
                </motion.div>
                
                <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ color: theme.colors.secondary[300] }}>
                  Terima Kasih
                </h2>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-20" style={getBgColor(theme.colors.secondary[500], 0.4)} />
                  <Sparkles className="w-5 h-5" style={{ color: theme.colors.secondary[400] }} />
                  <div className="h-px w-20" style={getBgColor(theme.colors.secondary[500], 0.4)} />
                </div>
              </div>

              {/* Thank You Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto px-4 sm:px-0"
              >
                <p className="text-xs md:text-lg text-white/90 font-light leading-relaxed text-center mb-6">
                  Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i
                  berkenan hadir dan memberikan do&apos;a restu kepada kami.
                </p>
              </motion.div>
              <br/>

              {/* Greeting */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                <p className="text-lg md:text-2xl font-light tracking-wide mb-8 text-neutral-200">
                  Wassalamualaikum Wr. Wb.
                </p>
              </motion.div>

              {/* Family Names */}
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12 px-4 sm:px-0">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-md rounded-2xl p-6"
                  style={{ ...getBgColor('white', 0.05), borderWidth: '1px', borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}
                >
                  <div className="text-xs md:text-sm font-light mb-2" style={{ color: theme.colors.secondary[400] }}>Keluarga Besar</div>
                  <div className="text-lg md:text-xl font-medium text-white">{config.brideName.split(' ')[0]}</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-md rounded-2xl p-6"
                  style={{ ...getBgColor('white', 0.05), borderWidth: '1px', borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}
                >
                  <div className="text-xs md:text-sm font-light mb-2" style={{ color: theme.colors.secondary[400] }}>Keluarga Besar</div>
                  <div className="text-lg md:text-xl font-medium text-white">{config.groomName.split(' ')[0]}</div>
                </motion.div>
              </div>

              {/* Bottom Decorative */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-6 mt-16"
              >
                <div className="h-px w-20" style={getBgColor(theme.colors.secondary[500], 0.3)} />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: hexToRgba(theme.colors.secondary[400], 0.8) }} />
                </motion.div>
                <div className="h-px w-20" style={getBgColor(theme.colors.secondary[500], 0.3)} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </footer>
    </main>
  )
}