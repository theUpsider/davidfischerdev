import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BlogService } from '../../services/blogService'
import { BlogPost } from '../../types/blog'
import Button from '../../components/Button'
import { useTheme } from '../../components/ThemeProvider'

const BlogEditor: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: [],
    published: false,
    author: 'David Fischer'
  })

  useEffect(() => {
    if (slug) {
      loadPost()
    }
  }, [slug])

  const loadPost = async () => {
    if (!slug) return
    const post = await BlogService.getPostBySlug(slug)
    if (post) {
      setFormData(post)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((t) => t.trim())
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (formData.id) {
        await BlogService.updatePost(formData as BlogPost)
      } else {
        await BlogService.createPost(formData as BlogPost)
      }
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Failed to save post', error)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.foreground.primary}`
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
      <h1>{slug ? 'Edit Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={(e) => {
              handleChange(e)
              if (!slug) {
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }))
              }
            }}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label>Slug</label>
          <input name="slug" value={formData.slug} onChange={handleChange} style={inputStyle} required />
        </div>

        <div>
          <label>Excerpt</label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} required />
        </div>

        <div>
          <label>Content</label>
          <textarea name="content" value={formData.content} onChange={handleChange} style={{ ...inputStyle, height: '400px' }} required />
        </div>

        <div>
          <label>Tags (comma separated)</label>
          <input name="tags" value={formData.tags?.join(', ')} onChange={handleTagsChange} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
            />{' '}
            Published
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="submit" disabled={loading}>
            {loading ? 'SAVING...' : 'SAVE POST'}
          </Button>
          <Button type="button" onClick={() => navigate('/admin/dashboard')}>
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogEditor
