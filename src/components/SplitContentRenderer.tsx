import React from 'react'

import { useTheme } from './ThemeProvider'
import { useSplitContentState } from './SplitContentContext'
import MovingBanner from './MovingBanner'

type SplitContentRendererProps = {
  barPosition: number
  matches: boolean
  children?: React.ReactNode
}

export const SplitContentRenderer: React.FC<SplitContentRendererProps> = ({ barPosition, matches, children }) => {
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
      {/* This div keeps the page components (Home, About, etc.) mounted but is not visible.
          This is the key to fixing the infinite loop. */}
      <div style={{ display: 'none' }}>
        {children}
      </div>

      {/* Upper content area */}
      <div
        style={{
          height: barPosition,
          transition: 'all 0.5s ease',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* Render the upper content from context, or nothing if it's not set. 
              We no longer use Outlet as a fallback here. */}
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
