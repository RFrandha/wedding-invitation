'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { WishData } from '@/lib/types'
import { Suspense } from 'react'
import { WishSkeleton } from '@/components/ui/loading'
import { FirebaseService } from '@/lib/firebase-service'
import { DecorativeLine } from '@/components/ui/decorative-line'
import { theme, hexToRgba, getBgColor } from '@/lib/theme'

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

  const formatDate = (createdAt: Date) => {
    try {
      return createdAt.toLocaleDateString('id-ID', {
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
    <section className="pt-10 pb-20 px-4" style={getBgColor(theme.colors.primary[800])}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-center mb-16"
        >
          <DecorativeLine variant="with-dots" className="mb-6" />

          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-white mb-4">
            Ucapan & Doa
          </h2>
          <p className="text-white/80 font-light max-w-2xl mx-auto">
            Terima kasih atas ucapan dan doa yang telah diberikan
          </p>

          <DecorativeLine variant="with-ornament" className="mt-6" />
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="p-4 rounded-xl text-center" style={{ ...getBgColor(theme.colors.error[50], 0.8), borderWidth: '1px', borderColor: theme.colors.error[200], color: theme.colors.error[700] }}>
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scrollable Wishes Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.05 }}
            className="rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md"
            style={{ ...getBgColor(theme.colors.primary[700], 0.3), borderColor: hexToRgba(theme.colors.secondary[500], 0.3), borderWidth: '1px' }}
          >
            {/* Chat Header */}
            <div className="p-6 text-center" style={{ ...getBgColor(theme.colors.primary[700], 0.5), borderBottom: `1px solid ${hexToRgba(theme.colors.secondary[500], 0.2)}` }}>
              <h3 className="text-lg font-serif font-light text-white mb-2">
                Ucapan dari Tamu
              </h3>
              <p className="text-sm text-white/60">{wishes.length} ucapan</p>
            </div>

            {/* Scrollable Wishes Area */}
            <div 
              className="overflow-y-auto p-6 space-y-4 wishes-scrollbar"
              style={{ 
                maxHeight: '500px',
                scrollbarWidth: 'thin',
                scrollbarColor: `${hexToRgba(theme.colors.secondary[500], 0.3)} transparent`
              }}
            >
              {isLoading ? (
                <Suspense fallback={<div className="text-center text-white/50">Loading wishes...</div>}>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <WishSkeleton key={index} />
                    ))}
                  </div>
                </Suspense>
              ) : wishes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-block p-4 rounded-full mb-4" style={getBgColor(theme.colors.secondary[500], 0.2)}>
                    <span className="text-4xl">✨</span>
                  </div>
                  <h3 className="text-xl font-serif font-light text-white mb-2">
                    Belum ada ucapan
                  </h3>
                  <p className="text-white/60 font-light">
                    Jadilah yang pertama memberikan ucapan dan doa untuk kami
                  </p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <motion.div
                    key={`${wish.createdAt.getTime()}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Bubble Chat */}
                    <div 
                      className={`max-w-md rounded-2xl p-4 shadow-lg transform transition-all duration-200 hover:scale-[1.02] ${
                        index % 2 === 0 
                          ? 'rounded-tl-none' 
                          : 'rounded-tr-none'
                      }`}
                      style={{ 
                        ...getBgColor(index % 2 === 0 ? theme.colors.primary[600] : theme.colors.secondary[600], 0.4),
                        backdropFilter: 'blur(8px)',
                        borderColor: hexToRgba(theme.colors.secondary[400], 0.3),
                        borderWidth: '1px'
                      }}
                    >
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                          style={{ ...getBgColor(index % 2 === 0 ? theme.colors.secondary[500] : theme.colors.primary[500], 0.6), color: 'white' }}
                        >
                          {wish.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm">
                            {wish.name}
                          </h3>
                          <span className="text-xs text-white/50">
                            {formatDate(wish.createdAt)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Message */}
                      <p className="text-white/90 font-light leading-relaxed text-sm pl-11">
                        {wish.message}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Bottom Info */}
            <div className="p-4 text-center text-xs text-white/40" style={{ borderTop: `1px solid ${hexToRgba(theme.colors.secondary[500], 0.1)}` }}>
              Scroll untuk melihat lebih banyak ucapan
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}