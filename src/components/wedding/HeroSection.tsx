'use client'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern - Enhanced */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-300 to-sky-400 rounded-full blur-2xl"></div>
      </div>

      {/* Elegant border frame */}
      <div className="absolute inset-4 border border-white/30 rounded-lg pointer-events-none z-0">
        <div className="absolute inset-2 border border-white/20 rounded-md" />
      </div>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        {/* Top Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-center justify-center space-x-4 mb-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent flex-1 max-w-32" />
          <div className="flex space-x-1">
            <div className="w-1 h-1 rounded-full bg-sky-400/60" />
            <div className="w-1 h-1 rounded-full bg-blue-500/60" />
            <div className="w-1 h-1 rounded-full bg-indigo-500/60" />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent flex-1 max-w-32" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-sm font-light tracking-wider opacity-80 italic text-slate-700 mb-2">
            Bismillahirrahmanirrahim
          </p>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-slate-800 mb-6">
            The Wedding of
          </h1>
          
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
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
          {/* Groom */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200/50 to-blue-300/50 rounded-full blur-md transform scale-110"></div>
              <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-white/60 shadow-2xl relative z-10">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format" alt="Restow Frandha" />
                <AvatarFallback className="text-2xl font-serif bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700">R</AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif font-light text-slate-800 mb-2">
                Restow Frandha
              </h3>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full mx-auto w-3/4 mb-3" />
              <p className="text-slate-600 font-light leading-relaxed">
                Putra dari<br />
                Bapak Andi & Ibu Ilfita Onenda
              </p>
            </motion.div>
          </div>

          {/* Ampersand */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-4xl md:text-6xl font-serif text-transparent bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text drop-shadow-sm"
          >
            &
          </motion.div>

          {/* Bride */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-300/50 rounded-full blur-md transform scale-110"></div>
              <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-white/60 shadow-2xl relative z-10">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332e234?w=300&h=300&fit=crop&crop=face&auto=format" alt="Verina Mardhatillah" />
                <AvatarFallback className="text-2xl font-serif bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700">V</AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif font-light text-slate-800 mb-2">
                Verina Mardhatillah
              </h3>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full mx-auto w-3/4 mb-3" />
              <p className="text-slate-600 font-light leading-relaxed">
                Putri dari<br />
                Bapak Anveriyendi & Ibu Machdalena
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
          <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent flex-1 max-w-32" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-sky-400/60" />
            <div className="w-2 h-2 rounded-full bg-sky-400/60" />
            <div className="w-12 h-px bg-sky-400/60" />
            <div className="w-2 h-2 rounded-full bg-blue-500/60" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-500/60" />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent flex-1 max-w-32" />
        </motion.div>
      </div>
    </section>
  )
}