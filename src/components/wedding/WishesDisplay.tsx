'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { WishData } from '@/lib/types'
import { Suspense } from 'react'
import { WishSkeleton } from '@/components/ui/loading'
import { FirebaseService } from '@/lib/firebase-service'
import { theme, getGradientClass } from '@/lib/theme'

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
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-neutral-800 mb-4">
            Ucapan & Doa
          </h2>
          <p className="text-neutral-600 font-light max-w-2xl mx-auto">
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
            <div className={`p-4 ${getGradientClass('subtle')} border border-error-200 rounded-xl text-error-700 text-center`}>
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Group Chat Style Wishes Display */}
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <Suspense fallback={<div className="text-center text-neutral-500">Loading wishes...</div>}>
              <div className="space-y-4">
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
              <div className={`${getGradientClass('subtle')} rounded-2xl shadow-md border border-primary-100 p-8`}>
                <h3 className="text-xl font-serif font-light text-neutral-700 mb-2">
                  Belum ada ucapan
                </h3>
                <p className="text-neutral-500 font-light">
                  Jadilah yang pertama memberikan ucapan dan doa untuk kami
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {wishes.map((wish, index) => (
                <motion.div
                  key={`${wish.createdAt.getTime()}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1
                  }}
                  viewport={{ once: true }}
                  className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-md ${index % 2 === 0 ? 'bg-white' : getGradientClass('card')} rounded-2xl shadow-sm border border-neutral-200 p-4 hover:shadow-md transition-shadow duration-200`}>
                    {/* Name and timestamp */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-primary-700 text-sm">
                        {wish.name}
                      </h3>
                      <span className="text-xs text-neutral-400">
                        {formatDate(wish.createdAt)}
                      </span>
                    </div>
                    
                    {/* Message */}
                    <p className="text-neutral-700 font-light leading-relaxed text-sm">
                      {wish.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}