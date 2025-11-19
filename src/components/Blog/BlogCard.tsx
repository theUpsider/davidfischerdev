import React from 'react'
import Link from 'next/link'
import { BlogPost } from '../../types/blog'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="blog-card">
        <h2 className="blog-card-title">{post.title}</h2>
        <div className="blog-card-meta">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          {post.tags.length > 0 && (
            <span>
              {post.tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  {index > 0 && ', '}
                  {tag}
                </React.Fragment>
              ))}
            </span>
          )}
        </div>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-link">READ MORE &gt;</div>
      </div>
    </Link>
  )
}

export default BlogCard
