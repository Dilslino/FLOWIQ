export interface Article {
  id: string
  title: string
  content: string
  slug: string
  published: boolean
  authorId: string
  createdAt: Date
  updatedAt: Date
}
