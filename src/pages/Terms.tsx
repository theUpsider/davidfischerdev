'use client'
import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const Terms = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div
        style={{
          overflow: 'scroll',
          height: '100%',
          transition: 'all 0.5s ease'
        }}>
        <h1>TERMS OF SERVICE //</h1>
        <p>Last updated: 2026-10-28</p>

        <section>
          <h2>1. Scope</h2>
          <p>
            These terms apply to the interactive Discord application &quot;Augustus&quot; (the &quot;Bot&quot;), operated
            by David Fischer (the &quot;Operator&quot;). By inviting or using the Bot you agree to these terms. If you do
            not agree, do not use the Bot.
          </p>
        </section>

        <section>
          <h2>2. Purpose</h2>
          <p>
            The Bot is a personal assistant and information service. It answers messages in direct messages and in
            servers where it has been invited and authorised.
          </p>
        </section>

        <section>
          <h2>3. Acceptable use</h2>
          <p>
            You agree not to use the Bot to violate any law, to harass or harm others, to attempt to extract credentials
            or private data, or to abuse, overload, reverse-engineer, or circumvent the Bot&apos;s access controls. Access
            is limited to the Operator&apos;s allowlists; the Operator may revoke access at any time.
          </p>
        </section>

        <section>
          <h2>4. No warranty</h2>
          <p>
            The Bot is provided &quot;as is&quot;, without warranty of any kind. It may be unavailable, may answer
            incompletely or incorrectly, and may change or be discontinued at any time. Do not rely on its output for
            legal, medical, financial, or safety-critical decisions.
          </p>
        </section>

        <section>
          <h2>5. Limitation of liability</h2>
          <p>
            To the extent permitted by law, the Operator is not liable for indirect, incidental, or consequential damages
            arising from use of or inability to use the Bot. Mandatory statutory liability remains unaffected.
          </p>
        </section>

        <section>
          <h2>6. Third-party platform</h2>
          <p>
            The Bot runs on Discord. Your use of Discord is governed by Discord&apos;s own terms and policies, which the
            Operator does not control.
          </p>
        </section>

        <section>
          <h2>7. Changes</h2>
          <p>
            The Operator may update these terms; the current version is always published at this address. Continued use
            after a change means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>David Fischer, Westendstraße 15, 87439 Kempten, Germany — theupsider@gmx.de</p>
        </section>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>Terms Information</h2>
        <p>This section provides a summary of the terms for the &quot;Augustus&quot; Discord application.</p>
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
              <strong>Operator:</strong> David Fischer
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

export default Terms
