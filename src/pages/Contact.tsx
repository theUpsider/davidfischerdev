import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const Contact = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px'
          }}>
          <h1>CONTACT //</h1>
          <p>Write me an email</p>
          <a
            style={{
              textDecoration: 'none'
            }}
            href="mailto:davidvfischer@gmail.com">
            davidvfischer@gmail.com
          </a>
          <p>Connect with me on </p>
          <a href="https://www.linkedin.com/in/david-fischer-824566155/">LinkedIn</a>
          <p>Check out my </p>
          <a href="https://www.github.com/theupsider">GitHub</a>
        </div>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>📬 Get In Touch</h2>
        <p>I'm always interested in new opportunities and connections!</p>

        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px'
          }}>
          <h3>Ways to reach me:</h3>
          <ul>
            <li>
              <strong>📧 Email:</strong> davidvfischer@gmail.com
            </li>
            <li>
              <strong>💼 LinkedIn:</strong> Professional networking and career opportunities
            </li>
            <li>
              <strong>🐙 GitHub:</strong> Collaboration on open-source projects
            </li>
            <li>
              <strong>📍 Location:</strong> Kempten, Germany
            </li>
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>What I'm looking for:</h3>
          <p>✨ Exciting projects in AI/ML, game development, or web technologies</p>
          <p>🤝 Collaboration opportunities with other developers</p>
          <p>💡 Interesting research partnerships</p>
          <p>🎯 Full-time or freelance opportunities</p>
        </div>

        <div style={{ marginTop: '20px', fontSize: '0.9em', opacity: 0.7 }}>
          <p>
            <em>💬 I typically respond within 24 hours!</em>
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

export default Contact
