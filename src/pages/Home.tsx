import { useEffect, useMemo } from 'react'
import { useMediaQueryCustom } from '../components/useMediaQueryCustom'
import { useSplitContentDispatch } from '../components/SplitContentContext'
import MovingBanner from '../components/MovingBanner'

const Home = () => {
  const media = useMediaQueryCustom()
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
        <div
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            textAlign: 'justify',
            fontSize: media ? '14.2rem' : '2rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'clip'
          }}>
          <p style={{ margin: 0 }}>DEVELOPER //</p>
          <p style={{ margin: 0 }}>ENGINEER //</p>
          <p style={{ margin: 0 }}>DESIGNER //</p>
          <p style={{ margin: 0 }}>RESEARCHER //</p>
          <p style={{ margin: 0 }}>CREATOR //</p>
        </div>
      </div>
    ),
    [media]
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <MovingBanner text="DEVELOPER // ENGINEER // DESIGNER // RESEARCHER // CREATOR // " />
      </div>
    ),
    []
  )

  // Set content once when component mounts
  useEffect(() => {
    setUpperContent(upperContent)
    setLowerContent(lowerContent)

    // Cleanup when component unmounts
    return () => {
      setUpperContent(null)
      setLowerContent(null)
    }
  }, [upperContent, lowerContent, setUpperContent, setLowerContent])

  // Return null since content is handled by the split system
  return null
}

export default Home
