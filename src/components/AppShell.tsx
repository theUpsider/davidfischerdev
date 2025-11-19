'use client'
import * as React from 'react'
import { ThemeProvider, useTheme } from './ThemeProvider'
import { darkTheme, lightTheme } from '../styles'
import { SplitContentProvider } from './SplitContentContext'
import { SplitContentRenderer } from './SplitContentRenderer'
import { useMediaQueryCustom } from './useMediaQueryCustom'
import { VerticalSettings } from './VerticalSettings'
import { VerticalMenu } from './VerticalMenu'

const initialTheme = lightTheme

const mainPadding = 'max(3%, 30px)'

const AppContent = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme()
  const [barPosition, setBarPosition] = React.useState(0)
  const matches = useMediaQueryCustom()

  // get theme from local storage
  React.useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'light') {
      setTheme(lightTheme)
    }
  }, [setTheme])

  const appStyle: React.CSSProperties = {
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    minHeight: '100vh', // Ensure it covers the full height
    minWidth: '100vw' // Ensure it covers the full width
  }

  return (
    <div style={appStyle}>
      <VerticalSettings matches={matches} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: matches ? mainPadding : 0,
          marginRight: mainPadding,
          height: '100vh',
          borderLeft: `1px solid ${theme.palette.foreground.primary}`,
          borderRight: `1px solid ${theme.palette.foreground.primary}`,
          paddingLeft: matches ? 30 : 0
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingRight: 30
          }}>
          {matches ? (
            <>
              <h1>DAVID FISCHER 2025</h1>
              <h3>Software Engineer</h3>
              {/*WEBSITE UNDER CONSTRUCTION */}
              {/* <h3>Website Under Construction</h3> */}
              <h3>Check my linkedin:</h3>
            </>
          ) : null}
          <a href="https://www.linkedin.com/in/david-fischer-824566155/">LinkedIn</a>
          <VerticalMenu
            matches={matches}
            barpositionCallback={(barPosition: number) => {
              setBarPosition(barPosition)
            }}
          />
        </div>
        <SplitContentRenderer barPosition={barPosition} matches={matches}>
          {children}
        </SplitContentRenderer>
      </div>
    </div>
  )
}

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <SplitContentProvider>
        <AppContent>{children}</AppContent>
      </SplitContentProvider>
    </ThemeProvider>
  )
}
