'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Heart, Send, AlertCircle } from 'lucide-react'
import { FirebaseService } from '@/lib/firebase-service'
import { theme, getGradientClass } from '@/lib/theme'

interface WishFormProps {
  onWishSubmitted?: () => void
}

export default function WishForm({ onWishSubmitted }: WishFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })

  // Clear messages after some time
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 8000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.message.trim()) {
      setError('Mohon isi nama dan ucapan Anda.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const wishData = {
        name: formData.name.trim(),
        message: formData.message.trim(),
        timestamp: new Date().toISOString()
      }

      await FirebaseService.addWish(wishData)
      
      setSuccessMessage('Terima kasih! Ucapan Anda telah berhasil dikirim.')
      setFormData({ name: '', message: '' })
      
      // Notify parent component that a wish was submitted
      if (onWishSubmitted) {
        onWishSubmitted()
      }
    } catch (error) {
      console.error('Error submitting wish:', error)
      setError('Maaf, terjadi kesalahan saat mengirim ucapan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
            Kirim Ucapan & Doa
          </h2>
          <p className="text-neutral-600 font-light max-w-2xl mx-auto">
            Berikan ucapan dan doa terbaik untuk perjalanan baru kami
          </p>
        </motion.div>

        {/* Wish Form */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-8 md:p-12 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-primary-600/5 to-secondary-500/5"></div>
            
            <div className="relative z-10">
              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-success-50/80 border border-success-200 rounded-xl text-success-700 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>{successMessage}</span>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-error-50/80 border border-error-200 rounded-xl text-error-700 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Label htmlFor="name" className="text-neutral-700 font-light">
                    Nama Anda
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama Anda"
                    className="mt-2 border-neutral-200 focus:border-primary-400 focus:ring-primary-400/20 rounded-xl"
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Label htmlFor="message" className="text-neutral-700 font-light">
                    Ucapan & Doa
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tuliskan ucapan dan doa terbaik untuk kami..."
                    rows={4}
                    className="mt-2 border-neutral-200 focus:border-primary-400 focus:ring-primary-400/20 rounded-xl resize-none"
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Mengirim...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Kirim Ucapan</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}