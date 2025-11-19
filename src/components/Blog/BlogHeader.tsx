'use client'

import Link from 'next/link'
import { useBlogTheme } from '@/components/Blog/BlogThemeProvider'

interface BlogHeaderProps {
  isAdmin?: boolean
}

export function BlogHeader({ isAdmin = false }: BlogHeaderProps) {
  const { theme, toggleTheme } = useBlogTheme()

  return (
    <header className="blog-header">
      <div className="blog-header-content">
        <Link href="/blog" className="blog-logo">
          DAVID FISCHER / BLOG
        </Link>
        <nav className="blog-nav">
          <Link href="/blog">Articles</Link>
          {isAdmin && <Link href="/blog/admin/dashboard">Admin</Link>}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'opacity 0.2s ease'
            }}>
            Portfolio
          </a>
          <button onClick={toggleTheme} className="blog-theme-toggle">
            {theme === 'light' ? '◐ Dark' : '◑ Light'}
          </button>
        </nav>
      </div>
    </header>
  )
}
