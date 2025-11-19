'use client'

import { useState, useMemo } from 'react'
import { BlogPost } from '@/types/blog'
import BlogCard from '@/components/Blog/BlogCard'
import { SearchBar } from '@/components/Blog/SearchBar'
import { TagFilter } from '@/components/Blog/TagFilter'

interface BlogListClientProps {
  initialPosts: BlogPost[]
  tags: { name: string; count: number }[]
}

export function BlogListClient({ initialPosts, tags }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialPosts
    }

    const lowerQuery = searchQuery.toLowerCase()
    return initialPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(lowerQuery)
      const excerptMatch = post.excerpt.toLowerCase().includes(lowerQuery)
      const contentMatch = post.content.toLowerCase().includes(lowerQuery)
      const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))

      return titleMatch || excerptMatch || contentMatch || tagsMatch
    })
  }, [initialPosts, searchQuery])

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      
      <TagFilter tags={tags} />

      {filteredPosts.length === 0 ? (
        <div className="blog-empty">
          <p>No posts found{searchQuery ? ` for "${searchQuery}"` : ''}.</p>
        </div>
      ) : (
        <div>
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
