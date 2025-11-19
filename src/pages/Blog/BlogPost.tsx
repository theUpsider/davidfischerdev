import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { BlogService } from '../../services/blogService'
import { BlogPost as BlogPostType } from '../../types/blog'
import { useTheme } from '../../components/ThemeProvider'

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const data = await BlogService.getPostBySlug(slug)
          setPost(data || null)
        } catch (error) {
          console.error('Failed to fetch post', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchPost()
  }, [slug])

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>
  if (!post) return <div style={{ padding: '20px' }}>Post not found</div>

  return (
    <div style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
      <Helmet>
        <title>{post.title} | David Fischer</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <Link to="/blog" style={{ color: theme.palette.text.primary, textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        &larr; Back to Blog
      </Link>

      <article>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{post.title}</h1>
        <div style={{ color: theme.palette.text.accent, marginBottom: '30px', borderBottom: `1px solid ${theme.palette.foreground.primary}`, paddingBottom: '20px' }}>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span style={{ margin: '0 10px' }}>|</span>
          <span>{post.tags.join(', ')}</span>
        </div>

        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
      </article>
    </div>
  )
}

export default BlogPost
