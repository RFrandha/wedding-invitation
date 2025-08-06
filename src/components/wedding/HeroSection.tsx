'use client'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-wedding-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-wedding-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-playfair text-gray-800 mb-6">
            Assalamualaikum Wr. Wb.
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-inter">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan 
            resepsi pernikahan putra-putri kami:
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
            >
              <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-wedding-primary/20">
                <AvatarImage src="/images/groom.jpg" alt="Restow Frandha" />
                <AvatarFallback className="text-2xl font-playfair bg-wedding-primary/10">R</AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-2xl md:text-3xl font-playfair text-gray-800 mb-2">
                Restow Frandha
              </h3>
              <p className="text-gray-600 font-inter">
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
            className="text-4xl md:text-6xl font-playfair text-wedding-primary"
          >
            &
          </motion.div>

          {/* Bride */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 border-4 border-wedding-secondary/20">
                <AvatarImage src="/images/bride.jpg" alt="Verina Mardhatillah" />
                <AvatarFallback className="text-2xl font-playfair bg-wedding-secondary/10">V</AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-playfair text-gray-800 mb-2">
                Verina Mardhatillah
              </h3>
              <p className="text-gray-600 font-inter">
                Putri dari<br />
                Bapak Anveriyendi & Ibu Machdalena
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}