import { pusherServer } from '@/lib/pusher'
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Definisikan tipe params yang benar
interface Params {
  id: string;
}

// Handler untuk PATCH request
export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const data = await request.json()
    
    const article = await db.article.update({
      where: { id: params.id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
    
    console.log('Triggering article update:', article.id)
    await pusherServer.trigger('flowiq-articles', 'article:update', article)
    
    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Gagal memperbarui artikel' }, 
      { status: 500 }
    )
  }
}

// Handler untuk DELETE request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await db.article.delete({
      where: { id: params.id }
    })
    
    console.log('Triggering article delete:', params.id)
    await pusherServer.trigger('flowiq-articles', 'article:delete', params.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus artikel' }, 
      { status: 500 }
    )
  }
}

// Metadata untuk route
export const dynamic = 'force-dynamic'
