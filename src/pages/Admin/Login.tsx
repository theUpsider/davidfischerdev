import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../../services/authService'
import Button from '../../components/Button'
import { useTheme } from '../../components/ThemeProvider'

const Login: React.FC = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = await AuthService.login(password)
    if (user) {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', marginTop: '100px' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            border: `1px solid ${theme.palette.foreground.primary}`,
            backgroundColor: theme.palette.background.primary,
            color: theme.palette.text.primary
          }}
        />
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        <Button type="submit">LOGIN</Button>
      </form>
    </div>
  )
}

export default Login
