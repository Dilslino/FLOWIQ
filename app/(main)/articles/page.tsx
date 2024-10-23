import { db } from '@/lib/db'
import { ArticlesList } from '@/components/articles/articles-list'

export default async function ArticlesPage() {
  const articles = await db.article.findMany({
    where: {
      published: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Artikel</h1>
      <ArticlesList initialArticles={articles} />
    </div>
  )
}
