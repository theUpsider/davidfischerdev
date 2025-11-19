import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const Imprint = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div
        style={{
          overflow: 'scroll',
          height: '100%',
          transition: 'all 0.5s ease'
        }}>
        <h1>IMPRINT //</h1>

        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to David Fischer's personal portfolio website. As a software engineer and an all-around solution
            finder, this website aims to showcase my professional background, interests in deep learning, game
            engineering, data science, and my work in the field of AI and Machine Learning at the University of Applied
            Sciences Kempten.
          </p>
          <p>
            This Privacy Policy outlines how we respect your privacy and what limited user information might be involved
            during your visit.
          </p>
        </section>

        <section>
          <h2>Purpose of the Website</h2>
          <p>
            The website serves to present myself, David Fischer, to peers and individuals interested in my research or
            considering me for employment opportunities. It's a platform to highlight my academic and professional
            achievements, my passions, and to facilitate connections within the professional community.
          </p>
        </section>

        <section>
          <h2>Personal Data</h2>
          <h3>Data Collection and Use:</h3>
          <p>
            The website does not collect any personal data directly from visitors and does not use any external
            third-party services. There are no forms to submit personal information, no analytics tools tracking user
            behavior, and no external resources that could transmit data to third parties.
          </p>
          <p>
            All fonts and resources are served locally to ensure complete privacy and prevent any external data
            transmission.
          </p>

          <h3>Data Sharing:</h3>
          <p>No personal data is collected; hence, no data is shared with any third parties.</p>
        </section>

        <section>
          <h2>User Rights</h2>
          <p>
            Since no personal data is collected, the typical user rights under data protection regulations (e.g.,
            access, rectification, deletion) do not apply here. However, should you have any concerns or inquiries about
            privacy, please feel free to reach out.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            Since the website operates completely independently without external dependencies, data security is enhanced
            by design. No third-party services are used that could potentially access or transmit user information.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            For any questions or concerns regarding your privacy or this Privacy Policy, please contact David Fischer
            at:
          </p>
          <p>Email: theupsider@gmx.de</p>
          <p>Address: Westendstraße 15, 87439 Kempten, Germany</p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We reserve the right to make changes to this Privacy Policy at any time. Such changes will be posted on this
            page and are effective immediately. This policy was last updated on [Insert Date].
          </p>
          <p>By using this website, you acknowledge that you have read and understand this Privacy Policy.</p>
        </section>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>Legal Information</h2>
        <p>This section provides a summary of the legal information for this website.</p>
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px'
          }}>
          <h3>Key Points:</h3>
          <ul>
            <li>
              <strong>Owner:</strong> David Fischer
            </li>
            <li>
              <strong>Contact:</strong> theupsider@gmx.de
            </li>
            <li>
              <strong>Address:</strong> Westendstraße 15, 87439 Kempten, Germany
            </li>
            <li>
              <strong>Data Collection:</strong> No personal data is collected directly.
            </li>
            <li>
              <strong>Third-Party Services:</strong> None - all resources are served locally.
            </li>
          </ul>
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

export default Imprint
