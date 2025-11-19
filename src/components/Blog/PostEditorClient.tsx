'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { createPost, updatePost } from '@/app/actions/blogActions'
import { generateSlug } from '@/lib/db'

interface PostEditorClientProps {
  post?: BlogPost
}

export function PostEditorClient({ post }: PostEditorClientProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [tags, setTags] = useState(post?.tags.join(', ') || '')
  const [author, setAuthor] = useState(post?.author || 'David Fischer')
  const [published, setPublished] = useState(post?.published || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleTitleChange = (value: string) => {
    setTitle(value)
    // Auto-generate slug if creating new post
    if (!post) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const postData = {
        title,
        slug,
        content,
        excerpt,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        author,
        published,
      }

      if (post) {
        await updatePost({
          ...post,
          ...postData,
        })
      } else {
        await createPost(postData)
      }

      router.push('/blog/admin/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="blog-admin-container">
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
        {post ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="blog-admin-form">
        <div className="blog-admin-field">
          <label className="blog-admin-label">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="blog-admin-input"
            required
          />
        </div>

        <div className="blog-admin-field">
          <label className="blog-admin-label">Slug *</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="blog-admin-input"
            required
          />
          <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            URL: /blog/{slug || 'your-post-slug'}
          </small>
        </div>

        <div className="blog-admin-field">
          <label className="blog-admin-label">Excerpt *</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="blog-admin-input"
            style={{ minHeight: '80px' }}
            required
          />
          <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Short description for post preview
          </small>
        </div>

        <div className="blog-admin-field">
          <label className="blog-admin-label">Content (Markdown) *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="blog-admin-textarea"
            required
          />
          <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Supports markdown: # Headers, **bold**, *italic*, `code`, [links](url), etc.
          </small>
        </div>

        <div className="blog-admin-field">
          <label className="blog-admin-label">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="blog-admin-input"
            placeholder="tag1, tag2, tag3"
          />
          <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Comma-separated tags
          </small>
        </div>

        <div className="blog-admin-field">
          <label className="blog-admin-label">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="blog-admin-input"
          />
        </div>

        <div className="blog-admin-field">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              style={{ width: 'auto' }}
            />
            <span className="blog-admin-label" style={{ margin: 0 }}>Publish immediately</span>
          </label>
        </div>

        {error && (
          <div style={{ color: 'red', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            className="blog-admin-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
          </button>
          <button
            type="button"
            onClick={() => router.push('/blog/admin/dashboard')}
            className="blog-admin-button blog-admin-button-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
