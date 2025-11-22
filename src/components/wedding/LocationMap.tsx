'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Navigation } from 'lucide-react'
import { DecorativeLine } from '@/components/ui/decorative-line'
import { theme, hexToRgba, getBgColor } from '@/lib/theme'

type Location = 'pekanbaru' | 'bukittinggi'

interface LocationData {
  name: string
  address: string
  mapUrl: string
  embedUrl: string
}

const locations: Record<Location, LocationData> = {
  pekanbaru: {
    name: 'Balai Prajurit Pulanggeni',
    address: 'Jl Perhentian Marpoyan, Marpoyan Damai, Pekanbaru',
    mapUrl: 'https://maps.app.goo.gl/rSe2fwgKWjqESxmo6',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.689759923739!2d101.42348241151502!3d0.4599555637858805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a91bceae6673%3A0x7b85002e85b38269!2sBalai%20Prajurit%20Pulanggeni!5e0!3m2!1sen!2sid!4v1755594749564!5m2!1sen!2sid'
  },
  bukittinggi: {
    name: 'Bungo bed & breakfast workation',
    address: 'Jl Irigasi No 7, Gulai Bancah, Bukittinggi, Sumatera Barat',
    mapUrl: 'https://www.google.com/maps/place/Bungo+bed+%26+breakfast+workation/@-0.2888769,100.3729814,20z',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d333.73778397706116!2d100.37298139841779!3d-0.28887691886770844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd539d072d51fc7%3A0xcd227a1eecf18eaa!2sBungo%20bed%20%26%20breakfast%20workation!5e0!3m2!1sen!2sid!4v1763347671925!5m2!1sen!2sid'
  }
}

export default function LocationMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location>('pekanbaru')
  const currentLocation = locations[selectedLocation]

  const openGoogleMaps = () => {
    window.open(currentLocation.mapUrl, '_blank')
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={getBgColor(theme.colors.primary[800])}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 right-16 w-80 h-80 rounded-full blur-3xl" style={getBgColor(theme.colors.secondary[500])}></div>
        <div className="absolute bottom-16 left-16 w-80 h-80 rounded-full blur-3xl" style={getBgColor(theme.colors.secondary[400])}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-12"
        >
          {/* Top Decorative Element */}
          <DecorativeLine variant="with-dots" className="mb-6" />

          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-white mb-4">
            Lokasi Acara
          </h2>
          <p className="text-white/80 font-light max-w-2xl mx-auto">
            Kami akan sangat bahagia jika Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu di hari bahagia kami
          </p>

          {/* Location Switcher */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setSelectedLocation('pekanbaru')}
              className={`px-6 py-2 rounded-full font-light tracking-wide transition-all duration-300 ${
                selectedLocation === 'pekanbaru'
                  ? 'text-white shadow-lg'
                  : 'text-white/60 hover:text-white/80'
              }`}
              style={selectedLocation === 'pekanbaru' ? getBgColor(theme.colors.secondary[500]) : { backgroundColor: 'transparent', border: `1px solid ${hexToRgba(theme.colors.secondary[500], 0.3)}` }}
            >
              Pekanbaru
            </button>
            <button
              onClick={() => setSelectedLocation('bukittinggi')}
              className={`px-6 py-2 rounded-full font-light tracking-wide transition-all duration-300 ${
                selectedLocation === 'bukittinggi'
                  ? 'text-white shadow-lg'
                  : 'text-white/60 hover:text-white/80'
              }`}
              style={selectedLocation === 'bukittinggi' ? getBgColor(theme.colors.secondary[500]) : { backgroundColor: 'transparent', border: `1px solid ${hexToRgba(theme.colors.secondary[500], 0.3)}` }}
            >
              Bukittinggi
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="group px-4 sm:px-0"
        >
          <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500" style={{ ...getBgColor(theme.colors.primary[700], 0.3), backdropFilter: 'blur(12px)', borderColor: hexToRgba(theme.colors.secondary[500], 0.3) }}>
            {/* Embedded Google Maps */}
            <div className="h-64 md:h-80 relative overflow-hidden">
              <iframe
                  key={selectedLocation}
                  src={currentLocation.embedUrl}
                  width="100%"
                  height="100%"
                  style={{border: 0, filter: 'grayscale(20%) sepia(10%) saturate(120%) hue-rotate(200deg)'}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-t-lg"
                  title={`${currentLocation.name} Location`}
              />

              {/* Map overlay with location info */}
              <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4">
                <div className="text-white text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full mr-3">
                      <MapPin className="w-5 h-5"/>
                    </div>
                    <div className="text-left">
                      <h3 className="font-serif font-medium text-lg">
                        {currentLocation.name}
                      </h3>
                      <p className="text-sm opacity-90">
                        {currentLocation.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Decorative border */}
              <div className="absolute inset-0 border border-white/30 transition-colors duration-500 rounded-t-lg pointer-events-none"></div>
            </div>

            <div className="p-8 text-center" style={{ ...getBgColor(theme.colors.primary[700], 0.2), backdropFilter: 'blur(8px)' }}>
              <div className="space-y-4">
                <p className="text-white/70 font-light text-sm">
                  Klik tombol di bawah untuk membuka lokasi di Google Maps
                </p>

                <Button
                    onClick={openGoogleMaps}
                    className="hover:opacity-90 text-white px-8 py-4 rounded-full font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 group border-0"
                    style={getBgColor(theme.colors.secondary[500])}
                  size="lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                      <Navigation className="w-4 h-4 text-white" />
                    </div>
                    <span>Buka di Google Maps</span>
                  </div>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Decorative Element */}
        <DecorativeLine variant="with-ornament" className="mt-6" />
      </div>
    </section>
  )
}