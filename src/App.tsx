import * as React from 'react'
import { ThemeProvider, useTheme } from './components/ThemeProvider'
import { darkTheme, lightTheme } from './styles'
import Button from './components/Button'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { SplitContentProvider } from './components/SplitContentContext'
import { SplitContentRenderer } from './components/SplitContentRenderer'
import ErrorPage from './pages/ErrorPage'
import Imprint from './pages/Imprint'
import Home from './pages/Home'
import Projects from './pages/Projects'
import { useMediaQueryCustom } from './components/useMediaQueryCustom'
import About from './pages/About'
import MajorSystem from './pages/MajorSystem'
import Contact from './pages/Contact'
import Media from './pages/Media'

const initialTheme = lightTheme

const mainPadding = 'max(3%, 30px)'

const VerticalSettings = ({ matches }: { matches: boolean }) => {
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
/**
 * Contains HOME, ABOUT, PROJECTS, CONTACT
 * space evenly in vertical space
 * @returns
 */
const VertialMenu = ({
  barpositionCallback,
  matches
}: {
  barpositionCallback: (barPosition: number) => void
  matches: boolean
}) => {
  const { theme } = useTheme()
  const [barPosition, setBarPosition] = React.useState(0)
  const [barLeft, setBarLeft] = React.useState(0)
  const [hoveredIndex, setHoveredIndex] = React.useState(0)

  // An array of items you want to be hoverable (can be dynamic)
  const items = [
    ['MEDIA', 'INSTAGRAM - TWITTER - FACEBOOK - YOUTUBE'],
    ['CONTACT', 'LINKEDIN - EMAIL - GITHUB - ADDRESS'],
    ['IMPRINT', 'LEGAL NOTICE - PRIVACY POLICY - TERMS OF SERVICE'],
    ['ABOUT', 'WHO AM I? - WHAT DO I DO? - WHAT DO I WANT?'],
    ['PROJECTS', 'GITHUB - WORKS - DEMOS - STUDIES'],
    ['HOME', 'PORTFOLIO - CURRICULUM VITAE - SKILLS']
  ]

  // Create an array of refs
  const refs = React.useRef(items.map(() => React.createRef<HTMLDivElement>()))
  const boundingDiv = React.useRef<HTMLDivElement>(null)

  // Function to handle mouse hover on elements
  const handleHover = (index: number) => {
    if (refs.current[index].current) {
      const rect = (refs.current[index].current as HTMLElement).getBoundingClientRect()
      const boundingDivRect = (boundingDiv.current as HTMLElement).getBoundingClientRect()
      setBarPosition(Number((rect.top + window.scrollY).toFixed(0))) // Update the position of the bar
      barpositionCallback(Number((rect.top + window.scrollY).toFixed(0))) // Update the position of the bar
      setBarLeft(Number((boundingDivRect?.left + boundingDivRect.width).toFixed(0))) // Update the position of the bar
      setHoveredIndex(index)
    }
  }

  React.useEffect(() => {
    handleHover(items.length - 1) // Set the initial position of the bar
  }, [])

  return (
    <div
      ref={boundingDiv}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column', // Conditionally set flexDirection based on matches,
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>
      {items.map((item, index) => (
        <div
          key={item[0]} // Unique key
          ref={refs.current[index]} // Attach the ref
          onMouseEnter={() => handleHover(index)} // Handle hover
          onFocus={() => handleHover(index)}
          role="button"
          tabIndex={0}
          style={{
            display: 'flex'

            // flexDirection: 'column' // Ensure items within are always vertically aligned
          }}>
          <Link
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              transform: matches ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}
            to={`/${item[0].toLowerCase() === 'home' ? '' : item[0].toLowerCase()}`}>
            {matches ? <h1>{item[0]}</h1> : <h3>{item[0]}</h3>}
          </Link>
        </div>
      ))}
      {matches && (
        <div>
          <p
            style={{
              fontWeight: 'bold',
              transform: matches ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}>
            © David Fischer 2025
          </p>
        </div>
      )}
      {/* Top bar */}
      <div
        style={{
          transformOrigin: 'left',
          rotate: '-90deg',
          position: 'absolute',
          top: matches ? barPosition - 35 : barPosition - 9,
          width: 'max-content',
          left: matches ? barLeft + 29 + 30 : barLeft + 10,
          transition: 'top 0.5s ease'
        }}>
        {matches ? (
          <h2
            style={{
              fontWeight: 'bold',
              padding: '0 1rem'
            }}>
            {items[hoveredIndex][1]}
          </h2>
        ) : (
          <p
            style={{
              margin: 0,
              fontWeight: 'bold'
            }}>
            {items[hoveredIndex][1]}
          </p>
        )}
        <div
          // This is used so that the bar has a width based on its position. The animation in the bar sets it to 100% width so it will stretch to the top.
          style={{
            width: barPosition
          }}>
          <div
            // Stretching floating bar
            key={hoveredIndex}
            style={{
              borderTop: '1px solid ' + theme.palette.text.primary,
              animation: `stretch 3s`,
              animationFillMode: 'forwards',
              animationTimingFunction: 'cubic-bezier(0.39, 0.58, 0, 1.04)'
            }}
          />
        </div>
      </div>

      {/* Bottom mirrored bar */}
      <div
        style={{
          transformOrigin: 'left',
          rotate: '90deg',
          position: 'absolute',
          top: matches ? barPosition - 35 : barPosition - 9,
          width: 'max-content',
          left: matches ? barLeft + 29 + 30 : barLeft + 10,
          transition: 'top 0.5s ease'
        }}>
        <div
          // This is used so that the bar has a width based on its position. The animation in the bar sets it to 100% width so it will stretch to the bottom.
          style={{
            width: barPosition
          }}></div>
        {matches ? (
          <h2
            style={{
              fontWeight: 'bold',
              padding: '0 1rem'
            }}>
            {items[hoveredIndex][1]}
          </h2>
        ) : (
          <p
            style={{
              margin: 0,
              fontWeight: 'bold'
            }}>
            {items[hoveredIndex][1]}
          </p>
        )}
      </div>
    </div>
  )
}

const App = () => {
  const { theme, setTheme } = useTheme()
  const [barPosition, setBarPosition] = React.useState(0)
  const matches = useMediaQueryCustom()
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
          <VertialMenu
            matches={matches}
            barpositionCallback={(barPosition: number) => {
              setBarPosition(barPosition)
            }}
          />
        </div>
        <SplitContentRenderer barPosition={barPosition} matches={matches} />
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
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        // Major System Generator
        path: 'projects/major-system',
        element: <MajorSystem />
      },
      {
        path: 'imprint',
        element: <Imprint />
      },
      {
        path: 'media',
        element: <Media />
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
    <SplitContentProvider>
      <RouterProvider router={router} />
    </SplitContentProvider>
  </ThemeProvider>
)
