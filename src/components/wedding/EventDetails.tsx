'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin, CalendarPlus } from 'lucide-react'
import { DecorativeLine } from '@/components/ui/decorative-line'
import { theme, hexToRgba, getBgColor } from '@/lib/theme'

export default function EventDetails() {
  const generateCalendarLink = (event: typeof events[0]) => {
    const startDate = event.date === 'Sabtu, 06 Desember 2025' ? '20251206' : '20260326'
    const startTime = event.time.split(' - ')[0].replace('.', '').replace(' WIB', '')
    const endTime = event.time.split(' - ')[1].replace('.', '').replace(' WIB', '')
    
    const title = encodeURIComponent(event.title)
    const location = encodeURIComponent(`${event.venue}, ${event.address}`)
    const details = encodeURIComponent('Pernikahan kami')
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}T${startTime}00/${startDate}T${endTime}00&details=${details}&location=${location}`
  }
  const events = [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 06 Desember 2025',
      time: '09.00 - 10.00 WIB',
      venue: 'Balai Prajurit Pulanggeni Pekanbaru',
      address: 'Jl. Inpres, Pekanbaru, Riau',
      icon: '🕌',
      gradient: theme.gradients.eventPrimary
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 06 Desember 2025',
      time: '12.00 - 16.00 WIB',
      venue: 'Balai Prajurit Pulanggeni Pekanbaru',
      address: 'Jl. Inpres, Pekanbaru, Riau',
      icon: '🎉',
      gradient: theme.gradients.eventSecondary
    },
    {
      title: 'Resepsi',
      date: 'Kamis, 26 Maret 2026',
      time: '11.00 - 17.00 WIB',
      venue: 'Kediaman Mempelai Pria',
      address: 'Jl. Irigasi No 7, Gulai Bancah, Bukittinggi, Sumatera Barat',
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

          <h2 className="text-3xl md:text-4xl font-light tracking-wider text-white mb-4">
            Detail Acara
          </h2>
          <p className="text-white/80 font-light max-w-2xl mx-auto">
            Dengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk turut merayakan momen bersejarah ini bersama kami
          </p>
        </motion.div>

        {/* Pekanbaru Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
              Pekanbaru
            </h3>
            <div className="h-0.5 rounded-full mx-auto w-24" style={getBgColor(theme.colors.secondary[400])} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            {events.slice(0, 2).map((event, index) => (
              <motion.div
                key={event.title + index}
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
                    <h3 className="text-3xl font-medium text-white mb-6 tracking-wide text-center">
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
                    
                    <motion.a
                      href={generateCalendarLink(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light text-white transition-all duration-300 hover:scale-105"
                      style={getBgColor(theme.colors.secondary[500])}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CalendarPlus className="w-4 h-4" />
                      Add to Calendar
                    </motion.a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bukittinggi Event */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
              Bukittinggi
            </h3>
            <div className="h-0.5 rounded-full mx-auto w-24" style={getBgColor(theme.colors.secondary[400])} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            {events.slice(2).map((event, index) => (
              <motion.div
                key={event.title + index + 2}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
                className="group md:col-span-2 max-w-md mx-auto w-full"
              >
                <Card className="p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden" style={{ ...getBgColor(theme.colors.primary[700], 0.3), backdropFilter: 'blur(12px)', borderColor: hexToRgba(theme.colors.secondary[500], 0.3) }}>
                  {/* Subtle overlay */}
                  <div className="absolute inset-0" style={getBgColor(theme.colors.secondary[500], 0.05)}></div>
                  
                  {/* Border accent effect */}
                  <div className="absolute inset-0 rounded-lg border-t-2 transition-colors duration-500" style={{ borderTopColor: 'transparent' }}></div>
                  
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-medium text-white mb-6 tracking-wide text-center">
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
                    
                    <motion.a
                      href={generateCalendarLink(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light text-white transition-all duration-300 hover:scale-105"
                      style={getBgColor(theme.colors.secondary[500])}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CalendarPlus className="w-4 h-4" />
                      Add to Calendar
                    </motion.a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Bottom Decorative Element */}
      <DecorativeLine variant="with-ornament" className="mt-6" />
    </section>
  )
}
