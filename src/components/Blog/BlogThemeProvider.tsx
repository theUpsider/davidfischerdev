'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface BlogThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const BlogThemeContext = createContext<BlogThemeContextType | undefined>(undefined)

export function BlogThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('blog-theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('blog-theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  if (!mounted) {
    return null
  }

  return (
    <BlogThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </BlogThemeContext.Provider>
  )
}

export function useBlogTheme() {
  const context = useContext(BlogThemeContext)
  if (context === undefined) {
    throw new Error('useBlogTheme must be used within a BlogThemeProvider')
  }
  return context
}
