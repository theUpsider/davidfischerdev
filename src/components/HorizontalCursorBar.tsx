import * as React from 'react'
import { useTheme } from './ThemeProvider'

export const HorizontalCursorBar = ({ barPosition, matches }: { barPosition?: number; matches?: boolean }) => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        borderTop: '1px solid ' + theme.palette.text.primary,
        width: matches ? '500%' : 78,
        height: 1,
        position: 'absolute',
        top: barPosition,
        transition: 'top 0.5s ease'
      }}
    />
  )
}
