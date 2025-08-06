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
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-gradient mb-4">
            Lokasi Acara
          </h2>
          <div className="ornament"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden shadow-lg">
            {/* Map Placeholder */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-wedding-primary/20 to-wedding-secondary/20 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-wedding-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair text-gray-800 mb-2">Balai Prajurit Pulanggeni</h3>
                <p className="text-gray-600 font-inter">Jl Perhentian Marpoyan, Marpoyan Damai, Pekanbaru</p>
              </div>
              
              {/* You can replace this with actual Google Maps embed */}
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            
            <div className="p-6 text-center">
              <Button 
                onClick={openGoogleMaps}
                className="bg-wedding-primary hover:bg-wedding-primary/90 text-white px-8 py-3 rounded-full font-inter"
                size="lg"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Buka di Google Maps
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}