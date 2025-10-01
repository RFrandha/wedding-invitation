import { NextRequest, NextResponse } from 'next/server'
import { FirebaseService } from '@/lib/firebase-service'

// Enable edge runtime for better performance
export const runtime = 'nodejs'

export async function GET() {
  try {
    const wishes = await FirebaseService.getWishes()
    
    return NextResponse.json(wishes, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Error fetching wishes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body
    
    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }
    
    // Create wishData object with correct structure
    const wishData = {
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    }
    
    // Rate limiting could be added here
    const wish = await FirebaseService.addWish(wishData)
    
    return NextResponse.json(wish, { status: 201 })
  } catch (error) {
    console.error('Error adding wish:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to add wish' },
      { status: 500 }
    )
  }
}