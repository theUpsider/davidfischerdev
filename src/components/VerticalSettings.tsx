import React from 'react'
import { useTheme } from './ThemeProvider'
import { darkTheme, lightTheme } from '../styles'
import Button from './Button'

export const VerticalSettings = ({ matches }: { matches: boolean }) => {
  const { theme, setTheme } = useTheme()
  const isDark = theme.palette.type === 'dark'

  const toggleTheme = () => {
    if (isDark) {
      setTheme(lightTheme)
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(darkTheme)
      localStorage.setItem('theme', 'dark')
    }
  }
  return (
    <div
      style={{
        position: 'absolute',
        bottom: matches ? 200 : -15,
        left: matches ? 30 : 20,
        rotate: '-90deg',
        transformOrigin: 'left'
      }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {matches && (
          <p
            style={{
              marginRight: 20,
              fontWeight: 'bold'
            }}>
            SETTINGS
          </p>
        )}
        <Button onClick={() => toggleTheme()}>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</Button>
      </div>
    </div>
  )
}
