'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { deletePost, updatePost, downloadBackup, restoreBackup } from '@/app/actions/blogActions'
import { logout } from '@/app/actions/authActions'

interface AdminDashboardClientProps {
  posts: BlogPost[]
}

export function AdminDashboardClient({ posts: initialPosts }: AdminDashboardClientProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      await deletePost(id)
      setPosts(posts.filter((p) => p.id !== id))
    } catch (error) {
      alert('Failed to delete post')
    }
  }

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const updatedPost = await updatePost({
        ...post,
        published: !post.published
      })
      setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
    } catch (error) {
      alert('Failed to update post')
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/blog/admin')
  }

  const handleDownloadBackup = async () => {
    try {
      const backup = await downloadBackup()

      // Create a blob and download it
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `blog-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      alert(`Successfully downloaded backup of ${backup.length} post(s)`)
    } catch (error) {
      alert('Failed to download backup')
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.json')) {
      alert('Please select a JSON file')
      return
    }

    if (!confirm('This will replace ALL existing blog posts. Are you sure you want to restore this backup?')) {
      event.target.value = ''
      return
    }

    setIsUploading(true)
    try {
      const text = await file.text()
      const backup = JSON.parse(text)

      const result = await restoreBackup(backup)

      if (result.success) {
        alert(result.message)
        setPosts(backup)
        router.refresh()
      } else {
        alert(`Failed to restore backup: ${result.message}`)
      }
    } catch (error) {
      alert('Failed to read or restore backup file. Please ensure it is a valid JSON file.')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="blog-admin-container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/blog" className="blog-admin-button blog-admin-button-secondary">
            View Blog
          </Link>
          <button onClick={handleLogout} className="blog-admin-button blog-admin-button-secondary">
            Logout
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/blog/admin/editor" className="blog-admin-button">
          + Create New Post
        </Link>
        <button onClick={handleDownloadBackup} className="blog-admin-button blog-admin-button-secondary">
          ⬇ Download Backup
        </button>
        <button
          onClick={handleUploadClick}
          className="blog-admin-button blog-admin-button-secondary"
          disabled={isUploading}>
          {isUploading ? '⏳ Uploading...' : '⬆ Upload Backup'}
        </button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>

      <div className="blog-admin-dashboard">
        {posts.length === 0 ? (
          <div className="blog-empty">No posts yet</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="blog-admin-post-item">
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h3>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                  {post.published ? '✓ Published' : '✗ Draft'} • {new Date(post.createdAt).toLocaleDateString()} •{' '}
                  {post.tags.join(', ')}
                </div>
              </div>
              <div className="blog-admin-post-actions">
                <Link
                  href={`/blog/admin/editor/${post.id}`}
                  className="blog-admin-button blog-admin-button-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Edit
                </Link>
                <button
                  onClick={() => handleTogglePublish(post)}
                  className="blog-admin-button blog-admin-button-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="blog-admin-button"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    backgroundColor: 'var(--blog-text)',
                    color: 'var(--blog-bg)'
                  }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
