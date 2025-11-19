export type ContentTag = 'human-written' | 'ai-edited' | 'ai-generated'

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  tags: string[]
  createdAt: string
  updatedAt: string
  author: string
  published: boolean
  featuredImage?: string // Path to featured image, e.g., '/images/blog/post-1.png'
  featuredImageAlt?: string // Alt text for featured image
  contentTag?: ContentTag // Indicates how the content was created
}

export interface BlogTag {
  name: string
  count: number
}

export interface User {
  username: string
  token: string
}
