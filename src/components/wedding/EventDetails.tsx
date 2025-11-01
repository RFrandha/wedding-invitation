'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { DecorativeLine } from '@/components/ui/decorative-line'
import { theme, hexToRgba, getBgColor } from '@/lib/theme'

export default function EventDetails() {
  const events = [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 06 Desember 2025',
      time: '09.00 - 10.00 WIB',
      venue: 'Balai prajurit Pulanggeni Pekanbaru',
      address: 'Jl. Perhentian Marpoyan, Marpoyan Damai, Pekanbaru',
      icon: '🕌',
      gradient: theme.gradients.eventPrimary
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 06 Desember 2025',
      time: '11.00 - 17.00 WIB',
      venue: 'Balai prajurit Pulanggeni Pekanbaru',
      address: 'Jl. Perhentian Marpoyan, Marpoyan Damai, Pekanbaru',
      icon: '🎉',
      gradient: theme.gradients.eventSecondary
    }
  ]

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={getBgColor(theme.colors.primary[800])}>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          {/* Top Decorative Element */}
          <DecorativeLine variant="with-dots" className="mb-6" />

          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-white mb-4">
            Detail Acara
          </h2>
          <p className="text-white/80 font-light max-w-2xl mx-auto">
            Dengan penuh kebahagiaan, kami mengundang Anda untuk turut merayakan momen bersejarah ini bersama kami
          </p>

          {/* Bottom Decorative Element */}
          <DecorativeLine variant="with-ornament" className="mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 sm:px-0">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }
              }}
              className="group"
            >
              <Card className="p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden" style={{ ...getBgColor(theme.colors.primary[700], 0.3), backdropFilter: 'blur(12px)', borderColor: hexToRgba(theme.colors.secondary[500], 0.3) }}>
                {/* Subtle overlay */}
                <div className="absolute inset-0" style={getBgColor(theme.colors.secondary[500], 0.05)}></div>
                
                {/* Border accent effect */}
                <div className="absolute inset-0 rounded-lg border-t-2 transition-colors duration-500" style={{ borderTopColor: 'transparent' }}></div>
                
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-medium text-white mb-6 tracking-wide text-center">
                    {event.title}
                  </h3>
                  
                  {/* Decorative line under title */}
                  <div className="h-0.5 rounded-full mx-auto w-16 mb-8" style={getBgColor(theme.colors.secondary[400])} />
                  
                  <div className="space-y-6 text-white/90 max-w-xs mx-auto">
                    <div className="flex items-center gap-3 transition-colors duration-300">
                      <div className="p-2 rounded-full text-white shadow-lg" style={getBgColor(theme.colors.secondary[500])}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="font-light">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 transition-colors duration-300">
                      <div className="p-2 rounded-full text-white shadow-lg" style={getBgColor(theme.colors.secondary[500])}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="font-light">{event.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-3 transition-colors duration-300">
                      <div className="p-2 rounded-full text-white shadow-lg mt-0.5" style={getBgColor(theme.colors.secondary[500])}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium font-light">{event.venue}</div>
                        <div className="text-sm text-white/60 font-light leading-relaxed mt-1">{event.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}