import './blog.css'
import { BlogThemeProvider } from '@/components/Blog/BlogThemeProvider'
import { BlogHeader } from '@/components/Blog/BlogHeader'

export const metadata = {
  title: 'Blog | David Fischer',
  description: 'Thoughts on software engineering, technology, and projects by David Fischer',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BlogThemeProvider>
      <div className="blog-container">
        <BlogHeader />
        <main className="blog-main">
          {children}
        </main>
      </div>
    </BlogThemeProvider>
  )
}
