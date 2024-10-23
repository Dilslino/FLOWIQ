interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h2 className="text-xl font-semibold">{article.title}</h2>
      <p className="mt-2 text-muted-foreground line-clamp-3">{article.content}</p>
      <div className="mt-4 text-sm text-muted-foreground">
        Diperbarui: {new Date(article.updatedAt).toLocaleDateString('id-ID')}
      </div>
    </div>
  )
}
