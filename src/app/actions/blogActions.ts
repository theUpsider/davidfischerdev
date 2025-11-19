'use server'

import { readPosts, writePosts } from '@/lib/db'
import { generateSlug, generateId } from '@/lib/utils'
import { BlogPost } from '@/types/blog'
import { revalidatePath } from 'next/cache'

// Get all published posts (public)
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await readPosts()
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get all posts including drafts (admin only)
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const posts = await readPosts()
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await readPosts()
  const post = posts.find((p) => p.slug === slug)
  return post || null
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await readPosts()
  return posts
    .filter((post) => post.published && post.tags.includes(tag))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await readPosts()
  const lowerQuery = query.toLowerCase()

  return posts
    .filter((post) => {
      if (!post.published) return false

      const titleMatch = post.title.toLowerCase().includes(lowerQuery)
      const contentMatch = post.content.toLowerCase().includes(lowerQuery)
      const excerptMatch = post.excerpt.toLowerCase().includes(lowerQuery)
      const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))

      return titleMatch || contentMatch || excerptMatch || tagsMatch
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get all unique tags with post counts
export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await readPosts()
  const publishedPosts = posts.filter((post) => post.published)

  const tagCounts: Record<string, number> = {}
  publishedPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

// Create a new post (admin only)
export async function createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const posts = await readPosts()

  // Generate slug if not provided
  const slug = postData.slug || generateSlug(postData.title)

  // Check if slug already exists
  const existingPost = posts.find((p) => p.slug === slug)
  if (existingPost) {
    throw new Error('A post with this slug already exists')
  }

  const newPost: BlogPost = {
    ...postData,
    id: generateId(),
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  posts.push(newPost)
  await writePosts(posts)

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)

  return newPost
}

// Update a post (admin only)
export async function updatePost(postData: BlogPost): Promise<BlogPost> {
  const posts = await readPosts()
  const index = posts.findIndex((p) => p.id === postData.id)

  if (index === -1) {
    throw new Error('Post not found')
  }

  // Check if slug is being changed and if it conflicts
  if (posts[index].slug !== postData.slug) {
    const slugExists = posts.some((p) => p.id !== postData.id && p.slug === postData.slug)
    if (slugExists) {
      throw new Error('A post with this slug already exists')
    }
  }

  const updatedPost: BlogPost = {
    ...postData,
    updatedAt: new Date().toISOString()
  }

  posts[index] = updatedPost
  await writePosts(posts)

  revalidatePath('/blog')
  revalidatePath(`/blog/${updatedPost.slug}`)

  return updatedPost
}

// Delete a post (admin only)
export async function deletePost(id: string): Promise<void> {
  const posts = await readPosts()
  const filteredPosts = posts.filter((p) => p.id !== id)

  if (filteredPosts.length === posts.length) {
    throw new Error('Post not found')
  }

  await writePosts(filteredPosts)
  revalidatePath('/blog')
}

// Get a post by ID (admin only)
export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await readPosts()
  const post = posts.find((p) => p.id === id)
  return post || null
}
