'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Image from 'next/image'
import { theme, hexToRgba } from '@/lib/theme'

interface PhotoMosaicProps {
  side: 'left' | 'right'
}

interface PhotoItem {
  url: string
  scale: number
  rotation: number
  aspectRatio: string
  shape: 'square' | 'circle' | 'triangle' | 'hexagon' | 'diamond' | 'rectangle'
  size: 'small' | 'medium' | 'large'
  top: number
  left: number
}

export default function PhotoMosaic({ side }: PhotoMosaicProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [displayedPhotos, setDisplayedPhotos] = useState<PhotoItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const lastLoadTimeRef = useRef<number>(0)
  const displayedPhotosRef = useRef<PhotoItem[]>([])

  // Master photo list - local prewed photos
  const photos = useMemo(() => [
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
  ], [])

  // Available shapes for collage
  const shapes = useMemo<Array<'square' | 'circle' | 'rectangle'>>(() => [
    'square', 'circle', 'rectangle'
  ], [])
  
  // Size variations
  const sizes = useMemo<Array<'small' | 'medium' | 'large'>>(() => ['small', 'medium', 'large'], [])
  
  // Available aspect ratios for rectangles
  const aspectRatios = useMemo(() => [
    'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 
    'aspect-[3/2]', 'aspect-[2/3]', 'aspect-[16/9]'
  ], [])

  // Create randomized photo item with shape variety and stable position
  const createPhotoItem = useCallback((url: string, index: number): PhotoItem => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const size = sizes[Math.floor(Math.random() * sizes.length)]
    
    // Calculate stable position with 30% overlap - 1 photo per row
    // Average photo height based on bigger sizes
    const avgPhotoHeight = 240 // Average height in pixels (bigger photos)
    const overlapPercent = 0.1
    const verticalSpacing = avgPhotoHeight * (1 - overlapPercent) // 70% of height for spacing = 168px
    
    const row = index // 1 photo per row
    
    const baseTop = row * verticalSpacing
    const randomYOffset = (Math.random() - 0.5) * 40 // Random offset
    const topPosition = baseTop + randomYOffset
    
    // Center with horizontal variance
    const baseLeft = 70 // Centered in 320px sidebar
    const randomXOffset = (Math.random() - 0.5) * 60 // More horizontal variance
    const leftPosition = baseLeft + randomXOffset
    
    return {
      url,
      scale: 0.9 + Math.random() * 0.4,
      rotation: (Math.random() - 0.5) * 25, // More rotation for interest
      aspectRatio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)],
      shape,
      size,
      top: topPosition,
      left: leftPosition
    }
  }, [aspectRatios, shapes, sizes])

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

  // Get shape-specific CSS classes
  const getShapeClass = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'rounded-full'
      case 'triangle':
        return 'clip-triangle'
      case 'hexagon':
        return 'clip-hexagon'
      case 'diamond':
        return 'clip-diamond rotate-45'
      case 'rectangle':
        return 'rounded-lg'
      default:
        return 'rounded-xl'
    }
  }
  
  // Get size-specific dimensions - bigger sizes for single column
  const getSizeClass = (size: string, index: number) => {
    // Bigger varied sizes for single photo per row
    const patterns = [
      'w-56 h-64',  // Portrait
      'w-64 h-52',  // Landscape
      'w-60 h-60',  // Large square
      'w-52 h-68',  // Tall portrait
      'w-68 h-48',  // Wide landscape
      'w-56 h-56',  // Square
      'w-60 h-52',  // Medium landscape
      'w-52 h-60',  // Medium portrait
    ]
    return patterns[index % patterns.length]
  }


  // Keep ref in sync with state
  useEffect(() => {
    displayedPhotosRef.current = displayedPhotos
  }, [displayedPhotos])

  // Initialize with starting photos
  useEffect(() => {
    const initialPhotos = getRandomPhotos(12) // Start with 12 photos
    const photoItems = initialPhotos.map((url, idx) => createPhotoItem(url, idx))
    setDisplayedPhotos(photoItems)
    displayedPhotosRef.current = photoItems
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load more photos on scroll
  const loadMorePhotos = useCallback(() => {
    const now = Date.now()
    
    // Throttling (minimum 1200ms between loads for better performance)
    if (isLoading || now - lastLoadTimeRef.current < 1200) {
      return
    }
    
    setIsLoading(true)
    lastLoadTimeRef.current = now
    
    // Load 3 photos per batch (reduced for smoother performance)
    const loadCount = 3
    const currentLength = displayedPhotosRef.current.length
    
    // Get random photos (allow repeats for infinite scroll)
    const newPhotoUrls = getRandomPhotos(loadCount, [])
    const newPhotoItems = newPhotoUrls.map((url, idx) => createPhotoItem(url, currentLength + idx))
    
    setDisplayedPhotos(prev => [...prev, ...newPhotoItems])
    setIsLoading(false)
  }, [isLoading, createPhotoItem, getRandomPhotos])

  // Scroll event handler - load more photos as user scrolls (debounced)
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null
    
    const handleScroll = () => {
      // Debounce scroll events for better performance
      if (scrollTimeout) clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        const scrolled = window.scrollY
        const viewportHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const maxScroll = documentHeight - viewportHeight
        
        // Calculate scroll progress (0 to 1)
        const progress = maxScroll > 0 ? scrolled / maxScroll : 0
        
        // Load more photos when user scrolls down (fewer trigger points)
        if (progress > 0.5 || progress > 0.8) {
          loadMorePhotos()
        }
      }, 200) // 200ms debounce
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep ref in sync with state
  return (
    <div 
      className={`absolute top-0 ${side}-0 w-80 min-h-full z-0 overflow-visible`}
      style={{ 
        background: 'transparent'
      }}
    >
      {/* Photo Collage - Random positioning with scroll loading */}
      <div 
        className="relative w-full py-8"
        style={{
          minHeight: '100vh',
          height: `${Math.max(displayedPhotos.length * 40, window.innerHeight)}px` // Dynamic height based on photo count
        }}
      >
        {displayedPhotos.map((photoItem, index) => {
          const isDiamond = photoItem.shape === 'diamond'
          
          return (
          <motion.div
            key={`${photoItem.url}-${index}`}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              y: 30
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              rotate: photoItem.rotation
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.08,
              rotate: 0,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`${getSizeClass(photoItem.size, index)} cursor-pointer absolute group`}
            style={{
              top: `${photoItem.top}px`,
              left: `${photoItem.left}px`,
              zIndex: hoveredIndex === index ? 200 : 10 + index,
              transformOrigin: 'center center'
            }}
          >
            
            {/* Photo container with shape and gold border */}
            <div 
              className={`w-full h-full ${getShapeClass(photoItem.shape)} overflow-hidden relative shadow-2xl`}
              style={{
                background: theme.colors.secondary[400],
                padding: '0px',
                boxShadow: '0 15px 50px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.3)'
              }}
            >
              <div className={`w-full h-full ${getShapeClass(photoItem.shape)} overflow-hidden relative`}>
                <Image
                  src={photoItem.url}
                  alt={`Pre-wedding photo ${index + 1}`}
                  fill
                  className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                    isDiamond ? '-rotate-45' : ''
                  }`}
                  sizes="320px"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Gold accent border on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  border: `2px solid ${hexToRgba(theme.colors.secondary[400], 0.8)}`,
                  borderRadius: 'inherit'
                }}
              />
            </div>
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}
