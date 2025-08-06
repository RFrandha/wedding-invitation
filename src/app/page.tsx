'use client'
import { useState } from 'react'
import CoverPage from '@/components/wedding/CoverPage'
import HeroSection from '@/components/wedding/HeroSection'
import EventDetails from '@/components/wedding/EventDetails'
import CountdownTimer from '@/components/wedding/CountdownTimer'
import LocationMap from '@/components/wedding/LocationMap'
import WishesSection from '@/components/wedding/WishesSection'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  
  // Wedding configuration - customize these
  const weddingDate = new Date('2024-12-25T10:00:00')
  
  if (!isOpened) {
    return <CoverPage onOpen={() => setIsOpened(true)} />
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <EventDetails />
      <CountdownTimer targetDate={weddingDate} />
      <LocationMap />
      <WishesSection />
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-wedding-primary to-wedding-secondary text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-4 font-playfair">Wassalamualaikum Wr. Wb.</p>
          <div className="space-y-2 text-sm opacity-90 font-inter">
            <p>Keluarga Besar Ahmad & Fatimah</p>
            <p>Keluarga Besar Bambang & Siti</p>
          </div>
        </div>
      </footer>
    </main>
  )
}