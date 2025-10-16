'use client'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DecorativeLine } from '@/components/ui/decorative-line'
import { theme, getBgColor } from '@/lib/theme'

export default function HeroSection() {
  return (
      <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={getBgColor(theme.colors.primary[800])}>
        {/* Background decorative elements */}
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
              className="mb-8"
          >
            <DecorativeLine variant="with-dots" />
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-sm font-light tracking-wider text-white opacity-90 italic mb-2">
              Bismillahirrahmanirrahim
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white mb-6">
              The Wedding of
            </h1>

            <p className="text-base md:text-lg text-white max-w-3xl mx-auto mb-12 leading-relaxed font-light opacity-80">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan
              resepsi pernikahan putra-putri kami
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12"
          >
            {/* Bride */}
            <div className="text-center">
              <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="relative"
              >
                <div className="absolute inset-0 rounded-full blur-md transform scale-110" style={getBgColor(theme.colors.secondary[400], 0.3)}></div>
                <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-white/80 shadow-2xl relative z-10">
                  <AvatarImage
                      src="/verina.jpg"
                      alt="Verina Mardhatillah"
                      className="object-cover object-[50%_10%]"
                  />
                  <AvatarFallback className="text-2xl font-serif" style={{ ...getBgColor(theme.colors.secondary[100]), color: theme.colors.secondary[700] }}>V</AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
              >
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-2">
                  Verina Mardhatillah
                </h3>
                <div className="h-0.5 rounded-full mx-auto w-16 mb-3" style={getBgColor(theme.colors.secondary[400])} />
                <p className="text-white/80 font-light leading-relaxed">
                  Putri dari<br />
                  Bapak Anveriyendi & Ibu Machdalena
                </p>
              </motion.div>
            </div>

            {/* Ampersand */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-4xl md:text-6xl font-serif drop-shadow-sm"
                style={{ color: theme.colors.secondary[400] }}
            >
              &
            </motion.div>

            {/* Groom */}
            <div className="text-center">
              <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="relative"
              >
                <div className="absolute inset-0 rounded-full blur-md transform scale-110" style={getBgColor(theme.colors.secondary[500], 0.2)}></div>
                <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-white/80 shadow-2xl relative z-10">
                  <AvatarImage
                      src="/restow.jpg"
                      alt="Restow Frandha"
                      className="object-cover object-[70%_15%]"
                  />
                  <AvatarFallback className="text-2xl font-serif" style={{ ...getBgColor(theme.colors.secondary[100]), color: theme.colors.secondary[700] }}>R</AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
              >
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-2">
                  Restow Frandha
                </h3>
                <div className="h-0.5 rounded-full mx-auto w-16 mb-3" style={getBgColor(theme.colors.secondary[500])} />
                <p className="text-white/80 font-light leading-relaxed">
                  Putra dari<br />
                  Bapak Andi & Ibu Ilfita Onenda
                </p>
              </motion.div>
            </div>

          </motion.div>

          {/* Bottom Decorative Element */}
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
          >
            <DecorativeLine variant="with-ornament" />
          </motion.div>
        </div>
      </section>
  )
}
