import './blog.css'
import { BlogThemeProvider } from '@/components/Blog/BlogThemeProvider'
import { BlogHeader } from '@/components/Blog/BlogHeader'
import { isAuthenticated } from '@/app/actions/authActions'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Blog | David Fischer',
  description: 'Thoughts on software engineering, technology, and projects by David Fischer'
}

// Force dynamic rendering for this layout
export const dynamic = 'force-dynamic'

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await isAuthenticated()

  return (
    <BlogThemeProvider>
      <div className="blog-container">
        <BlogHeader isAdmin={isAdmin} />
        <main className="blog-main">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </BlogThemeProvider>
  )
}
