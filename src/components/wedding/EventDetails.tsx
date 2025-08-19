'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function EventDetails() {
  const events = [
    {
      title: 'Akad Nikah',
      date: 'Minggu, 06 Desember 2025',
      time: '09.00 - 10.00 WIB',
      venue: 'Balai prajurit Pulanggeni Pekanbaru',
      address: 'Jl. Perhentian Marpoyan, Marpoyan Damai, Pekanbaru',
      icon: '🕌',
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      title: 'Resepsi',
      date: 'Minggu, 06 Desember 2025',
      time: '11.00 - 17.00 WIB',
      venue: 'Balai prajurit Pulanggeni Pekanbaru',
      address: 'Jl. Perhentian Marpoyan, Marpoyan Damai, Pekanbaru',
      icon: '🎉',
      gradient: 'from-blue-500 to-indigo-600'
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-slate-800 mb-4">
            Detail Acara
          </h2>
          <p className="text-slate-600 font-light max-w-2xl mx-auto">
            Dengan penuh kebahagiaan, kami mengundang Anda untuk turut merayakan momen bersejarah ini bersama kami
          </p>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-6">
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
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
              <Card className="p-8 text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-white/80 backdrop-blur-sm">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}></div>
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-sky-200/50 transition-colors duration-500"></div>
                
                {/* Floating particles effect */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${event.gradient}`}
                      style={{
                        left: `${20 + i * 12}%`,
                        top: `${30 + (i % 2) * 40}%`
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-8 filter drop-shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      rotateZ: 5,
                      y: -5,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 8
                      }
                    }}
                  >
                    {event.icon}
                  </motion.div>
                  
                  <h3 className="text-3xl font-serif font-medium text-transparent bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 bg-clip-text mb-6 tracking-wide">
                    {event.title}
                  </h3>
                  
                  {/* Decorative line under title */}
                  <div className={`h-0.5 bg-gradient-to-r ${event.gradient} rounded-full mx-auto w-16 mb-8 opacity-70`} />
                  
                  <div className="space-y-6 text-slate-700">
                    <div className="flex items-center justify-center gap-3 group-hover:text-sky-700 transition-colors duration-300">
                      <div className={`p-2 rounded-full bg-gradient-to-br ${event.gradient} text-white shadow-lg`}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="font-light">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 group-hover:text-sky-700 transition-colors duration-300">
                      <div className={`p-2 rounded-full bg-gradient-to-br ${event.gradient} text-white shadow-lg`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="font-light">{event.time}</span>
                    </div>
                    
                    <div className="flex items-start justify-center gap-3 group-hover:text-sky-700 transition-colors duration-300">
                      <div className={`p-2 rounded-full bg-gradient-to-br ${event.gradient} text-white shadow-lg mt-0.5`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium font-light">{event.venue}</div>
                        <div className="text-sm text-slate-500 font-light leading-relaxed mt-1">{event.address}</div>
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