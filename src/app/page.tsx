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
      <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl"></div>
        </div>

        {/* Elegant border frame */}
        <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none">
          <div className="absolute inset-2 border border-white/5 rounded-md" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Top Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-32" />
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-32" />
          </div>

          <p className="text-lg mb-6 font-serif font-light tracking-wide">
            Wassalamualaikum Wr. Wb.
          </p>
          
          <div className="space-y-3 text-sm opacity-90 font-light">
            <p>Keluarga Besar {config.groomName.split(' ')[0]}</p>
            <p>Keluarga Besar {config.brideName.split(' ')[0]}</p>
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 max-w-32" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-12 h-px bg-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/30" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 max-w-32" />
          </div>

          {/* Additional footer text */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-white/60 font-light">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
            </p>
            <p className="text-xs text-white/50 font-light mt-2">
              - QS. Ar-Rum: 21 -
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}