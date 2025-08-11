'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Navigation } from 'lucide-react'

export default function LocationMap() {
  const openGoogleMaps = () => {
    const mapsUrl = "https://www.google.com/maps/search/Balai+Prajurit+Pulanggeni+Pekanbaru"
    window.open(mapsUrl, '_blank')
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 right-16 w-80 h-80 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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
            Lokasi Acara
          </h2>
          <p className="text-slate-600 font-light max-w-2xl mx-auto">
            Kami akan sangat bahagia jika Anda berkenan hadir dan memberikan doa restu di hari bahagia kami
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="group"
        >
          <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm">
            {/* Map Placeholder */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-200/30 via-transparent to-blue-200/30"></div>
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-sky-300/20 to-blue-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl"></div>
              </div>
              
              <div className="text-center z-10 relative">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-full blur-lg transform scale-150"></div>
                  <div className="relative p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full shadow-xl">
                    <MapPin className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-3">
                  Balai Prajurit Pulanggeni
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mx-auto w-24 mb-4 opacity-70" />
                <p className="text-slate-600 font-light leading-relaxed px-4">
                  Jl Perhentian Marpoyan, Marpoyan Damai<br />Pekanbaru, Riau
                </p>
              </div>
              
              {/* Decorative border */}
              <div className="absolute inset-0 border border-white/30 group-hover:border-sky-200/50 transition-colors duration-500"></div>
            </div>
            
            <div className="p-8 text-center bg-gradient-to-br from-white to-sky-50/20">
              <div className="space-y-4">
                <p className="text-slate-600 font-light text-sm">
                  Klik tombol di bawah untuk membuka lokasi di Google Maps
                </p>
                
                <Button 
                  onClick={openGoogleMaps}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 group border-0"
                  size="lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <span>Buka di Google Maps</span>
                  </div>
                </Button>

                {/* Additional info */}
                <div className="mt-6 pt-4 border-t border-sky-100">
                  <p className="text-xs text-slate-500 font-light">
                    Tempat parkir tersedia • Mudah diakses dengan kendaraan umum
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}