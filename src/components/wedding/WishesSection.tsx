'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Heart, Send, AlertCircle } from 'lucide-react'
import { WishData } from '@/lib/types'
import { Suspense } from 'react'
import { WishSkeleton } from '@/components/ui/loading'
import { FirebaseService } from '@/lib/firebase-service'

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishData[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })

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
  }, [])

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
      setError('Nama dan pesan tidak boleh kosong.')
      return
    }

    if (formData.name.trim().length > 100) {
      setError('Nama maksimal 100 karakter.')
      return
    }

    if (formData.message.trim().length > 500) {
      setError('Pesan maksimal 500 karakter.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const newWish = await FirebaseService.addWish(formData.name, formData.message)
      
      // Add to local state
      setWishes(prev => [newWish, ...prev])
      
      // Reset form
      setFormData({ name: '', message: '' })
      
      // Show success message
      setSuccessMessage('Terima kasih! Ucapan Anda telah berhasil dikirim.')
      
    } catch (error) {
      console.error('Error adding wish:', error)
      setError('Gagal mengirim ucapan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-wedding-primary mb-4">
            Berikan Ucapan & Doa
          </h2>
          <p className="text-gray-600 font-inter max-w-2xl mx-auto">
            Kehadiran dan doa restu dari Anda merupakan karunia yang sangat berarti bagi kami.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Wish Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-inter flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  {successMessage}
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-inter flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-inter font-medium">
                      Nama Anda <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="font-inter"
                      required
                      maxLength={100}
                    />
                    <p className="text-xs text-gray-500 font-inter">
                      {formData.name.length}/100 karakter
                    </p>
                  </div>
                  <div className="md:hidden"></div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-inter font-medium">
                    Ucapan & Doa <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis ucapan dan doa terbaik untuk kedua mempelai..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-[120px] font-inter resize-none"
                    required
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 font-inter">
                    {formData.message.length}/500 karakter
                  </p>
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                    className="bg-wedding-primary hover:bg-wedding-primary/90 text-white px-8 py-3 rounded-full font-inter disabled:opacity-50 transition-all duration-300"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Kirim Ucapan
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>

          {/* Wishes List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-playfair text-center mb-8 text-gray-800">
              Ucapan dari Tamu Undangan
            </h3>
            
            <Suspense fallback={
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => <WishSkeleton key={i} />)}
              </div>
            }>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-wedding-primary/20 scrollbar-track-gray-100">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, i) => <WishSkeleton key={i} />)}
                  </div>
                ) : wishes.length === 0 ? (
                  <Card className="p-6 text-center text-gray-500 font-inter">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Belum ada ucapan. Jadilah yang pertama memberikan ucapan!</p>
                  </Card>
                ) : (
                  wishes.map((wish, index) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-wedding-primary/10 flex items-center justify-center flex-shrink-0">
                            <Heart className="w-5 h-5 text-wedding-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-wedding-primary font-inter mb-1">
                              {wish.name}
                            </h4>
                            <p className="text-gray-700 leading-relaxed font-inter mb-2">
                              {wish.message}
                            </p>
                            <p className="text-xs text-gray-400 font-inter">
                              {wish.createdAt.toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}