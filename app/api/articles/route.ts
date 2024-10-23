import { pusherServer } from '@/lib/pusher'
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const article = await db.article.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    
    console.log('Triggering article create:', article.id)
    await pusherServer.trigger('flowiq-articles', 'article:create', article)
    
    return NextResponse.json(article)
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Gagal membuat artikel' }, 
      { status: 500 }
    )
  }
}
