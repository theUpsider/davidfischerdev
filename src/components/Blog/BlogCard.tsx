import React from 'react'
import { Link } from 'react-router-dom'
import { BlogPost } from '../../types/blog'
import { useTheme } from '../ThemeProvider'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { theme } = useTheme()

  return (
    <div
      style={{
        border: `1px solid ${theme.palette.foreground.primary}`,
        padding: '20px',
        marginBottom: '20px',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
      }}>
      <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 style={{ marginTop: 0, marginBottom: '10px' }}>{post.title}</h2>
        <div style={{ fontSize: '0.8rem', color: theme.palette.text.accent, marginBottom: '10px' }}>
          {new Date(post.createdAt).toLocaleDateString()} | {post.tags.join(', ')}
        </div>
        <p style={{ lineHeight: '1.6' }}>{post.excerpt}</p>
        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>READ MORE &gt;</div>
      </Link>
    </div>
  )
}

export default BlogCard
