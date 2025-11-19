import fs from 'fs'
import path from 'path'
import { BlogPost } from '../types/blog'

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Read all posts from JSON file
export async function readPosts(): Promise<BlogPost[]> {
  try {
    ensureDataDirectory()
    if (!fs.existsSync(DATA_FILE)) {
      return []
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// Write posts to JSON file
export async function writePosts(posts: BlogPost[]): Promise<void> {
  try {
    ensureDataDirectory()
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing blog posts:', error)
    throw error
  }
}

// Generate a URL-friendly slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Generate a unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
