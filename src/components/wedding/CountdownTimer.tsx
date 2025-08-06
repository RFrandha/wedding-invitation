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
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair text-wedding-primary mb-4">
              Menuju Hari Bahagia
            </h2>
            <p className="text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
              Waktu terus berjalan menuju momen yang paling dinanti. Mari bersama-sama menghitung detik menuju hari bahagia kami.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6 bg-white border-0 shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-wedding-primary font-inter mb-2">
                      --
                    </div>
                    <div className="text-gray-600 font-inter text-sm md:text-base uppercase tracking-wide">
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
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair text-wedding-primary mb-4">
              Menuju Hari Bahagia
            </h2>
            <p className="text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
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
              <Card className="p-8 bg-gradient-to-r from-wedding-primary to-wedding-secondary text-white">
                <h3 className="text-2xl font-playfair mb-2">🎉 Hari Bahagia Telah Tiba! 🎉</h3>
                <p className="font-inter">Terima kasih atas doa dan dukungan Anda</p>
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
                  className="relative"
                >
                  <Card className="p-6 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-wedding-primary font-inter mb-2">
                        {unit.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-gray-600 font-inter text-sm md:text-base uppercase tracking-wide">
                        {unit.label}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
  
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-500 font-inter mt-8"
          >
            {new Date(targetDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </motion.p>
        </div>
      </section>
    )
  }