import React from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'

/**
 * Contains HOME, ABOUT, PROJECTS, CONTACT
 * space evenly in vertical space
 * @returns
 */
export const VerticalMenu = ({
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
    ['BLOG', 'ARTICLES - TUTORIALS - THOUGHTS - UPDATES'],
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
            href={`/${item[0].toLowerCase() === 'home' ? '' : item[0].toLowerCase()}`}
            target={item[0].toLowerCase() === 'blog' ? '_blank' : '_self'}
            rel={item[0].toLowerCase() === 'blog' ? 'noopener noreferrer' : undefined}>
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
