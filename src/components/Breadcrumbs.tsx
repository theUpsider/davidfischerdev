'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      return { label, href }
    })
  ]

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
        style={{
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          padding: '0.75rem 0',
          borderBottom: '1px solid var(--blog-border)',
          opacity: 0.7
        }}>
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '0.5rem'
          }}>
          {breadcrumbs.map((crumb, index) => (
            <li
              key={crumb.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
              {index > 0 && <span style={{ opacity: 0.5 }}>›</span>}
              {index < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}>
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" style={{ fontWeight: 500 }}>
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.label,
              item: `https://davidfischer.dev${crumb.href}`
            }))
          })
        }}
      />
    </>
  )
}
