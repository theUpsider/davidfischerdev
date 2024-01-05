import React from 'react'
import { DefaultTheme } from '../styles'

export type ThemeContextType = {
  theme: DefaultTheme
  setTheme: (theme: DefaultTheme) => void
}

// Create the context with a default value
export default React.createContext<ThemeContextType | undefined>(undefined)
