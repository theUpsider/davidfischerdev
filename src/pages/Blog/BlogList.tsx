import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BlogService } from '../../services/blogService'
import { BlogPost } from '../../types/blog'
import BlogCard from '../../components/Blog/BlogCard'
import { useTheme } from '../../components/ThemeProvider'

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await BlogService.getPosts()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
      <Helmet>
        <title>Blog | David Fischer</title>
        <meta name="description" content="Thoughts on software engineering, technology, and projects." />
      </Helmet>

      <h1 style={{ borderBottom: `1px solid ${theme.palette.foreground.primary}`, paddingBottom: '10px' }}>BLOG</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            backgroundColor: theme.palette.background.primary,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.foreground.primary}`
          }}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div>No posts found.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogList
