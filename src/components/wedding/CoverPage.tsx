'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Heart, Mail, Sparkles } from 'lucide-react'

interface CoverPageProps {
  onOpen: () => void
  groomName: string
  brideName: string
  weddingDate: Date
}

const heartPositions = [
  { left: '10%', top: '20%' },
  { left: '85%', top: '15%' },
  { left: '20%', top: '70%' },
  { left: '90%', top: '80%' },
  { left: '15%', top: '45%' },
  { left: '75%', top: '60%' }
]

export default function CoverPage({ onOpen, groomName, brideName, weddingDate }: CoverPageProps) {
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  const invitedName = searchParams.get('name') || 'Tamu Undangan'

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-primary via-wedding-secondary to-wedding-primary flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Rotating circles */}
        <motion.div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"
          animate={isClient ? { rotate: 360 } : {}} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute top-32 right-16 w-16 h-16 border border-white rounded-full"
          animate={isClient ? { rotate: -360 } : {}} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute bottom-20 left-20 w-24 h-24 border border-white rounded-full"
          animate={isClient ? { rotate: 360 } : {}} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute bottom-32 right-10 w-12 h-12 border border-white rounded-full"
          animate={isClient ? { rotate: -360 } : {}} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
      </div>

      {/* Floating Hearts */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {heartPositions.map((pos, i) => (
            <motion.div key={i} className="absolute text-white/20" style={pos}
              animate={{ y: [-20, -40, -20], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}>
              <Heart className="w-4 h-4" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto px-6 text-center text-white relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
          
          {/* Wedding Icon */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }} className="flex justify-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <motion.div animate={isClient ? { rotate: [0, 10, -10, 0] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <Heart className="w-10 h-10 text-white fill-white/20" />
              </motion.div>
            </div>
          </motion.div>

          {/* Invitation Text */}
          <div className="space-y-4">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-lg font-inter tracking-wide">
              Bismillahirrahmanirrahim
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="text-3xl font-playfair font-bold relative">
              Undangan Pernikahan
              {isClient && (
                <motion.div className="absolute -top-2 -right-2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}>
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
              )}
            </motion.h1>

            {/* Guest Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative flex flex-col items-center space-y-2"
            >
              <p className="text-lg font-inter text-white/80">
                Kepada Yth.
              </p>
              <div className="relative">
                <p className="text-2xl font-playfair font-semibold text-wedding-secondary drop-shadow-md">
                  {invitedName}
                </p>
                {/* Gold underline */}
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-wedding-accent rounded-full mt-1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  style={{ transformOrigin: 'left' }}
                />
                {/* Sparkle effect */}
                <motion.div
                  className="absolute -top-4 -right-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="w-5 h-5 text-wedding-accent" />
                </motion.div>
              </div>
            </motion.div>
            

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }} className="space-y-2">
              <p className="text-2xl font-playfair font-semibold">{groomName}</p>
              <p className="text-2xl font-playfair font-semibold">&</p>
              <p className="text-2xl font-playfair font-semibold">{brideName}</p>
              <p className="text-sm font-inter opacity-90">
                {weddingDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </motion.div>
          </div>

          {/* Open Invitation Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onOpen} className="bg-white text-wedding-primary hover:bg-white/90 px-8 py-3 rounded-full font-inter font-semibold shadow-lg border-2 border-white/50 hover:shadow-xl transition-all duration-300" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Buka Undangan
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
