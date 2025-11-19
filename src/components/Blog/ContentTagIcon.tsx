'use client'

import { ContentTag } from '@/types/blog'
import { useState } from 'react'

interface ContentTagIconProps {
  tag?: ContentTag
  className?: string
}

const contentTagInfo: Record<
  ContentTag,
  {
    icon: string
    fallback: string
    tooltip: string
    ariaLabel: string
  }
> = {
  'human-written': {
    icon: '✍️',
    fallback: 'H',
    tooltip: 'Completely written by a human. No intervention of AI at all. To preserve the human made web.',
    ariaLabel: 'Human written content'
  },
  'ai-edited': {
    icon: '🤝',
    fallback: 'A+H',
    tooltip: 'Human content, written by a human. Then AI is used for editorial purposes only.',
    ariaLabel: 'AI edited content'
  },
  'ai-generated': {
    icon: '🤖',
    fallback: 'AI',
    tooltip: 'Text is mainly written by AI. Content could be either human or AI.',
    ariaLabel: 'AI generated content'
  }
}

export function ContentTagIcon({ tag, className = '' }: ContentTagIconProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  if (!tag) return null

  const info = contentTagInfo[tag]

  return (
    <span
      className={`content-tag-wrapper ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'help'
      }}
      aria-label={info.ariaLabel}>
      <span
        className="content-tag-icon"
        style={{
          fontSize: '1.1rem',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
        <span role="img" aria-hidden="true" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {info.icon}
        </span>
        <span
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0
          }}>
          {info.fallback}
        </span>
      </span>
      {showTooltip && (
        <span
          className="content-tag-tooltip"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            backgroundColor: 'var(--blog-background)',
            color: 'var(--blog-text)',
            border: '1px solid var(--blog-border)',
            borderRadius: '4px',
            fontSize: '0.85rem',
            lineHeight: '1.4',
            whiteSpace: 'normal',
            width: '240px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            pointerEvents: 'none'
          }}>
          {info.tooltip}
          <span
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid var(--blog-border)'
            }}
          />
        </span>
      )}
    </span>
  )
}
