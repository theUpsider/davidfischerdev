import React from 'react'
import { DefaultTheme } from '../styles'
import ThemeContext, { ThemeContextType } from './ThemeContext'

type ThemeProviderProps = {
  initialTheme: DefaultTheme
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState<DefaultTheme>(initialTheme)
  React.useEffect(() => {
    // Update the body's background color whenever the theme changes
    document.body.style.backgroundColor = theme.palette.background.primary
    document.body.style.color = theme.palette.text.primary
  }, [theme]) // Only re-run the effect if the theme changes
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextType {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
