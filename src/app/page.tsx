'use client'
import { useState, useEffect } from 'react'
import CoverPage from '@/components/wedding/CoverPage'
import HeroSection from '@/components/wedding/HeroSection'
import EventDetails from '@/components/wedding/EventDetails'
import CountdownTimer from '@/components/wedding/CountdownTimer'
import LocationMap from '@/components/wedding/LocationMap'
import WishesSection from '@/components/wedding/WishesSection'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [config, setConfig] = useState({
    weddingDate: new Date('2025-12-6T10:00:00'),
    groomName: 'Restow Frandha',
    brideName: 'Verina Mardhatillah'
  })
  
  // Load configuration from environment variables on client side
  useEffect(() => {
    const weddingDateStr = process.env.NEXT_PUBLIC_WEDDING_DATE || '2025-12-6T10:00:00'
      const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Restow Frandha'
      const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Verina Mardhatillah'
      
      setConfig({
        weddingDate: new Date(weddingDateStr),
        groomName,
        brideName
      })
    }, [])
    
    if (!isOpened) {
      return (
        <CoverPage 
          onOpen={() => setIsOpened(true)}
          groomName={config.groomName}
          brideName={config.brideName}
          weddingDate={config.weddingDate}
        />
      )
    }
    
    return (
      <main className="min-h-screen">
        <HeroSection />
        <EventDetails />
        <CountdownTimer targetDate={config.weddingDate} />
        <LocationMap />
        <WishesSection />
        
        {/* Footer */}
        <footer className="bg-gradient-to-r from-wedding-primary to-wedding-secondary text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg mb-4 font-playfair">Wassalamualaikum Wr. Wb.</p>
            <div className="space-y-2 text-sm opacity-90 font-inter">
              <p>Keluarga Besar {config.groomName.split(' ')[0]}</p>
              <p>Keluarga Besar {config.brideName.split(' ')[0]}</p>
            </div>
          </div>
        </footer>
      </main>
    )
  }