'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost, ContentTag } from '@/types/blog'
import { createPost, updatePost } from '@/app/actions/blogActions'
import { generateSlug } from '@/lib/utils'
import { MarkdownRenderer } from './MarkdownRenderer'

interface PostEditorClientProps {
  post?: BlogPost
}

type ViewMode = 'edit' | 'preview' | 'split'

export function PostEditorClient({ post }: PostEditorClientProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [tags, setTags] = useState(post?.tags.join(', ') || '')
  const [author, setAuthor] = useState(post?.author || 'David Fischer')
  const [published, setPublished] = useState(post?.published || false)
  const [contentTag, setContentTag] = useState<ContentTag | undefined>(post?.contentTag)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('edit')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
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
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        author,
        published,
        contentTag
      }

      if (post) {
        await updatePost({
          ...post,
          ...postData
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

  // Format text with markdown syntax
  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    const newText = beforeText + before + selectedText + after + afterText
    setContent(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault()
            insertMarkdown('**', '**')
            break
          case 'i':
            e.preventDefault()
            insertMarkdown('*', '*')
            break
          case 'k':
            e.preventDefault()
            insertMarkdown('[', '](url)')
            break
          case '`':
            e.preventDefault()
            insertMarkdown('`', '`')
            break
        }
      }
    }

    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown)
      return () => textarea.removeEventListener('keydown', handleKeyDown)
    }
  }, [content])

  const toolbarButtons = [
    { label: 'B', title: 'Bold (Ctrl+B)', action: () => insertMarkdown('**', '**') },
    { label: 'I', title: 'Italic (Ctrl+I)', action: () => insertMarkdown('*', '*') },
    { label: 'H1', title: 'Heading 1', action: () => insertMarkdown('# ') },
    { label: 'H2', title: 'Heading 2', action: () => insertMarkdown('## ') },
    { label: 'H3', title: 'Heading 3', action: () => insertMarkdown('### ') },
    { label: 'Code', title: 'Inline Code (Ctrl+`)', action: () => insertMarkdown('`', '`') },
    { label: 'Link', title: 'Link (Ctrl+K)', action: () => insertMarkdown('[', '](url)') },
    { label: 'List', title: 'Bullet List', action: () => insertMarkdown('- ') },
    { label: '1.', title: 'Numbered List', action: () => insertMarkdown('1. ') },
    { label: 'Quote', title: 'Blockquote', action: () => insertMarkdown('> ') },
    { label: '```', title: 'Code Block', action: () => insertMarkdown('```\n', '\n```') }
  ]

  return (
    <div className="blog-admin-container-full">
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{post ? 'Edit Post' : 'Create New Post'}</h1>

      <form onSubmit={handleSubmit} className="blog-admin-form-grid">
        <div className="blog-admin-left-column">
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
            <label className="blog-admin-label">Excerpt *</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="blog-admin-input"
              style={{ minHeight: '120px', resize: 'vertical' }}
              required
            />
            <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>Short description for post preview</small>
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
            <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>Comma-separated tags</small>
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
            <label className="blog-admin-label">Content Tag</label>
            <select
              value={contentTag || ''}
              onChange={(e) => setContentTag((e.target.value as ContentTag) || undefined)}
              className="blog-admin-input"
              style={{ cursor: 'pointer' }}>
              <option value="">None</option>
              <option value="human-written">✍️ Human Written</option>
              <option value="ai-edited">🤝 AI Edited</option>
              <option value="ai-generated">🤖 AI Generated</option>
            </select>
            <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>Indicates how the content was created</small>
          </div>

          <div className="blog-admin-field">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                style={{ width: 'auto' }}
              />
              <span className="blog-admin-label" style={{ margin: 0 }}>
                Publish immediately
              </span>
            </label>
          </div>

          {error && <div style={{ color: 'red', fontSize: '0.9rem' }}>{error}</div>}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="blog-admin-button" disabled={loading}>
              {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/blog/admin/dashboard')}
              className="blog-admin-button blog-admin-button-secondary">
              Cancel
            </button>
          </div>
        </div>

        <div className="blog-admin-right-column">
          <div className="blog-admin-field">
            <label className="blog-admin-label">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="blog-admin-input"
              required
            />
            <small style={{ fontSize: '0.8rem', opacity: 0.7 }}>URL: /blog/{slug || 'your-post-slug'}</small>
          </div>

          <div className="blog-admin-field" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
              <label className="blog-admin-label">Content (Markdown) *</label>
              <div className="editor-view-tabs">
                <button
                  type="button"
                  className={`editor-tab ${viewMode === 'edit' ? 'active' : ''}`}
                  onClick={() => setViewMode('edit')}>
                  Edit
                </button>
                <button
                  type="button"
                  className={`editor-tab ${viewMode === 'preview' ? 'active' : ''}`}
                  onClick={() => setViewMode('preview')}>
                  Preview
                </button>
                <button
                  type="button"
                  className={`editor-tab ${viewMode === 'split' ? 'active' : ''}`}
                  onClick={() => setViewMode('split')}>
                  Split
                </button>
              </div>
            </div>

            {viewMode === 'split' ? (
              <div className="editor-split-container">
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="editor-toolbar">
                    {toolbarButtons.map((btn, idx) => (
                      <button key={idx} type="button" className="toolbar-button" title={btn.title} onClick={btn.action}>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="blog-admin-textarea-full"
                    style={{ flex: 1 }}
                    required
                  />
                </div>
                <div className="editor-preview" style={{ flex: 1 }}>
                  <div className="preview-label">Preview:</div>
                  <div className="preview-content">
                    {content ? (
                      <MarkdownRenderer content={content} />
                    ) : (
                      <p style={{ opacity: 0.5 }}>No content to preview</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {viewMode === 'edit' && (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div className="editor-toolbar">
                      {toolbarButtons.map((btn, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="toolbar-button"
                          title={btn.title}
                          onClick={btn.action}>
                          {btn.label}
                        </button>
                      ))}
                    </div>
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="blog-admin-textarea-full"
                      style={{ flex: 1 }}
                      required
                    />
                  </div>
                )}

                {viewMode === 'preview' && (
                  <div className="editor-preview">
                    <div className="preview-label">Preview:</div>
                    <div className="preview-content">
                      {content ? (
                        <MarkdownRenderer content={content} />
                      ) : (
                        <p style={{ opacity: 0.5 }}>No content to preview</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            <small style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>
              Supports markdown: # Headers, **bold**, *italic*, `code`, [links](url), etc.
            </small>
          </div>
        </div>
      </form>
    </div>
  )
}
