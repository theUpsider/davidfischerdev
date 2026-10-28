import * as React from 'react'

/**
 * Server-safe legal page shell.
 *
 * These components contain no hooks and no client-only code on purpose: the legal
 * documents must be part of the initial HTML response, so a plain GET (link checker,
 * Discord review, curl) sees the full text without executing JavaScript.
 */

export const ScopeBanner = () => (
  <div
    role="note"
    aria-label="Scope of this document"
    style={{
      margin: '0 0 20px 0',
      padding: '15px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }}>
    <p style={{ margin: 0 }}>
      <strong>Notice:</strong> This document applies exclusively to the Discord application{' '}
      <strong>&quot;Augustus&quot;</strong> (the &quot;Bot&quot;). It does <strong>not</strong> apply to the website
      davidfischer.dev or to any other service.
    </p>
  </div>
)

export const LegalPage = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '20px 0 60px 0', maxWidth: 920, lineHeight: 1.6 }}>
    <ScopeBanner />
    {children}
  </div>
)
