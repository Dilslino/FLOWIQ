'use client'

import { useEffect } from 'react'
import { pusherClient } from '@/lib/pusher'
import { Article } from '@/types'

interface UseArticleRealtimeProps {
  onArticleCreate: (article: Article) => void
  onArticleUpdate: (article: Article) => void
  onArticleDelete: (articleId: string) => void
  onError?: (error: Error) => void
}

export function useArticleRealtime({ 
  onArticleCreate,
  onArticleUpdate, 
  onArticleDelete,
  onError 
}: UseArticleRealtimeProps) {
  useEffect(() => {
    const channel = pusherClient.subscribe('flowiq-articles')
    
    channel.bind('article:create', (article: Article) => {
      console.log('Received article create:', article)
      onArticleCreate(article)
    })

    channel.bind('article:update', (article: Article) => {
      console.log('Received article update:', article)
      onArticleUpdate(article)
    })

    channel.bind('article:delete', (articleId: string) => {
      console.log('Received article delete:', articleId)
      onArticleDelete(articleId)
    })

    channel.bind('pusher:subscription_succeeded', () => {
      console.log('Successfully subscribed to channel')
    })

    channel.bind('pusher:error', (error: Error) => {
      console.error('Pusher error:', error)
      onError?.(error)
    })

    return () => {
      channel.unbind_all()
      pusherClient.unsubscribe('flowiq-articles')
    }
  }, [onArticleCreate, onArticleUpdate, onArticleDelete, onError])
}
