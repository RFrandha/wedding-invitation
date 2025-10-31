'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { DecorativeLine } from '@/components/ui/decorative-line'
import { theme, hexToRgba, getBgColor } from '@/lib/theme'

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Ensure component is mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        
        setTimeLeft({ days, hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
      }
    }

    // Initial calculation
    calculateTimeLeft()
    
    // Set up interval
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, mounted])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="py-20 px-4 relative overflow-hidden" style={getBgColor(theme.colors.primary[800])}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl" style={getBgColor(theme.colors.secondary[500])}></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-3xl" style={getBgColor(theme.colors.secondary[400])}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Menuju Hari Bahagia
          </h2>
          <p className="text-white/80 font-light mb-12 max-w-2xl mx-auto">
            Waktu terus berjalan menuju momen yang paling dinanti. Mari bersama-sama menghitung detik menuju hari bahagia kami.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6 backdrop-blur-sm border-0 shadow-xl" style={{ ...getBgColor(theme.colors.primary[700], 0.3), borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold font-light mb-2" style={{ color: theme.colors.secondary[400] }}>
                    --
                  </div>
                  <div className="text-white/70 font-light text-sm md:text-base uppercase tracking-wide">
                    Loading...
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds }
  ]

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={getBgColor(theme.colors.primary[800])}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl" style={getBgColor(theme.colors.secondary[500])}></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-3xl" style={getBgColor(theme.colors.secondary[400])}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top Decorative Element */}
          <DecorativeLine variant="with-dots" className="mb-6" />

          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Menuju Hari Bahagia
          </h2>
          <p className="text-white/80 font-light mb-12 max-w-2xl mx-auto">
            Waktu terus berjalan menuju momen yang paling dinanti. Mari bersama-sama menghitung detik menuju hari bahagia kami.
          </p>
        </motion.div>

        {isExpired ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="p-8 text-white border-0 shadow-2xl" style={getBgColor(theme.colors.secondary[500])}>
              <h3 className="text-2xl font-serif font-light mb-2">🎉 Hari Bahagia Telah Tiba! 🎉</h3>
              <p className="font-light">Terima kasih atas doa dan dukungan Anda</p>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateX: 5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }
                }}
                className="relative group"
              >
                <Card className="p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group" style={{ ...getBgColor(theme.colors.primary[700], 0.3), backdropFilter: 'blur(12px)', borderColor: hexToRgba(theme.colors.secondary[500], 0.3) }}>
                  {/* Subtle overlay */}
                  <div className="absolute inset-0" style={getBgColor(theme.colors.secondary[500], 0.05)}></div>
                  
                  {/* Border accent effect */}
                  <div className="absolute inset-0 rounded-lg border-t-2 transition-colors duration-300" style={{ borderTopColor: 'transparent' }}></div>
                  
                  <div className="text-center relative z-10">
                    <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: theme.colors.secondary[400] }}>
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-white/70 font-light text-sm md:text-base uppercase tracking-wide">
                      {unit.label}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12"
        >
          <p className="text-white/60 font-light">
            {new Date(targetDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          {/* Bottom Decorative Element */}
          <DecorativeLine variant="with-ornament" className="mt-8" />
        </motion.div>
      </div>
    </section>
  )
}