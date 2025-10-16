'use client'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { theme, getGradientClass } from '@/lib/theme'

export default function HeroSection() {
  return (
      <section className={`min-h-screen ${getGradientClass('subtle')} flex items-center justify-center p-4 relative overflow-hidden`}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-secondary-500 to-accent-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Elegant border frame */}
        <div className="absolute inset-4 border border-primary-200/30 rounded-lg pointer-events-none z-0">
          <div className="absolute inset-2 border border-primary-100/20 rounded-md" />
        </div>

        <div className="max-w-6xl mx-auto text-center z-10 relative">
          {/* Top Decorative Element */}
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="flex items-center justify-center space-x-4 mb-8"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent flex-1 max-w-32" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-primary-400/60" />
              <div className="w-1 h-1 rounded-full bg-secondary-500/60" />
              <div className="w-1 h-1 rounded-full bg-accent-500/60" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent flex-1 max-w-32" />
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-sm font-light tracking-wider opacity-80 italic text-neutral-700 mb-2">
              Bismillahirrahmanirrahim
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-neutral-800 mb-6">
              The Wedding of
            </h1>

            <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
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
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/30 to-secondary-500/30 rounded-full blur-md transform scale-110"></div>
                <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-white/80 shadow-2xl relative z-10">
                  <AvatarImage
                      src="/verina.jpg"
                      alt="Verina Mardhatillah"
                      className="object-cover object-[50%_10%]"
                  />
                  <AvatarFallback className={`text-2xl font-serif bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-700`}>V</AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
              >
                <h3 className="text-2xl md:text-3xl font-serif font-light text-neutral-800 mb-2">
                  Verina Mardhatillah
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-secondary-400 to-transparent rounded-full mx-auto w-3/4 mb-3" />
                <p className="text-neutral-600 font-light leading-relaxed">
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
                className={`text-4xl md:text-6xl font-serif text-transparent ${getGradientClass('elegant')} bg-clip-text drop-shadow-sm`}
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-primary-500/30 rounded-full blur-md transform scale-110"></div>
                <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-white/80 shadow-2xl relative z-10">
                  <AvatarImage
                      src="/restow.jpg"
                      alt="Restow Frandha"
                      className="object-cover object-[70%_15%]"
                  />
                  <AvatarFallback className={`text-2xl font-serif ${getGradientClass('primary')} text-primary-700`}>R</AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
              >
                <h3 className="text-2xl md:text-3xl font-serif font-light text-neutral-800 mb-2">
                  Restow Frandha
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent rounded-full mx-auto w-3/4 mb-3" />
                <p className="text-neutral-600 font-light leading-relaxed">
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
              className="flex items-center justify-center space-x-4"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent flex-1 max-w-32" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary-400/60" />
              <div className="w-2 h-2 rounded-full bg-primary-400/60" />
              <div className="w-12 h-px bg-primary-400/60" />
              <div className="w-2 h-2 rounded-full bg-secondary-500/60" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-secondary-500/60" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-secondary-500/60 to-transparent flex-1 max-w-32" />
          </motion.div>
        </div>
      </section>
  )
}