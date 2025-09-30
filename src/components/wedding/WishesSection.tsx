'use client'
import { useState } from 'react'
import WishForm from './WishForm'
import WishesDisplay from './WishesDisplay'

export default function WishesSection() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleWishSubmitted = () => {
    // Trigger refresh of wishes display when a new wish is submitted
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="space-y-0">{/* No spacing between components for continuous flow */}
      {/* Form loads immediately */}
      <WishForm onWishSubmitted={handleWishSubmitted} />
      
      {/* Wishes display loads asynchronously */}
      <WishesDisplay refreshTrigger={refreshTrigger} />
    </div>
  )
}