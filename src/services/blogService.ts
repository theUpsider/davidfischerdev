import { BlogPost } from '../types/blog'

// Mock data
let posts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to my new Blog',
    slug: 'welcome-to-my-new-blog',
    content: 'This is the first post on my new blog. I will be writing about software development, technology, and my projects. Stay tuned!',
    excerpt: 'Introduction to the new blog.',
    tags: ['general', 'update'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'David Fischer',
    published: true
  },
  {
    id: '2',
    title: 'Understanding React Hooks',
    slug: 'understanding-react-hooks',
    content: 'React Hooks are a powerful feature that allows you to use state and other React features without writing a class. In this article, we will explore the most common hooks and how to use them.',
    excerpt: 'A deep dive into React Hooks.',
    tags: ['react', 'javascript', 'tutorial'],
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    author: 'David Fischer',
    published: true
  }
]

export const BlogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return posts.filter((p) => p.published).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  getAllPostsAdmin: async (): Promise<BlogPost[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return posts.find((p) => p.slug === slug)
  },

  getPostsByTag: async (tag: string): Promise<BlogPost[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return posts
      .filter((p) => p.published && p.tags.includes(tag))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  createPost: async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newPost: BlogPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    posts.push(newPost)
    return newPost
  },

  updatePost: async (post: BlogPost): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = posts.findIndex((p) => p.id === post.id)
    if (index !== -1) {
      posts[index] = { ...post, updatedAt: new Date().toISOString() }
      return posts[index]
    }
    throw new Error('Post not found')
  },

  deletePost: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    posts = posts.filter((p) => p.id !== id)
  }
}
