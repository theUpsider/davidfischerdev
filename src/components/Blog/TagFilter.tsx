'use client'

import Link from 'next/link'

interface TagFilterProps {
  tags: { name: string; count: number }[]
  selectedTag?: string
}

export function TagFilter({ tags, selectedTag }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Filter by Tag
      </h3>
      <div className="blog-tags">
        <Link href="/blog" className={`blog-tag ${!selectedTag ? 'active' : ''}`}>
          All ({tags.reduce((sum, tag) => sum + tag.count, 0)})
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/blog/tag/${tag.name}`}
            className={`blog-tag ${selectedTag === tag.name ? 'active' : ''}`}
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </div>
  )
}
