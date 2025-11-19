'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import Image from 'next/image'
import '../../app/blog/highlight-custom.css'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="blog-post-content markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSanitize]}
        components={{
          // Open links in new tab
          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          // Add custom styling hooks for code blocks
          pre: ({ node, ...props }) => <pre className="code-block" {...props} />,
          // Add custom styling for inline code
          code: ({ node, className, children, ...props }) => {
            const isInline = !className
            return (
              <code className={isInline ? 'inline-code' : className} {...props}>
                {children}
              </code>
            )
          },
          // Optimize images with Next.js Image component
          img: ({ src, alt }) => {
            if (!src) return null

            // Ensure src is a string
            const imageSrc = typeof src === 'string' ? src : ''
            if (!imageSrc) return null

            // Handle external vs internal images
            const isExternal = imageSrc.startsWith('http://') || imageSrc.startsWith('https://')

            return (
              <span style={{ display: 'block', margin: '2rem 0' }}>
                <Image
                  src={imageSrc}
                  alt={alt || ''}
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  loading="lazy"
                  quality={85}
                  unoptimized={isExternal}
                />
              </span>
            )
          }
        }}>
        {content}
      </Markdown>
    </div>
  )
}
