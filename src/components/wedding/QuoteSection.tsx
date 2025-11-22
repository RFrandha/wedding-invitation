'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { DecorativeLine } from '@/components/ui/decorative-line'
import { theme, getBgColor, hexToRgba } from '@/lib/theme'

export default function QuoteSection() {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={getBgColor(theme.colors.primary[900])}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://photos.rever.cyou/prewed-album/ZEN08499-Edit.jpg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={getBgColor(theme.colors.primary[900], 0.65)}></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={getBgColor(theme.colors.secondary[500], 0.3)}></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', ...getBgColor(theme.colors.secondary[400], 0.2) }}></div>
      </div>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        {/* Top Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-12"
        >
          <DecorativeLine variant="with-dots" />
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto px-4 sm:px-0"
        >
          <div className="backdrop-blur-lg rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ ...getBgColor('white', 0.05), borderWidth: '1px', borderColor: hexToRgba(theme.colors.secondary[500], 0.2) }}>
            <div className="absolute inset-0" style={getBgColor(theme.colors.secondary[600], 0.05)}></div>
            <div className="relative z-10">
              <div className="text-6xl font-serif mb-4" style={{ color: hexToRgba(theme.colors.secondary[400], 0.4) }}>&ldquo;</div>
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed mb-4 italic">
                Dan di antara tanda-tanda
                (kebesaran)-Nya ialah Dia
                menciptakan pasangan-pasangan untukmu dari
                jenismu sendiri, agar kamu
                cenderung dan merasa
                tenteram kepadanya, dan
                Dia menjadikan di antaramu
                rasa kasih dan sayang.
                Sungguh, pada yang demikian
                itu benar-benar terdapat
                tanda-tanda (kebesaran
                Allah) bagi kaum yang
                berpikir.
              </p>
              <div className="text-sm font-light" style={{ color: hexToRgba(theme.colors.secondary[400], 0.8) }}>
                (QS. Ar-Rum: 21)
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12"
        >
          <DecorativeLine variant="with-ornament" />
        </motion.div>
      </div>
    </section>
  )
}
