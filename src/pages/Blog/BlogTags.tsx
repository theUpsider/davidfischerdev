import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { BlogService } from '../../services/blogService'
import { BlogPost } from '../../types/blog'
import BlogCard from '../../components/Blog/BlogCard'
import { useTheme } from '../../components/ThemeProvider'

const BlogTags: React.FC = () => {
  const { tag } = useParams<{ tag: string }>()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchPosts = async () => {
      if (tag) {
        try {
          const data = await BlogService.getPostsByTag(tag)
          setPosts(data)
        } catch (error) {
          console.error('Failed to fetch posts', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchPosts()
  }, [tag])

  return (
    <div style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
      <Helmet>
        <title>Posts tagged "{tag}" | David Fischer</title>
        <meta name="description" content={`Blog posts tagged with ${tag}`} />
      </Helmet>

      <Link to="/blog" style={{ color: theme.palette.text.primary, textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        &larr; Back to Blog
      </Link>

      <h1 style={{ borderBottom: `1px solid ${theme.palette.foreground.primary}`, paddingBottom: '10px' }}>
        TAG: {tag?.toUpperCase()}
      </h1>

      {loading ? (
        <div>Loading...</div>
      ) : posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div>No posts found with this tag.</div>
      )}
    </div>
  )
}

export default BlogTags
