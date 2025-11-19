'use client'
import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../../components/SplitContentContext'

const Media = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const lowerContent = useMemo(
    () => (
      <div
        style={{
          transition: 'all 0.5s ease',
          padding: '20px',
          height: '100%',
          overflow: 'auto'
        }}>
        <h1>MEDIA //</h1>
        <p>Connect with me across different platforms!</p>

        <div style={{ marginTop: '30px' }}>
          <h2>🎥 YouTube</h2>
          <p>Tech tutorials, project showcases, and behind-the-scenes content</p>
          <a href="https://youtube.com/@davidfischerdev" target="_blank" rel="noopener noreferrer">
            @davidfischerdev
          </a>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2>📸 Instagram</h2>
          <p>Quick updates, development snippets, and personal moments</p>
          <a href="https://instagram.com/davidfischer.dev" target="_blank" rel="noopener noreferrer">
            @davidfischer.dev
          </a>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2>🐦 Twitter/X</h2>
          <p>Tech thoughts, industry news, and quick updates</p>
          <a href="https://twitter.com/davidfischerdev" target="_blank" rel="noopener noreferrer">
            @davidfischerdev
          </a>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2>👥 Facebook</h2>
          <p>Community updates and project announcements</p>
          <a href="https://facebook.com/davidfischer.dev" target="_blank" rel="noopener noreferrer">
            David Fischer Developer
          </a>
        </div>
      </div>
    ),
    []
  )

  const upperContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>📱 Social Media Strategy</h2>
        <p>How I use different platforms to share my work and connect with the community.</p>

        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px'
          }}>
          <h3>Content Types:</h3>
          <ul>
            <li>
              <strong>🎬 YouTube:</strong> Long-form tutorials, project walkthroughs, live coding sessions
            </li>
            <li>
              <strong>📷 Instagram:</strong> Visual progress updates, workspace setups, quick tips
            </li>
            <li>
              <strong>🐦 Twitter:</strong> Tech discussions, industry insights, quick announcements
            </li>
            <li>
              <strong>👤 Facebook:</strong> Community engagement, event announcements, milestone celebrations
            </li>
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Follow for:</h3>
          <p>🚀 Latest project updates and releases</p>
          <p>💡 Development tips and tricks</p>
          <p>🎯 Behind-the-scenes content</p>
          <p>🤝 Community discussions and Q&A</p>
        </div>

        <div style={{ marginTop: '20px', fontSize: '0.9em', opacity: 0.7 }}>
          <p>
            <em>🔔 Follow for regular updates on my latest projects and tech insights!</em>
          </p>
        </div>
      </div>
    ),
    []
  )

  useEffect(() => {
    setUpperContent(upperContent)
    setLowerContent(lowerContent)

    return () => {
      setUpperContent(null)
      setLowerContent(null)
    }
  }, [upperContent, lowerContent, setUpperContent, setLowerContent])

  return null
}

export default Media
