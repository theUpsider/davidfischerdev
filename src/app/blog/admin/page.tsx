'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/actions/authActions'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(username, password)
      if (result.success) {
        router.push('/blog/admin/dashboard')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="blog-admin-container">
      <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="blog-admin-form">
          <div className="blog-admin-field">
            <label className="blog-admin-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="blog-admin-input"
              required
              autoComplete="username"
            />
          </div>

          <div className="blog-admin-field">
            <label className="blog-admin-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="blog-admin-input"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div style={{ color: 'red', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="blog-admin-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
