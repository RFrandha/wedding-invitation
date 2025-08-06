'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase-service'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Heart, Send } from 'lucide-react'
import { WishData } from '@/lib/types'
import { Suspense } from 'react'
import { WishSkeleton } from '@/components/ui/loading'

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishData[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })

  // Fetch wishes from Firebase
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        setIsLoading(true)
        const wishesQuery = query(
          collection(db, 'wishes'),
          orderBy('createdAt', 'desc')
        )
        const querySnapshot = await getDocs(wishesQuery)
        const wishesData: WishData[] = []
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          wishesData.push({
            id: doc.id,
            name: data.name,
            message: data.message,
            createdAt: data.createdAt.toDate()
          })
        })
        
        setWishes(wishesData)
      } catch (error) {
        console.error('Error fetching wishes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.message.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      const newWish = {
        name: formData.name.trim(),
        message: formData.message.trim(),
        createdAt: new Date()
      }

      const docRef = await addDoc(collection(db, 'wishes'), newWish)
      
      // Add to local state
      setWishes(prev => [{
        id: docRef.id,
        ...newWish
      }, ...prev])
      
      // Reset form
      setFormData({ name: '', message: '' })
      
    } catch (error) {
      console.error('Error adding wish:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Wish Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-inter font-medium">Nama Anda</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="font-inter"
                  required
                />
              </div>
              <div className="md:hidden"></div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="font-inter font-medium">Ucapan & Doa</Label>
              <Textarea
                id="message"
                placeholder="Tulis ucapan dan doa terbaik untuk kedua mempelai..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="min-h-[120px] font-inter resize-none"
                required
              />
            </div>
            
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                className="bg-wedding-primary hover:bg-wedding-primary/90 text-white px-8 py-3 rounded-full font-inter disabled:opacity-50"
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
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => <WishSkeleton key={i} />)}
              </div>
            ) : wishes.length === 0 ? (
              <Card className="p-6 text-center text-gray-500 font-inter">
                Belum ada ucapan. Jadilah yang pertama memberikan ucapan!
              </Card>
            ) : (
              wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-wedding-primary/10 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-wedding-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-wedding-primary font-inter mb-1">
                          {wish.name}
                        </h4>
                        <p className="text-gray-700 leading-relaxed font-inter">
                          {wish.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 font-inter">
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
  )
}