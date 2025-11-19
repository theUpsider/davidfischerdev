import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/app/actions/blogActions'
import { MarkdownRenderer } from '@/components/Blog/MarkdownRenderer'
import { calculateReadingTime } from '@/lib/utils'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const imagePath = post.featuredImage || '/images/og/blog-default.svg'
  const imageUrl = `https://davidfischer.dev${imagePath}`
  const postUrl = `https://davidfischer.dev/blog/${post.slug}`

  return {
    title: `${post.title}`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      url: postUrl,
      siteName: 'David Fischer',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt || post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      site: '@theUpsider',
      creator: '@theUpsider'
    },
    alternates: {
      canonical: postUrl
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const imagePath = post.featuredImage || '/images/og/blog-default.svg'
  const imageUrl = `https://davidfischer.dev${imagePath}`
  const postUrl = `https://davidfischer.dev/blog/${post.slug}`
  const readingTime = calculateReadingTime(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://davidfischer.dev/about'
    },
    publisher: {
      '@type': 'Person',
      name: 'David Fischer',
      url: 'https://davidfischer.dev'
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    articleSection: post.tags[0] || 'General',
    keywords: post.tags.join(', ')
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="blog-post">
        <div className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span> • </span>
            <span>{post.author}</span>
            <span> • </span>
            <span>{readingTime} min read</span>
          </div>
          {post.tags.length > 0 && (
            <div className="blog-tags">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag}`} className="blog-tag">
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        <MarkdownRenderer content={post.content} />

        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--blog-border)'
          }}>
          <Link
            href="/blog"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.9rem'
            }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    </>
  )
}
