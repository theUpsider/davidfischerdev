import { MetadataRoute } from 'next'
import { getAllPosts } from './actions/blogActions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://davidfischer.dev'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/projects',
    '/projects/major-system',
    '/imprint',
    '/media',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8
  }))

  // Get all blog posts
  const posts = await getAllPosts()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [...staticPages, ...blogPages]
}
