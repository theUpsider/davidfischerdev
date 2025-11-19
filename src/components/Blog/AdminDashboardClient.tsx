'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { deletePost, updatePost } from '@/app/actions/blogActions'
import { logout } from '@/app/actions/authActions'

interface AdminDashboardClientProps {
  posts: BlogPost[]
}

export function AdminDashboardClient({ posts: initialPosts }: AdminDashboardClientProps) {
  const [posts, setPosts] = useState(initialPosts)
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
        published: !post.published,
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

  return (
    <div className="blog-admin-container">
      <div style={{ 
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

      <div style={{ marginBottom: '2rem' }}>
        <Link href="/blog/admin/editor" className="blog-admin-button">
          + Create New Post
        </Link>
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
                  {post.published ? '✓ Published' : '✗ Draft'} • 
                  {' '}{new Date(post.createdAt).toLocaleDateString()}
                  {' '}• {post.tags.join(', ')}
                </div>
              </div>
              <div className="blog-admin-post-actions">
                <Link
                  href={`/blog/admin/editor/${post.id}`}
                  className="blog-admin-button blog-admin-button-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleTogglePublish(post)}
                  className="blog-admin-button blog-admin-button-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
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
                  }}
                >
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
