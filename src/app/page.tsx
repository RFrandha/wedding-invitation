'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, Sparkles, Heart, Star } from 'lucide-react'
import CoverPage from '@/components/wedding/CoverPage'
import HeroSection from '@/components/wedding/HeroSection'
import EventDetails from '@/components/wedding/EventDetails'
import CountdownTimer from '@/components/wedding/CountdownTimer'
import LocationMap from '@/components/wedding/LocationMap'
import WishesSection from '@/components/wedding/WishesSection'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [config, setConfig] = useState({
    weddingDate: new Date('2025-12-6T10:00:00'),
    groomName: 'Restow Frandha',
    brideName: 'Verina Mardhatillah'
  })
  
  // Parallax scroll effects
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 1000], [0, -200])
  const yFloat = useTransform(scrollY, [0, 1000], [0, 50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])
  
  // Load configuration from environment variables on client side
  useEffect(() => {
    const weddingDateStr = process.env.NEXT_PUBLIC_WEDDING_DATE || '2025-12-6T10:00:00'
    const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Restow Frandha'
    const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Verina Mardhatillah'
    
    setConfig({
      weddingDate: new Date(weddingDateStr),
      groomName,
      brideName
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
        groomName={config.groomName}
        brideName={config.brideName}
        weddingDate={config.weddingDate}
      />
    )
  }
  
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating Background Elements with Parallax */}
      <motion.div 
        style={{ y: yBg }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        {/* Fade-in Pre-wedding Photos Background */}
        <div className="absolute inset-0">
          {[
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1594736797933-d0c62c7e4bc8?w=600&h=400&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&auto=format'
          ].map((photo, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + (i % 3) * 25}%`,
                top: `${20 + Math.floor(i / 3) * 40}%`,
                y: yFloat
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.15, 0.1, 0.15],
                scale: [0.8, 1, 0.9, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <img
                  src={photo}
                  alt={`Pre-wedding photo ${i + 1}`}
                  className="w-48 h-32 md:w-64 md:h-44 object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                  style={{
                    filter: 'grayscale(30%) sepia(20%) saturate(110%) brightness(0.7) contrast(1.1) hue-rotate(200deg)',
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-blue-500/15 to-indigo-600/25 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-sky-200/15 via-blue-300/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-br from-blue-300/10 via-indigo-400/10 to-sky-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-300/15 via-blue-400/15 to-sky-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                y: yFloat
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              {i % 3 === 0 ? (
                <Heart className="w-4 h-4 text-sky-300/25" />
              ) : i % 3 === 1 ? (
                <Sparkles className="w-3 h-3 text-blue-200/25" />
              ) : (
                <Star className="w-3 h-3 text-indigo-200/25" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Section Layouts */}
      <div className="relative z-10">
        {/* Hero Section with Enhanced Visual Depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-blue-50/60 to-indigo-100/80 backdrop-blur-sm" />
          <HeroSection />
        </motion.div>

        {/* Asymmetric Layout Container */}
        <div className="relative">
          {/* Event Details - Floating Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative z-20 transform -rotate-1 hover:rotate-0 transition-transform duration-500"
            style={{ marginLeft: '-2rem', marginRight: '4rem' }}
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-4">
              <EventDetails />
            </div>
          </motion.div>

          {/* Countdown Timer - Floating Right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative z-30 transform rotate-1 hover:rotate-0 transition-transform duration-500 -mt-20"
            style={{ marginLeft: '4rem', marginRight: '-2rem' }}
          >
            <div className="bg-gradient-to-br from-white/90 via-sky-50/80 to-blue-50/90 backdrop-blur-md rounded-3xl shadow-2xl border border-sky-200/40 p-4">
              <CountdownTimer targetDate={config.weddingDate} />
            </div>
          </motion.div>

          {/* Location Map - Center Floating */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative z-40 -mt-16 mx-4"
          >
            <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-4 transform hover:scale-105 transition-transform duration-300">
              <LocationMap />
            </div>
          </motion.div>

          {/* Wishes Section - Full Width Floating */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="relative z-50 -mt-12 mx-2"
          >
            <div className="bg-gradient-to-br from-white/90 via-blue-50/60 to-indigo-50/80 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200/30 p-4">
              <WishesSection />
            </div>
          </motion.div>
        </div>
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
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 backdrop-blur-md border border-white/20"
        style={{ opacity: showScrollToTop ? 1 : 0, pointerEvents: showScrollToTop ? 'auto' : 'none' }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl"></div>
        </div>

        {/* Elegant border frame */}
        <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none">
          <div className="absolute inset-2 border border-white/5 rounded-md" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Top Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-32" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-32" />
          </div>

          <p className="text-lg mb-6 font-serif font-light tracking-wide">
            Wassalamualaikum Wr. Wb.
          </p>
          
          <div className="space-y-3 text-sm opacity-90 font-light">
            <p>Keluarga Besar {config.groomName.split(' ')[0]}</p>
            <p>Keluarga Besar {config.brideName.split(' ')[0]}</p>
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 max-w-32" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-12 h-px bg-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/30" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 max-w-32" />
          </div>

          {/* Additional footer text */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-white/60 font-light">
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.&rdquo;
            </p>
            <p className="text-xs text-white/50 font-light mt-2">
              - QS. Ar-Rum: 21 -
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}