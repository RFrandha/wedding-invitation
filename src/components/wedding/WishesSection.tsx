'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Heart, Send, AlertCircle, Sparkles } from 'lucide-react'
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
    <section className="py-20 px-4 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-300 to-sky-400 rounded-full blur-2xl"></div>
      </div>

      {/* Elegant border frame */}
      <div className="absolute inset-6 border border-white/20 rounded-lg pointer-events-none">
        <div className="absolute inset-2 border border-white/15 rounded-md" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Top Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent flex-1 max-w-32" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-sky-400/60" />
              <div className="w-1 h-1 rounded-full bg-blue-500/60" />
              <div className="w-1 h-1 rounded-full bg-indigo-500/60" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent flex-1 max-w-32" />
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-slate-800 mb-4">
            Berikan Ucapan & Doa
          </h2>
          <p className="text-slate-600 font-light max-w-2xl mx-auto">
            Kehadiran dan doa restu dari Anda merupakan karunia yang sangat berarti bagi kami
          </p>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent flex-1 max-w-32" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-sky-400/60" />
              <div className="w-2 h-2 rounded-full bg-sky-400/60" />
              <div className="w-12 h-px bg-sky-400/60" />
              <div className="w-2 h-2 rounded-full bg-blue-500/60" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-500/60" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent flex-1 max-w-32" />
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Wish Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-blue-50/30 pointer-events-none"></div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-lg border border-white/30 hover:border-sky-200/50 transition-colors duration-300"></div>
              
              <div className="relative z-10">
                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-lg text-green-700 text-sm font-light flex items-center gap-3"
                  >
                    <div className="p-1 bg-green-100 rounded-full">
                      <Heart className="w-4 h-4 text-green-600" />
                    </div>
                    {successMessage}
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/60 rounded-lg text-red-700 text-sm font-light flex items-center gap-3"
                  >
                    <div className="p-1 bg-red-100 rounded-full">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    {error}
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="font-light text-slate-700 tracking-wide">
                        Nama Anda <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Masukkan nama Anda"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="font-light border-sky-200/60 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm"
                        required
                        maxLength={100}
                      />
                      <p className="text-xs text-slate-500 font-light">
                        {formData.name.length}/100 karakter
                      </p>
                    </div>
                    <div className="md:hidden"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="message" className="font-light text-slate-700 tracking-wide">
                      Ucapan & Doa <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tulis ucapan dan doa terbaik untuk kedua mempelai..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="min-h-[120px] font-light resize-none border-sky-200/60 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm"
                      required
                      maxLength={500}
                    />
                    <p className="text-xs text-slate-500 font-light">
                      {formData.message.length}/500 karakter
                    </p>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                      className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-light tracking-wide disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl group border-0"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                              <Send className="w-4 h-4" />
                            </div>
                            <span>Kirim Ucapan</span>
                            <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                          </div>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>

          {/* Wishes List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif font-light text-slate-800 mb-3">
                Ucapan dari Tamu Undangan
              </h3>
              <div className="h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mx-auto w-24 opacity-70" />
            </div>
            
            <Suspense fallback={
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => <WishSkeleton key={i} />)}
              </div>
            }>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-sky-300/30 scrollbar-track-white/20">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, i) => <WishSkeleton key={i} />)}
                  </div>
                ) : wishes.length === 0 ? (
                  <Card className="p-8 text-center text-slate-500 font-light bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <div className="p-4 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-sky-600" />
                    </div>
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
                      <Card className="p-6 bg-white/90 backdrop-blur-sm border border-white/40 hover:border-sky-200/50 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:from-sky-200 group-hover:to-blue-200 transition-colors duration-300">
                            <Heart className="w-5 h-5 text-sky-600 group-hover:text-blue-600 transition-colors duration-300" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-transparent bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text font-light mb-2 text-lg">
                              {wish.name}
                            </h4>
                            <p className="text-slate-700 leading-relaxed font-light mb-3">
                              {wish.message}
                            </p>
                            <p className="text-xs text-slate-400 font-light">
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