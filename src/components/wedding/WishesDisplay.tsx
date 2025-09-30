'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Heart, AlertCircle, Sparkles } from 'lucide-react'
import { WishData } from '@/lib/types'
import { Suspense } from 'react'
import { WishSkeleton } from '@/components/ui/loading'
import { FirebaseService } from '@/lib/firebase-service'

interface WishesDisplayProps {
  refreshTrigger?: number
}

export default function WishesDisplay({ refreshTrigger = 0 }: WishesDisplayProps) {
  const [wishes, setWishes] = useState<WishData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch wishes using FirebaseService
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const wishesData = await FirebaseService.getWishes()
        setWishes(wishesData)
      } catch (error) {
        console.error('Error fetching wishes:', error)
        setError('Gagal memuat ucapan. Silakan muat ulang halaman.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishes()
  }, [refreshTrigger])

  // Clear error after some time
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 8000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Tanggal tidak valid'
    }
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Top Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1 max-w-32" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-6 h-6 text-purple-500/60" />
            </motion.div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1 max-w-32" />
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-slate-800 mb-4">
            Ucapan & Doa
          </h2>
          <p className="text-slate-600 font-light max-w-2xl mx-auto">
            Terima kasih atas ucapan dan doa yang telah diberikan
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl text-red-700 text-center">
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Wishes Display */}
        <div className="space-y-6">
          {isLoading ? (
            <Suspense fallback={<div className="text-center">Loading wishes...</div>}>
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <WishSkeleton key={index} />
                ))}
              </div>
            </Suspense>
          ) : wishes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/40 p-12 max-w-2xl mx-auto">
                <Heart className="w-16 h-16 text-purple-300 mx-auto mb-6" />
                <h3 className="text-xl font-serif font-light text-slate-700 mb-4">
                  Belum ada ucapan
                </h3>
                <p className="text-slate-500 font-light">
                  Jadilah yang pertama memberikan ucapan dan doa untuk kami
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:gap-8">
              {wishes.map((wish, index) => (
                <motion.div
                  key={`${wish.timestamp}-${index}`}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true, amount: 0.3 }}
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
                  <Card className="p-6 md:p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-white/80 backdrop-blur-sm">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:via-indigo-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                    
                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-purple-200/50 transition-colors duration-500"></div>
                    
                    {/* Floating particles effect */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                          style={{
                            left: `${20 + i * 20}%`,
                            top: `${20 + (i % 2) * 60}%`
                          }}
                          animate={{
                            y: [0, -15, 0],
                            opacity: [0.4, 1, 0.4],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5
                          }}
                        />
                      ))}
                    </motion.div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        >
                          <Heart className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                            <h3 className="font-serif font-medium text-lg text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text">
                              {wish.name}
                            </h3>
                            <span className="text-sm text-slate-400 font-light">
                              {formatDate(wish.timestamp)}
                            </span>
                          </div>
                          
                          {/* Decorative line under name */}
                          <div className="h-0.5 bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 rounded-full w-16 mb-6 opacity-60" />
                          
                          <blockquote className="text-slate-700 font-light leading-relaxed italic relative">
                            <span className="text-4xl text-purple-200/50 font-serif absolute -top-2 -left-2">&ldquo;</span>
                            <p className="relative z-10 pl-6">
                              {wish.message}
                            </p>
                            <span className="text-4xl text-purple-200/50 font-serif absolute -bottom-6 right-0">&rdquo;</span>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom decorative element */}
        {wishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mt-16"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent w-20" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-purple-300/60" />
            </motion.div>
            <div className="h-px bg-gradient-to-r from-transparent via-pink-300/30 to-transparent w-20" />
          </motion.div>
        )}
      </div>
    </section>
  )
}