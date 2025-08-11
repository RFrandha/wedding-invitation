'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

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
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-slate-800 mb-4">
            Menuju Hari Bahagia
          </h2>
          <p className="text-slate-600 font-light mb-12 max-w-2xl mx-auto">
            Waktu terus berjalan menuju momen yang paling dinanti. Mari bersama-sama menghitung detik menuju hari bahagia kami.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-sky-600 font-light mb-2">
                    --
                  </div>
                  <div className="text-slate-600 font-light text-sm md:text-base uppercase tracking-wide">
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
    { label: 'Hari', value: timeLeft.days, gradient: 'from-sky-400 to-blue-500' },
    { label: 'Jam', value: timeLeft.hours, gradient: 'from-blue-500 to-indigo-500' },
    { label: 'Menit', value: timeLeft.minutes, gradient: 'from-indigo-500 to-blue-600' },
    { label: 'Detik', value: timeLeft.seconds, gradient: 'from-blue-600 to-sky-600' }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
      </div>

      {/* Elegant border frame */}
      <div className="absolute inset-6 border border-white/20 rounded-lg pointer-events-none">
        <div className="absolute inset-2 border border-white/15 rounded-md" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Top Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent flex-1 max-w-32" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-sky-400/60" />
              <div className="w-1 h-1 rounded-full bg-blue-500/60" />
              <div className="w-1 h-1 rounded-full bg-indigo-500/60" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent flex-1 max-w-32" />
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-light text-slate-800 mb-4">
            Menuju Hari Bahagia
          </h2>
          <p className="text-slate-600 font-light mb-12 max-w-2xl mx-auto">
            Waktu terus berjalan menuju momen yang paling dinanti. Mari bersama-sama menghitung detik menuju hari bahagia kami.
          </p>
        </motion.div>

        {isExpired ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-br from-sky-500 to-blue-600 text-white border-0 shadow-2xl">
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
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${unit.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-sky-200/50 transition-colors duration-300"></div>
                  
                  <div className="text-center relative z-10">
                    <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-br ${unit.gradient} bg-clip-text text-transparent mb-2`}>
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-slate-600 font-light text-sm md:text-base uppercase tracking-wide">
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
          viewport={{ once: true }}
          className="mt-12"
        >
          <p className="text-slate-500 font-light">
            {new Date(targetDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent flex-1 max-w-32" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-sky-400/60" />
              <div className="w-2 h-2 rounded-full bg-sky-400/60" />
              <div className="w-12 h-px bg-sky-400/60" />
              <div className="w-2 h-2 rounded-full bg-blue-500/60" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-500/60" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent flex-1 max-w-32" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}