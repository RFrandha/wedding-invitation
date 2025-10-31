'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { theme, hexToRgba } from '@/lib/theme'

export default function MobilePhotoGallery() {
  const photos = [
    'https://photos.rever.cyou/prewed-album/ZEN08601-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08457-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08609-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08433-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08483-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08429-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08385-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08485.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08489-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08434-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08502-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08426-2.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08518-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08550-2.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08529-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08550.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08499-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08467-Edit.jpg',
  ]

  return (
    <section className="lg:hidden py-20 px-4" style={{ backgroundColor: theme.colors.primary[800] }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.05 }}
        className="text-center mb-6"
      >
        <h3 className="text-xl font-serif font-light text-white mb-2">
          Our Memories
        </h3>
        <div 
          className="h-px" 
          style={{ 
            background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.5)}, transparent)` 
          }} 
        />
      </motion.div>

      {/* Mobile Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group shadow-lg"
          >
            <div className="relative w-full h-full">
              <Image
                src={photo}
                alt={`Pre-wedding photo ${index + 1}`}
                fill
                className="object-cover transition-all duration-300 group-hover:brightness-110"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
