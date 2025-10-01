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
import PhotoMosaic from '@/components/wedding/PhotoMosaic'
import { theme } from '@/lib/theme'

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
    <main className="min-h-screen relative overflow-hidden scroll-smooth">
      {/* Floating Background Elements with Parallax */}
      <motion.div 
        style={{ y: yBg }}
        className="fixed inset-0 pointer-events-none z-0"
      >

        {/* Dynamic gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary-200/15 via-primary-300/15 to-secondary-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-br from-secondary-200/10 via-accent-300/10 to-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-accent-200/15 via-primary-300/15 to-secondary-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
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
                <Heart className="w-4 h-4 text-accent-300/25" />
              ) : i % 3 === 1 ? (
                <Sparkles className="w-3 h-3 text-primary-200/25" />
              ) : (
                <Star className="w-3 h-3 text-secondary-200/25" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Photo Mosaic Sidebars - Hidden on mobile */}
      <div className="hidden lg:block">
        <PhotoMosaic side="left" />
        <PhotoMosaic side="right" />
      </div>

      {/* Enhanced Section Layouts */}
      <div className="relative z-10 mx-4 lg:mx-80">
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

        {/* Continuous Flow Layout Container */}
        <div className="relative space-y-0">
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
            className="lg:hidden relative z-60"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-serif font-light text-slate-700 mb-2">
                Our Memories
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
            </div>
            
            {/* Mobile Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
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
                'https://media.weddingz.in/images/6f798ce01007e6623c18d9c2881def1d/black-and-white-pre-wedding-shoot-romantic-creative-ideas-goa2.jpg',
              ].map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
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
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 backdrop-blur-md border border-white/20"
        style={{ opacity: showScrollToTop ? 1 : 0, pointerEvents: showScrollToTop ? 'auto' : 'none' }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
      
      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-neutral-800 via-primary-900 to-secondary-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary-400/25 to-secondary-500/25 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-secondary-400/25 to-accent-500/25 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-accent-400/20 rounded-full blur-3xl"
          />
        </div>

        {/* Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`
              }}
              animate={{
                opacity: [0, 1, 0],
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
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-400/25 to-blue-500/25 backdrop-blur-md border border-white/10 mb-8"
                >
                  <Heart className="w-8 h-8 text-sky-300" />
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 bg-gradient-to-r from-sky-200 via-blue-200 to-sky-100 bg-clip-text text-transparent">
                  Terima Kasih
                </h2>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent w-20" />
                  <Sparkles className="w-5 h-5 text-sky-300" />
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent w-20" />
                </div>
              </div>

              {/* Greeting */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                <p className="text-xl md:text-2xl font-serif font-light tracking-wide mb-8 bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent">
                  Wassalamualaikum Wr. Wb.
                </p>
              </motion.div>
              
              {/* Family Names */}
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-sky-300 text-sm font-light mb-2">Keluarga Besar</div>
                  <div className="text-xl font-serif font-medium text-white">{config.groomName.split(' ')[0]}</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-blue-300 text-sm font-light mb-2">Keluarga Besar</div>
                  <div className="text-xl font-serif font-medium text-white">{config.brideName.split(' ')[0]}</div>
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
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-purple-500/5"></div>
                  <div className="relative z-10">
                    <div className="text-6xl text-sky-200/30 font-serif mb-4">&ldquo;</div>
                    <p className="text-sm md:text-base text-white/80 font-light leading-relaxed mb-4 italic">
                      Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sky-300/60 text-sm font-light">
                      <Star className="w-4 h-4" />
                      <span>QS. Ar-Rum: 21</span>
                      <Star className="w-4 h-4" />
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
                <div className="h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent w-20" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-sky-300/60" />
                </motion.div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent w-20" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </footer>
    </main>
  )
}