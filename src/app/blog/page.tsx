import { getAllPosts, getAllTags } from '@/app/actions/blogActions'
import { BlogListClient } from '@/components/Blog/BlogListClient'

export const metadata = {
  title: 'Blog | David Fischer',
  description: 'Articles on software engineering, web development, and technology',
}

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    getAllPosts(),
    getAllTags(),
  ])

  return (
    <div className="blog-content">
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem', 
        fontWeight: 700, 
        letterSpacing: '-1px' 
      }}>
        BLOG
      </h1>
      <p style={{ 
        fontSize: '1.1rem', 
        marginBottom: '3rem', 
        opacity: 0.7 
      }}>
        Thoughts on software engineering, technology, and my projects
      </p>
      
      <BlogListClient initialPosts={posts} tags={tags} />
    </div>
  )
}
