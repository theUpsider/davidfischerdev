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
}

export interface BlogTag {
  name: string
  count: number
}

export interface User {
  username: string
  token: string
}
