import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthService } from '../services/authService'

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = AuthService.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
