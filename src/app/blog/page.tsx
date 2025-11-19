import { getAllPosts, getAllTags } from '@/app/actions/blogActions'
import { BlogListClient } from '@/components/Blog/BlogListClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles, tutorials, and insights on software engineering, web development, and modern JavaScript frameworks. Explore my thoughts on coding, architecture, and technology.',
  keywords: [
    'Software Engineering Blog',
    'Web Development Articles',
    'Programming Tutorials',
    'Tech Blog',
    'JavaScript',
    'TypeScript',
    'React'
  ],
  openGraph: {
    title: 'Blog | David Fischer',
    description:
      'Technical articles, tutorials, and insights on software engineering, web development, and modern JavaScript frameworks',
    type: 'website',
    url: 'https://davidfischer.dev/blog',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/blog-default.svg',
        width: 1200,
        height: 630,
        alt: 'David Fischer Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | David Fischer',
    description: 'Technical articles and insights on software engineering and web development',
    images: ['/images/og/blog-default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/blog'
  }
}

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()])

  return (
    <div className="blog-content">
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: 700,
          letterSpacing: '-1px'
        }}>
        BLOG
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          marginBottom: '3rem',
          opacity: 0.7
        }}>
        Thoughts on software engineering, technology, and my projects
      </p>

      <BlogListClient initialPosts={posts} tags={tags} />
    </div>
  )
}
