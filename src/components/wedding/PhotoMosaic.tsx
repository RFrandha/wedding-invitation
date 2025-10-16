'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { theme, hexToRgba, getBgColor } from '@/lib/theme'

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
  const [isLoading, setIsLoading] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
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

  // Available aspect ratios for randomization - enhanced variety
  const aspectRatios = [
    'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 
    'aspect-video', 'aspect-[5/4]', 'aspect-[3/2]',
    'aspect-[2/3]', 'aspect-[16/9]', 'aspect-[9/16]',
    'aspect-[1/1]', 'aspect-[3/5]', 'aspect-[5/3]',
    'aspect-[4/5]', 'aspect-[7/5]'
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

  // Get random photos from the master list - with infinite repeat capability
  const getRandomPhotos = useCallback((count: number, excludeUrls: string[] = []): string[] => {
    let availablePhotos = photos.filter(url => !excludeUrls.includes(url))
    const randomPhotos: string[] = []
    
    // If no available photos (all have been used), reset to use all photos again
    if (availablePhotos.length === 0) {
      availablePhotos = [...photos]
    }
    
    for (let i = 0; i < count; i++) {
      // If we run out of available photos during this batch, reset and continue
      if (availablePhotos.length === 0) {
        availablePhotos = [...photos]
      }
      
      const randomIndex = Math.floor(Math.random() * availablePhotos.length)
      const selectedPhoto = availablePhotos[randomIndex]
      randomPhotos.push(selectedPhoto)
      availablePhotos.splice(randomIndex, 1) // Remove to avoid duplicates in this batch
    }
    
    return randomPhotos
  }, [photos])

  // Initialize with random photos
  useEffect(() => {
    const initialPhotos = getRandomPhotos(12) // Start with 12 random photos
    const photoItems = initialPhotos.map(url => createPhotoItem(url))
    setDisplayedPhotos(photoItems)
    displayedPhotosRef.current = photoItems
  }, []) // Remove dependencies to prevent infinite re-renders

  // Keep ref in sync with state
  useEffect(() => {
    displayedPhotosRef.current = displayedPhotos
  }, [displayedPhotos])

  // Load more photos on scroll with reduced throttling
  const loadMorePhotos = useCallback(() => {
    const now = Date.now()
    
    // Reduced throttling for smoother experience (minimum 600ms between loads)
    if (isLoading || now - lastLoadTimeRef.current < 600) {
      return
    }
    
    setIsLoading(true)
    lastLoadTimeRef.current = now
    
    // Load more photos for continuous scroll
    const loadCount = 3 + Math.floor(Math.random() * 2) // 3 or 4 photos per load
    const currentUrls = displayedPhotosRef.current.map(item => item.url)
    
    // Get random photos that aren't currently displayed
    const newPhotoUrls = getRandomPhotos(loadCount, currentUrls)
    const newPhotoItems = newPhotoUrls.map(url => createPhotoItem(url))
    
    setDisplayedPhotos(prev => [...prev, ...newPhotoItems])
    setIsLoading(false)
  }, [isLoading]) // Remove callback dependencies to prevent infinite re-renders

  // Scroll event handler - track scroll progress and load more photos continuously
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - viewportHeight
      
      // Calculate scroll progress (0 to 1)
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0
      setScrollProgress(progress)
      
      // Load more photos when user scrolls past 50% and keep loading at intervals
      if (progress > 0.5) {
        loadMorePhotos()
      }
      // Also load if user is near the bottom
      if (progress > 0.8) {
        loadMorePhotos()
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Trigger initial check
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePhotos])

  return (
    <div 
      className={`absolute top-0 ${side}-0 w-80 min-h-full backdrop-blur-md z-0`}
      style={{ 
        ...getBgColor(theme.colors.primary[800], 0.4),
        borderRight: side === 'left' ? `1px solid ${hexToRgba(theme.colors.secondary[500], 0.2)}` : 'none',
        borderLeft: side === 'right' ? `1px solid ${hexToRgba(theme.colors.secondary[500], 0.2)}` : 'none'
      }}
    >
      {/* Photo Mosaic - Scrolls naturally with page */}
      <div className="p-4 pt-8 space-y-4 pb-20">
        {displayedPhotos.map((photoItem, index) => {
          return (
          <motion.div
            key={`${photoItem.url}-${index}`}
            initial={{ 
              opacity: 0, 
              x: side === 'left' ? -30 : 30,
              scale: 0.9
            }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              scale: photoItem.scale
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.1,
              ease: "easeOut"
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
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-110 -z-10" style={getBgColor(theme.colors.secondary[400], 0.2)} />
            
            <img
              src={photoItem.url}
              alt={`Pre-wedding photo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:brightness-110 group-hover:contrast-105"
              loading="lazy"
            />
            {/* Enhanced overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}
