'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Sparkles, Heart, Star } from 'lucide-react'
import CoverPage from '@/components/wedding/CoverPage'
import HeroSection from '@/components/wedding/HeroSection'
import EventDetails from '@/components/wedding/EventDetails'
import CountdownTimer from '@/components/wedding/CountdownTimer'
import LocationMap from '@/components/wedding/LocationMap'
import WishesSection from '@/components/wedding/WishesSection'
import PhotoMosaic from '@/components/wedding/PhotoMosaic'
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
    <main className="min-h-screen relative overflow-hidden scroll-smooth" style={getBgColor(theme.colors.primary[800])}>
      {/* Photo Mosaic Sidebars - Hidden on mobile */}
      <div className="hidden xl:block">
        <PhotoMosaic side="left" />
        <PhotoMosaic side="right" />
      </div>

      {/* Continuous Flow Layout Container */}
      <div className="relative space-y-0 xl:mx-80">
        {/* Hero Section */}
        <HeroSection />

        {/* Event Details - Continuous Flow */}
        <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2,
              type: "spring",
              stiffness: 60,
              damping: 15
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-20"
          >
            <EventDetails />
          </motion.div>

          {/* Countdown Timer - Continuous Flow */}
          <motion.div
            initial={{ opacity: 0, y: 120, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.4, 
              delay: 0.4,
              type: "spring",
              stiffness: 50,
              damping: 12
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-30"
          >
            <CountdownTimer targetDate={config.weddingDate} />
          </motion.div>

          {/* Location Map - Continuous Flow */}
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.6, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ 
              duration: 1.6, 
              delay: 0.6,
              type: "spring",
              stiffness: 45,
              damping: 10
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-40"
          >
            <LocationMap />
          </motion.div>

          {/* Wishes Section - Continuous Flow */}
          <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.8, 
              delay: 0.8,
              type: "spring",
              stiffness: 40,
              damping: 8
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-50"
          >
            <WishesSection />
          </motion.div>

          {/* Mobile Photo Mosaic - Only visible on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 250, scale: 0.3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 2.0, 
              delay: 1.0,
              type: "spring",
              stiffness: 35,
              damping: 6
            }}
            viewport={{ once: true, amount: 0.1 }}
              className="lg:hidden relative z-60 px-4 py-20"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-serif font-light text-white mb-2">
                  Our Memories
                </h3>
                <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.5)}, transparent)` }} />
              </div>
            
            {/* Mobile Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                `https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08483-Edit.jpg`,
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08467-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08457-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08434-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08433-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08429-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08426-2.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08385-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08485.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08489-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08499-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08502-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08518-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08529-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08550-2.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08550-2.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08550.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08601-Edit.jpg',
                'https://f005.backblazeb2.com/file/rv-prewed/prewed-album/ZEN08609-Edit.jpg',
              ].map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group bg-white p-2 shadow-lg"
                >
                  <img
                    src={photo}
                    alt={`Pre-wedding photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            audioUrl="/best_part.mp3"
            songTitle="Best Part"
            artist="Daniel Caesar"
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
                
                <h2 className="text-4xl md:text-5xl font-serif font-light mb-4" style={{ color: theme.colors.secondary[300] }}>
                  Terima Kasih
                </h2>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-20" style={getBgColor(theme.colors.secondary[500], 0.4)} />
                  <Sparkles className="w-5 h-5" style={{ color: theme.colors.secondary[400] }} />
                  <div className="h-px w-20" style={getBgColor(theme.colors.secondary[500], 0.4)} />
                </div>
              </div>

              {/* Greeting */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                <p className="text-xl md:text-2xl font-serif font-light tracking-wide mb-8 text-neutral-200">
                  Wassalamualaikum Wr. Wb.
                </p>
              </motion.div>
              
              {/* Family Names */}
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="backdrop-blur-md rounded-2xl p-6"
                    style={{ ...getBgColor('white', 0.05), borderWidth: '1px', borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}
                >
                  <div className="text-sm font-light mb-2" style={{ color: theme.colors.secondary[400] }}>Keluarga Besar</div>
                  <div className="text-xl font-serif font-medium text-white">{config.brideName.split(' ')[0]}</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-md rounded-2xl p-6"
                  style={{ ...getBgColor('white', 0.05), borderWidth: '1px', borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}
                >
                  <div className="text-sm font-light mb-2" style={{ color: theme.colors.secondary[400] }}>Keluarga Besar</div>
                  <div className="text-xl font-serif font-medium text-white">{config.groomName.split(' ')[0]}</div>
                </motion.div>
              </div>

              {/* Quote Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <div className="backdrop-blur-lg rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ ...getBgColor('white', 0.05), borderWidth: '1px', borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}>
                  <div className="absolute inset-0" style={getBgColor(theme.colors.secondary[600], 0.05)}></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-serif mb-4" style={{ color: hexToRgba(theme.colors.secondary[400], 0.4) }}>&ldquo;</div>
                    <p className="text-sm md:text-base text-white/80 font-light leading-relaxed mb-4 italic">
                      Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm font-light" style={{ color: hexToRgba(theme.colors.secondary[400], 0.8) }}>
                      <Star className="w-4 h-4" style={{ fill: hexToRgba(theme.colors.secondary[400], 0.5) }} />
                      <span>QS. Ar-Rum: 21</span>
                      <Star className="w-4 h-4" style={{ fill: hexToRgba(theme.colors.secondary[400], 0.5) }} />
                    </div>
                  </div>
                </div>
              </motion.div>

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