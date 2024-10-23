'use client'

import { useState } from 'react'
import { useArticleRealtime } from '@/hooks/useArticleRealtime'
import { ArticleCard } from './article-card'
import { Article } from '@/types'
import { useToast } from '@/components/ui/use-toast'

interface ArticlesListProps {
  initialArticles: Article[]
}

export function ArticlesList({ initialArticles }: ArticlesListProps) {
  const [articles, setArticles] = useState(initialArticles)
  const { toast } = useToast()
  
  useArticleRealtime({
    onArticleCreate: (newArticle) => {
      setArticles((prev) => [newArticle, ...prev])
      toast({
        description: "Artikel baru telah ditambahkan",
      })
    },
    onArticleUpdate: (updatedArticle) => {
      setArticles((prev) =>
        prev.map((article) =>
          article.id === updatedArticle.id ? updatedArticle : article
        )
      )
      toast({
        description: "Artikel telah diperbarui",
      })
    },
    onArticleDelete: (articleId) => {
      setArticles((prev) => 
        prev.filter((article) => article.id !== articleId)
      )
      toast({
        description: "Artikel telah dihapus",
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: "Terjadi masalah koneksi"
      })
    }
  })

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
