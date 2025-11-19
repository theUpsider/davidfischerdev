'use client'

import React from 'react'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown parser (for basic markdown support)
  // In production, consider using a library like react-markdown or marked
  
  const parseMarkdown = (text: string): string => {
    let html = text

    // Code blocks (```language ... ```)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code>${escapeHtml(code.trim())}</code></pre>`
    })

    // Inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

    // Lists (unordered)
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

    // Lists (ordered)
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')

    // Paragraphs
    html = html.split('\n\n').map(para => {
      if (para.match(/^<(h[1-6]|ul|ol|blockquote|pre)/)) {
        return para
      }
      return `<p>${para}</p>`
    }).join('\n')

    return html
  }

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  return (
    <div
      className="blog-post-content"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  )
}
