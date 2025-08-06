'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function EventDetails() {
  const events = [
    {
      title: 'Akad Nikah',
      date: 'Minggu, 25 Desember 2024',
      time: '08.00 - 10.00 WIB',
      venue: 'Masjid Al-Ikhlas',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat',
      icon: '🕌'
    },
    {
      title: 'Resepsi',
      date: 'Minggu, 25 Desember 2024',
      time: '11.00 - 15.00 WIB',
      venue: 'Gedung Serbaguna Harmoni',
      address: 'Jl. Harmoni No. 456, Jakarta Pusat',
      icon: '🎉'
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-gradient mb-4">
            Detail Acara
          </h2>
          <div className="ornament"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{event.icon}</div>
                <h3 className="text-2xl font-playfair text-wedding-primary mb-6">
                  {event.title}
                </h3>
                
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5 text-wedding-primary" />
                    <span className="font-inter">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-5 h-5 text-wedding-primary" />
                    <span className="font-inter">{event.time}</span>
                  </div>
                  
                  <div className="flex items-start justify-center gap-3">
                    <MapPin className="w-5 h-5 text-wedding-primary mt-0.5" />
                    <div className="text-left">
                      <div className="font-semibold font-inter">{event.venue}</div>
                      <div className="text-sm text-gray-600 font-inter">{event.address}</div>
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