import * as React from 'react'
import { ThemeProvider, useTheme } from './components/ThemeProvider'
import { darkTheme, lightTheme } from './styles'
import Button from './components/Button'
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom'
import { HorizontalCursorBar } from './components/HorizontalCursorBar'
import ErrorPage from './pages/ErrorPage'

const initialTheme = darkTheme

const mainPadding = 'max(3%, 30px)'

const VerticalSettings = () => {
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
        bottom: 200,
        left: 30,
        rotate: '-90deg',
        transformOrigin: 'left'
      }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <p
          style={{
            marginRight: 20,
            fontWeight: 'bold'
          }}>
          SETTINGS
        </p>
        <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
      </div>
    </div>
  )
}
/**
 * Contains HOME, ABOUT, PROJECTS, CONTACT
 * space evenly in vertical space
 * @returns
 */
const VertialMenu = () => {
  const { theme } = useTheme()
  const [barPosition, setBarPosition] = React.useState(0)

  // An array of items you want to be hoverable (can be dynamic)
  const items = ['HOME', 'PROJECTS', 'RESEARCH', 'ART', 'CONTACT']

  // Create an array of refs
  const refs = React.useRef(items.map(() => React.createRef<HTMLDivElement>()))

  // Function to handle mouse hover on elements
  const handleHover = (index: number) => {
    if (refs.current[index].current) {
      const rect = (refs.current[index].current as HTMLElement).getBoundingClientRect()
      setBarPosition(rect.top + window.scrollY) // Update the position of the bar
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%',
        width: '100%'
      }}>
      {items.map((item, index) => (
        <div
          key={item}
          ref={refs.current[index]} // Attach the ref
          onMouseEnter={() => handleHover(index)} // Handle hover
          style={{ height: '50px', marginTop: '10px' }} // Give some height for demonstration
        >
          <Link
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: theme.palette.text.primary
            }}
            to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}>
            <h1>{item}</h1>
          </Link>
        </div>
      ))}
      <HorizontalCursorBar barPosition={barPosition} />
    </div>
  )
}

const App = () => {
  const { theme, setTheme } = useTheme()

  // get theme from local storage
  if (localStorage.getItem('theme') === 'light') {
    setTheme(lightTheme)
  }

  const appStyle: React.CSSProperties = {
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    minHeight: '100vh', // Ensure it covers the full height
    minWidth: '100vw' // Ensure it covers the full width
  }
  return (
    <div style={appStyle}>
      <VerticalSettings />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: mainPadding,
          marginRight: mainPadding,
          height: '100vh',
          borderLeft: `1px solid ${theme.palette.foreground.primary}`,
          borderRight: `1px solid ${theme.palette.foreground.primary}`,
          padding: 30
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
          <h1>DAVID FISCHER 2024</h1>
          <h3>Software Engineer</h3>
          {/*WEBSITE UNDER CONSTRUCTION */}
          <h3>Website Under Construction</h3>
          <h3>Check my linkedin:</h3>
          <a href="https://www.linkedin.com/in/david-fischer-824566155/">LinkedIn</a>

          <VertialMenu />
        </div>
        <div
          style={{
            flexGrow: 1,
            marginRight: 30,
            borderLeft: `1px solid ${theme.palette.foreground.primary}`,
            borderRight: `1px solid ${theme.palette.foreground.primary}`,
            padding: 30
          }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'projects',
        element: (
          <div
            style={{
              transition: 'all 0.5s ease'
            }}>
            <h1>Projects</h1>
          </div>
        )
      }
    ]
  }
])

export default () => (
  <ThemeProvider initialTheme={initialTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
)
