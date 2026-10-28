import React from 'react'

import { useTheme } from './ThemeProvider'
import { useSplitContentState } from './SplitContentContext'
import MovingBanner from './MovingBanner'

type SplitContentRendererProps = {
  barPosition: number
  matches: boolean
  children?: React.ReactNode
  /**
   * Render `children` into the visible upper area instead of the hidden mount slot.
   *
   * Only for fully server-rendered content without a split-content provider (e.g. the
   * legal documents): those pages must appear in the initial HTML, not be injected
   * client-side. Leave it unset for the interactive split-content pages.
   */
  renderChildrenInline?: boolean
}

export const SplitContentRenderer: React.FC<SplitContentRendererProps> = ({
  barPosition,
  matches,
  children,
  renderChildrenInline = false
}) => {
  const { theme } = useTheme()
  const splitContent = useSplitContentState()

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `1px solid ${theme.palette.foreground.primary}`,
        paddingLeft: matches ? 62 : 26,
        height: '100vh',
        overflow: 'auto',
        position: 'relative'
      }}>
      {/* Hidden mount slot: keeps the interactive split-content pages (Home, About, etc.)
          mounted without showing their placeholder output. Skipped for inline pages, whose
          children are rendered in the visible area below. */}
      {!renderChildrenInline && <div style={{ display: 'none' }}>{children}</div>}

      {/* Upper content area */}
      <div
        style={{ height: renderChildrenInline ? 'auto' : barPosition, transition: 'all 0.5s ease' }}>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* Server-rendered content for inline pages, otherwise the content published
              through the split-content context (nothing if it was not set). */}
          {renderChildrenInline && <div style={{ paddingTop: 20 }}>{children}</div>}
          {splitContent.upperContent}
        </div>
      </div>

      {/* The horizontal line positioned absolutely */}
      <div
        style={{
          position: 'absolute',
          top: barPosition,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: theme.palette.text.primary,
          zIndex: 10,
          transition: 'top 0.5s ease'
        }}
      />

      {/* Lower content area */}
      <div
        style={{
          flex: 1,
          height: `calc(100vh - ${barPosition}px)`,
          transition: 'all 0.5s ease',
          overflow: 'auto',
          paddingTop: '10px'
        }}>
        {splitContent.lowerContent || (
          <MovingBanner text="ENGINEER // DEVELOPER // DESIGNER // RESEARCHER // CREATOR //" />
        )}
      </div>
    </div>
  )
}
