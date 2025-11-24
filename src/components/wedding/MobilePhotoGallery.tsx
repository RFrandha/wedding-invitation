'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { theme, hexToRgba } from '@/lib/theme'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

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
    'https://photos.rever.cyou/prewed-album/ZEN08529-Edit.jpg',
    'https://photos.rever.cyou/prewed-album/ZEN08467-Edit.jpg',
  ]

  // Split photos into chunks for 2 rows per slide (2x2 grid)
  const photosPerSlide = 4 // 2 rows x 2 columns
  const photoSlides = []
  for (let i = 0; i < photos.length; i += photosPerSlide) {
    photoSlides.push(photos.slice(i, i + photosPerSlide))
  }

  return (
    <section className="xl:hidden py-20 px-4" style={{ backgroundColor: theme.colors.primary[800] }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.05 }}
        className="text-center mb-6"
      >
        <h3 className="text-xl font-light text-white mb-2">
          Our Gallery
        </h3>
        <div 
          className="h-px" 
          style={{ 
            background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.5)}, transparent)` 
          }} 
        />
      </motion.div>

      {/* Mobile Photo Carousel - 2 rows with peek */}
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {photoSlides.map((slidePhotos, slideIndex) => (
            <CarouselItem key={slideIndex} className="pl-2 basis-[85%] sm:basis-[70%]">
              <div className="grid grid-cols-2 gap-3">
                {slidePhotos.map((photo, photoIndex) => (
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: photoIndex * 0.1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group shadow-lg"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={photo}
                        alt={`Pre-wedding photo ${slideIndex * photosPerSlide + photoIndex + 1}`}
                        fill
                        className="object-cover transition-all duration-300 group-hover:brightness-110"
                        sizes="(max-width: 640px) 45vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-8 sm:-left-12 hidden sm:flex" style={{ backgroundColor: hexToRgba(theme.colors.secondary[500], 0.8) }} />
        <CarouselNext className="-right-8 sm:-right-12 hidden sm:flex" style={{ backgroundColor: hexToRgba(theme.colors.secondary[500], 0.8) }} />
      </Carousel>
    </section>
  )
}
