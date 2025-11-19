import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/app/actions/blogActions'
import BlogCard from '@/components/Blog/BlogCard'
import { TagFilter } from '@/components/Blog/TagFilter'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.name
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const posts = await getPostsByTag(tag)
  const decodedTag = decodeURIComponent(tag)

  return {
    title: `${decodedTag} Articles`,
    description: `Explore ${posts.length} article${posts.length === 1 ? '' : 's'} about ${decodedTag}. Technical insights, tutorials, and deep dives into ${decodedTag}.`,
    keywords: [decodedTag, 'Articles', 'Blog Posts', 'Technical Content'],
    openGraph: {
      title: `${decodedTag} Articles | David Fischer`,
      description: `${posts.length} article${posts.length === 1 ? '' : 's'} about ${decodedTag}`,
      url: `https://davidfischer.dev/blog/tag/${tag}`,
      siteName: 'David Fischer',
      images: [
        {
          url: '/images/og/blog-default.svg',
          width: 1200,
          height: 630,
          alt: `${decodedTag} Articles`
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodedTag} Articles`,
      description: `${posts.length} article${posts.length === 1 ? '' : 's'} about ${decodedTag}`,
      images: ['/images/og/blog-default.svg'],
      site: '@theUpsider',
      creator: '@theUpsider'
    },
    alternates: {
      canonical: `https://davidfischer.dev/blog/tag/${tag}`
    }
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const [posts, allTags] = await Promise.all([getPostsByTag(tag), getAllTags()])

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="blog-content">
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: 700,
          letterSpacing: '-1px'
        }}>
        Posts tagged: {tag}
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          marginBottom: '3rem',
          opacity: 0.7
        }}>
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
      </p>

      <TagFilter tags={allTags} selectedTag={tag} />

      <div>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
