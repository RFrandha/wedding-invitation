'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'

interface PhotoMosaicProps {
  side: 'left' | 'right'
}

interface PhotoItem {
  url: string
  scale: number
  rotation: number
  aspectRatio: string
}

export default function PhotoMosaic({ side }: PhotoMosaicProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [displayedPhotos, setDisplayedPhotos] = useState<PhotoItem[]>([])
  const [photoPool, setPhotoPool] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const lastLoadTimeRef = useRef<number>(0)
  const displayedPhotosRef = useRef<PhotoItem[]>([])

  // Master photo list - reliable Unsplash URLs
  const photos = [
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
  ]

  // Available aspect ratios for randomization
  const aspectRatios = [
    'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 
    'aspect-video', 'aspect-[5/4]', 'aspect-[3/2]'
  ]

  // Create randomized photo item
  const createPhotoItem = useCallback((url: string): PhotoItem => {
    return {
      url,
      scale: 0.8 + Math.random() * 0.6, // Random scale between 0.8 and 1.4
      rotation: (Math.random() - 0.5) * 30, // Limited rotation between -15 and 15 degrees
      aspectRatio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
    }
  }, [aspectRatios])

  // Get random photos from the master list
  const getRandomPhotos = useCallback((count: number, excludeUrls: string[] = []): string[] => {
    const availablePhotos = photos.filter(url => !excludeUrls.includes(url))
    const randomPhotos: string[] = []
    
    for (let i = 0; i < count && availablePhotos.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePhotos.length)
      const selectedPhoto = availablePhotos[randomIndex]
      randomPhotos.push(selectedPhoto)
      availablePhotos.splice(randomIndex, 1) // Remove to avoid duplicates in this batch
    }
    
    return randomPhotos
  }, [photos])

  // Initialize with random photos
  useEffect(() => {
    const initialPhotos = getRandomPhotos(6) // Start with 6 random photos
    const photoItems = initialPhotos.map(url => createPhotoItem(url))
    setDisplayedPhotos(photoItems)
    displayedPhotosRef.current = photoItems
    setPhotoPool([]) // No longer needed for shuffling
  }, []) // Remove dependencies to prevent infinite re-renders

  // Keep ref in sync with state
  useEffect(() => {
    displayedPhotosRef.current = displayedPhotos
  }, [displayedPhotos])

  // Load more photos on scroll with throttling
  const loadMorePhotos = useCallback(() => {
    const now = Date.now()
    
    // Throttle loading to prevent rapid consecutive loads (minimum 2.5 seconds between loads)
    if (isLoading || now - lastLoadTimeRef.current < 2500) {
      return
    }
    
    setIsLoading(true)
    lastLoadTimeRef.current = now
    
    // Add delay for smoother user experience
    setTimeout(() => {
      const loadCount = 2 + Math.floor(Math.random() * 2) // 2 or 3 photos
      const currentUrls = displayedPhotosRef.current.map(item => item.url)
      
      // Get random photos that aren't currently displayed
      const newPhotoUrls = getRandomPhotos(loadCount, currentUrls)
      const newPhotoItems = newPhotoUrls.map(url => createPhotoItem(url))
      
      setDisplayedPhotos(prev => [...prev, ...newPhotoItems])
      setIsLoading(false)
    }, 400) // 400ms delay for smoother fade-in
  }, [isLoading]) // Remove callback dependencies to prevent infinite re-renders

  // Scroll event handler with higher threshold
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Load more photos when user scrolls past 75% of the page (increased from 60%)
      if (scrolled > (documentHeight - viewportHeight) * 0.75) {
        loadMorePhotos()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePhotos])

  return (
    <div className={`absolute top-0 ${side}-0 w-80 min-h-screen bg-gradient-to-b from-sky-50/50 to-blue-50/50 backdrop-blur-sm border-r border-white/20 overflow-hidden z-10`}>
      {/* Header */}
      <div className="p-6 text-center border-b border-white/10">
        <h3 className="text-lg font-serif font-light text-slate-700 mb-2">
          {side === 'left' ? 'Memories' : 'Moments'}
        </h3>
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
      </div>

      {/* Photo Mosaic */}
      <div className="p-4 space-y-3 pb-20">
        {displayedPhotos.map((photoItem, index) => (
          <motion.div
            key={`${photoItem.url}-${index}`}
            initial={{ 
              opacity: 0, 
              x: side === 'left' ? -30 : 30,
              scale: 0.8,
              y: 20
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: photoItem.scale,
              y: 0
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ 
              rotateY: side === 'left' ? 8 : -8,
              z: 15,
              scale: photoItem.scale * 1.05
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`${photoItem.aspectRatio} rounded-lg overflow-hidden cursor-pointer relative group`}
            style={{
              transform: `rotate(${photoItem.rotation}deg)`
            }}
          >
            {/* Enhanced glow effect */}
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-sky-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-110 -z-10`} />
            
            <img
              src={photoItem.url}
              alt={`Pre-wedding photo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:brightness-110 group-hover:contrast-105"
              loading="lazy"
            />
            
            {/* Enhanced overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Heart icon overlay with enhanced animation */}
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div 
                  className="bg-white/95 rounded-full p-3 backdrop-blur-sm shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sky-50/80 to-transparent pointer-events-none" />
    </div>
  )
}