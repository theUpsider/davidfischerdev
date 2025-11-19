import { User } from '../types/blog'

const MOCK_USER: User = {
  username: 'admin',
  token: 'mock-jwt-token-123456'
}

export const AuthService = {
  login: async (password: string): Promise<User | null> => {
    // Simple hardcoded password for demonstration
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (password === 'admin123') {
      localStorage.setItem('auth_token', MOCK_USER.token)
      return MOCK_USER
    }
    return null
  },

  logout: () => {
    localStorage.removeItem('auth_token')
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token')
  }
}
