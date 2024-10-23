'use client'

import { useState } from 'react'
import { useArticleRealtime } from '@/hooks/useArticleRealtime'
import type { Article } from '@/types'

interface ArticlesListProps {
  initialArticles: Article[]
}

export function ArticlesList({ initialArticles }: ArticlesListProps) {
  const [articles, setArticles] = useState(initialArticles)

  useArticleRealtime({
    onArticleUpdate: (updatedArticle) => {
      setArticles((prev) =>
        prev.map((article) =>
          article.id === updatedArticle.id ? updatedArticle : article
        )
      )
    },
    onArticleDelete: (articleId) => {
      setArticles((prev) => 
        prev.filter((article) => article.id !== articleId)
      )
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
