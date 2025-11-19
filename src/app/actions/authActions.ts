'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const SESSION_COOKIE_NAME = 'blog-admin-session'

// Simple session token (in production, use a proper session management system)
function generateSessionToken(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2)}`
}

// Login action
export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const sessionToken = generateSessionToken()
    const cookieStore = await cookies()
    
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    return { success: true }
  }
  
  return { success: false, error: 'Invalid credentials' }
}

// Logout action
export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session
}

// Require authentication (throws if not authenticated)
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/blog/admin')
  }
}
