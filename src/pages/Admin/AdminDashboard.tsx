import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BlogService } from '../../services/blogService'
import { AuthService } from '../../services/authService'
import { BlogPost } from '../../types/blog'
import Button from '../../components/Button'
import { useTheme } from '../../components/ThemeProvider'

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const navigate = useNavigate()
  const { theme } = useTheme()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const data = await BlogService.getAllPostsAdmin()
    setPosts(data)
  }

  const handleLogout = () => {
    AuthService.logout()
    navigate('/admin/login')
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await BlogService.deletePost(id)
      loadPosts()
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <Button onClick={handleLogout}>LOGOUT</Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Link to="/admin/create">
          <Button>CREATE NEW POST</Button>
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${theme.palette.foreground.primary}` }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
            <th style={{ textAlign: 'right', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} style={{ borderBottom: `1px solid ${theme.palette.foreground.primary}` }}>
              <td style={{ padding: '10px' }}>{post.title}</td>
              <td style={{ padding: '10px' }}>{post.published ? 'Published' : 'Draft'}</td>
              <td style={{ padding: '10px' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                <Link to={`/admin/edit/${post.slug}`} style={{ marginRight: '10px' }}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard
