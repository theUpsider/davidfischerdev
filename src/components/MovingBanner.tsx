import { useTheme } from './ThemeProvider'
import { useMediaQueryCustom } from './useMediaQueryCustom'

const MovingBanner = ({ text }: { text: string }) => {
  const { theme } = useTheme()
  const media = useMediaQueryCustom()

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        height: media ? '200px' : '50px',
        width: '100%' // Constrain width
      }}>
      <div
        style={{
          display: 'inline-block',
          animation: 'moveLeft 60s linear infinite',
          color: theme.palette.text.primary,
          position: 'absolute', // Remove from document flow
          whiteSpace: 'nowrap',
          width: 'max-content' // Contain text width
        }}>
        <style>
          {`
            @keyframes moveLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
            }
          `}
        </style>
        <p
          style={{
            fontSize: media ? '14.2rem' : '2rem',
            margin: 0,
            lineHeight: 1 // Control vertical spacing
          }}>
          {text}
        </p>
      </div>
    </div>
  )
}

export default MovingBanner
