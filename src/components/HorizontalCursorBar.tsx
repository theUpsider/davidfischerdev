import * as React from 'react'
import { useTheme } from './ThemeProvider'

export const HorizontalCursorBar = ({ barPosition }: { barPosition?: number }) => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        borderTop: '1px solid ' + theme.palette.text.primary,
        width: '100%',
        height: 1,
        position: 'absolute',
        top: barPosition,
        transition: 'top 0.5s ease'
      }}
    />
  )
}
