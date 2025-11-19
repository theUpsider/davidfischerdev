import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/app/actions/blogActions'
import { MarkdownRenderer } from '@/components/Blog/MarkdownRenderer'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | David Fischer`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="blog-post">
        <div className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span> • </span>
            <span>{post.author}</span>
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

        <div style={{ 
          marginTop: '4rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--blog-border)' 
        }}>
          <Link href="/blog" style={{ 
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
