'use client'
import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const Privacy = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div
        style={{
          overflow: 'scroll',
          height: '100%',
          transition: 'all 0.5s ease'
        }}>
        <h1>PRIVACY POLICY //</h1>
        <p>Last updated: 2026-10-28</p>

        <section>
          <h2>1. Controller</h2>
          <p>David Fischer, Westendstraße 15, 87439 Kempten, Germany — theupsider@gmx.de</p>
        </section>

        <section>
          <h2>2. What this covers</h2>
          <p>
            This policy describes how the Discord application &quot;Augustus&quot; (the &quot;Bot&quot;) handles data
            relating to Discord users who message it or share a server with it.
          </p>
        </section>

        <section>
          <h2>3. Data the Bot processes</h2>
          <ul>
            <li>
              Discord account identifiers (user ID, username, display name) and the server (guild) and channel
              identifiers needed to deliver replies.
            </li>
            <li>The content of messages addressed to the Bot, and the message context needed to answer them.</li>
            <li>Technical logs needed to operate and secure the Bot.</li>
          </ul>
          <p>
            The Bot does not ask for and does not intend to process special-category personal data. Do not send such
            data.
          </p>
        </section>

        <section>
          <h2>4. Purposes and legal basis</h2>
          <p>
            Processing is necessary to provide the Bot&apos;s functionality and to respond to your requests; the legal
            basis is the performance of a service you initiated and the Operator&apos;s legitimate interest in operating
            and securing the Bot.
          </p>
        </section>

        <section>
          <h2>5. Storage and retention</h2>
          <p>
            Message content and the resulting conversation context are stored only as long as needed to provide the
            service and the Operator&apos;s own records, and are then deleted or anonymised. Access is restricted to the
            Operator.
          </p>
        </section>

        <section>
          <h2>6. Sharing</h2>
          <p>
            Data is not sold and is not shared with third parties for advertising. Data leaves the Operator&apos;s systems
            only through the platforms and model providers necessary to run the Bot (in particular Discord, and the
            language-model provider configured by the Operator). Where such providers process data outside the EU/EEA,
            they do so under their own safeguards.
          </p>
        </section>

        <section>
          <h2>7. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of data concerning you, and you may object to
            processing. Contact the Operator at the address above. You also have the right to complain to a
            data-protection supervisory authority.
          </p>
        </section>

        <section>
          <h2>8. Security</h2>
          <p>
            The Operator takes reasonable technical measures to protect the data, but no system is perfectly secure.
          </p>
        </section>

        <section>
          <h2>9. Changes</h2>
          <p>This policy may be updated; the current version is always published at this address.</p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>For any privacy question: theupsider@gmx.de</p>
        </section>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>Privacy Information</h2>
        <p>
          This section provides a summary of how the &quot;Augustus&quot; Discord application handles data relating to
          Discord users.
        </p>
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
              <strong>Controller:</strong> David Fischer
            </li>
            <li>
              <strong>Contact:</strong> theupsider@gmx.de
            </li>
            <li>
              <strong>Address:</strong> Westendstraße 15, 87439 Kempten, Germany
            </li>
            <li>
              <strong>Application:</strong> interactive Discord application &quot;Augustus&quot;
            </li>
            <li>
              <strong>Last updated:</strong> 2026-10-28
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

export default Privacy
