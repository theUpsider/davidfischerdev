'use client'

import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import 'highlight.js/styles/github-dark.css'

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
          }
        }}>
        {content}
      </Markdown>
    </div>
  )
}
