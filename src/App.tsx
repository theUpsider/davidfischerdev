import * as React from 'react'
import { ThemeProvider, useTheme } from './components/ThemeProvider'
import { darkTheme, lightTheme } from './styles'
import Button from './components/Button'
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom'
import { HorizontalCursorBar } from './components/HorizontalCursorBar'
import ErrorPage from './pages/ErrorPage'
import Imprint from './pages/Imprint'
import Home from './pages/Home'

const initialTheme = lightTheme

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
const VertialMenu = ({ barpositionCallback }: { barpositionCallback: (barPosition: number) => void }) => {
  const { theme } = useTheme()
  const [barPosition, setBarPosition] = React.useState(0)
  const [barLeft, setBarLeft] = React.useState(0)
  const [hoveredIndex, setHoveredIndex] = React.useState(0)

  // An array of items you want to be hoverable (can be dynamic)
  const items = [
    ['CONTACT', 'LINKEDIN - EMAIL - PHONE - ADDRESS'],
    ['IMPRINT', 'LEGAL NOTICE - PRIVACY POLICY - TERMS OF SERVICE'],
    ['ABOUT', 'WHO AM I? - WHAT DO I DO? - WHAT DO I WANT?'],
    ['PROJECTS', 'GITHUB - WORKS - DEMOS - STUDIES'],
    ['HOME', 'PORTFOLIO - CURRICULUM VITAE - SKILLS']
  ]

  // Create an array of refs
  const refs = React.useRef(items.map(() => React.createRef<HTMLDivElement>()))

  // Function to handle mouse hover on elements
  const handleHover = (index: number) => {
    if (refs.current[index].current) {
      const rect = (refs.current[index].current as HTMLElement).getBoundingClientRect()
      setBarPosition(rect.top + window.scrollY) // Update the position of the bar
      barpositionCallback(rect.top + window.scrollY)
      setBarLeft(rect.left + rect.width)
      setHoveredIndex(index)
    }
  }

  React.useEffect(() => {
    handleHover(4) // Set the initial position of the bar
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%'
      }}>
      {items.map((item, index) => (
        <div
          key={item[0]}
          ref={refs.current[index]} // Attach the ref
          onMouseEnter={() => handleHover(index)} // Handle hover
        >
          <Link
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: theme.palette.text.primary
            }}
            to={`/${item[0].toLowerCase() === 'home' ? '' : item[0].toLowerCase()}`}>
            <h1>{item[0]}</h1>
          </Link>
        </div>
      ))}
      <div>
        <p
          style={{
            fontWeight: 'bold'
          }}>
          © David Fischer 2024
        </p>
      </div>
      <div
        style={{
          transformOrigin: 'left',
          rotate: '-90deg',
          position: 'absolute',
          top: barPosition - 29,
          width: 'max-content',
          left: barLeft + 29 + 30,
          transition: 'top 0.5s ease'
        }}>
        <h2
          style={{
            fontWeight: 'bold',
            paddingLeft: 10
          }}>
          {items[hoveredIndex][1]}
        </h2>
        <div
          // This is used so that the bar has a width based on its position. The animation in the bar sets it to 100% width so it will stretch to the top.
          style={{
            width: barPosition
          }}>
          <div
            // Stretching floating bar
            key={Math.random()}
            style={{
              borderTop: '1px solid ' + theme.palette.text.primary,
              animation: `stretch 3s`,
              height: 2,
              animationFillMode: 'forwards',
              animationTimingFunction: 'cubic-bezier(0.39, 0.58, 0, 1.04)'
            }}
          />
        </div>
      </div>
      <HorizontalCursorBar barPosition={barPosition} />
    </div>
  )
}

const App = () => {
  const { theme, setTheme } = useTheme()
  const [barPosition, setBarPosition] = React.useState(0)

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
          paddingLeft: 30
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingRight: 30
          }}>
          <h1>DAVID FISCHER 2024</h1>
          <h3>Software Engineer</h3>
          {/*WEBSITE UNDER CONSTRUCTION */}
          <h3>Website Under Construction</h3>
          <h3>Check my linkedin:</h3>
          <a href="https://www.linkedin.com/in/david-fischer-824566155/">LinkedIn</a>

          <VertialMenu
            barpositionCallback={(barPosition: number) => {
              setBarPosition(barPosition)
            }}
          />
        </div>
        <div
          // Actual content right side field
          style={{
            borderLeft: `1px solid ${theme.palette.foreground.primary}`,
            paddingLeft: 57,
            minWidth: '100%'
          }}>
          <div
            // Bar position separates upper and lower content
            style={{
              height: barPosition,
              transition: 'all 0.5s ease'
            }}>
            <Outlet />
          </div>
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
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: (
          <div
            style={{
              transition: 'all 0.5s ease'
            }}>
            <h1>About</h1>
          </div>
        )
      },
      {
        path: 'contact',
        element: (
          <div
            style={{
              transition: 'all 0.5s ease'
            }}>
            <h1>Contact</h1>
          </div>
        )
      },
      {
        path: 'projects',
        element: (
          <div
            style={{
              width: '100%',
              height: '100%',
              transition: 'all 0.5s ease'
            }}>
            <h1>Projects</h1>
          </div>
        )
      },
      {
        path: 'imprint',
        element: <Imprint />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])

export default () => (
  <ThemeProvider initialTheme={initialTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
)
