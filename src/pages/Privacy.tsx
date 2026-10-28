'use client'
import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const ScopeBanner = () => (
  <div
    role="note"
    aria-label="Scope of this document"
    style={{
      margin: '0 0 20px 0',
      padding: '15px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }}>
    <p style={{ margin: 0 }}>
      <strong>Notice:</strong> This document applies exclusively to the Discord application{' '}
      <strong>&quot;Augustus&quot;</strong> (the &quot;Bot&quot;). It does <strong>not</strong> apply to the website
      davidfischer.dev or to any other service.
    </p>
  </div>
)

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
        <ScopeBanner />
        <h1>PRIVACY POLICY //</h1>
        <p>Last updated: 2026-10-28</p>

        <section>
          <h2>1. Controller</h2>
          <p>
            David Fischer, 87439 Kempten, Germany — <a href="mailto:theupsider@gmx.de">theupsider@gmx.de</a>.
          </p>
        </section>

        <section>
          <h2>2. Scope</h2>
          <p>
            This policy applies only to the Bot, not to the website. For the Discord platform itself (your account,
            messages at Discord) Discord is separately responsible.
          </p>
        </section>

        <section>
          <h2>3. Data, purposes and legal bases (per purpose)</h2>
          <ul>
            <li>
              <strong>Answering your messages:</strong> Discord identifiers, message content and the context needed —
              Art. 6(1)(f) GDPR (legitimate interest: operating a private assistant). Session context is kept until the
              session ends, at most 24 hours.
            </li>
            <li>
              <strong>Operational security, abuse defence, error analysis:</strong> technical metadata (IDs, timestamps,
              error codes) — Art. 6(1)(f) GDPR. Logs: 7 days; security-relevant at most 30 days.
            </li>
            <li>
              <strong>Legal obligations</strong> (e.g. answering data-protection requests) — Art. 6(1)(c) GDPR.
            </li>
          </ul>
          <p>
            We do not specifically collect special categories (Art. 9, e.g. health, religion); if you send such data
            voluntarily, we process it to answer you based on your explicit consent (Art. 9(2)(a) GDPR) and delete it on
            request.
          </p>
        </section>

        <section>
          <h2>4. AI processing</h2>
          <p>
            To generate replies, your messages are transmitted to and processed by the language model. Reply generation
            takes place within Germany; there is no transfer to a language-model provider outside Germany. Your content
            is not used to train models.
          </p>
        </section>

        <section>
          <h2>5. Recipients</h2>
          <p>
            Discord (separately responsible, its own privacy policy). Service providers we use to run the Bot (hosting,
            model service) process data as processors under Art. 28 GDPR. No sharing for third-party purposes.
          </p>
        </section>

        <section>
          <h2>6. Retention</h2>
          <p>
            Session context: until the session ends, at most 24 hours. Technical logs: 7 days; security-relevant at
            most 30 days. Records of data-protection requests: up to 3 years (limitation period). No permanent storage
            of full chat histories. Data held at Discord itself cannot be deleted by the Bot — that is Discord&apos;s
            responsibility.
          </p>
        </section>

        <section>
          <h2>7. Objection and rights</h2>
          <p>
            You may object at any time to processing based on Art. 6(1)(f) GDPR (Art. 21 GDPR) — write to{' '}
            <a href="mailto:theupsider@gmx.de">theupsider@gmx.de</a>. You also have the right to access (Art. 15),
            rectification (16), erasure (17), restriction (18), portability (20), and withdrawal of consent (Art. 7(3)).
            We reply within one month as a rule. You have the right to complain to a supervisory authority (Art. 77),
            including the Bavarian DPA (BayLDA), Ansbach.
          </p>
        </section>

        <section>
          <h2>8. Not mandatory</h2>
          <p>You are not obliged to provide data; without messages the Bot simply cannot answer you.</p>
        </section>

        <section>
          <h2>9. What does NOT happen</h2>
          <p>
            No selling, no advertising, no tracking, no cookies (§ 25 TDDDG not triggered), no shadow profiles, no
            automated decision-making with legal effect (Art. 22 GDPR), no disclosure to authorities without a legal
            basis.
          </p>
        </section>

        <section>
          <h2>10. Security</h2>
          <p>
            Reasonable technical and organisational measures (Art. 32 GDPR), including transport encryption and access
            control.
          </p>
        </section>

        <section>
          <h2>11. Changes</h2>
          <p>The current version is always published here, with the date above.</p>
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
          This section provides a summary of how the Discord application &quot;Augustus&quot; (the &quot;Bot&quot;)
          processes personal data. It applies only to the Bot, not to the website davidfischer.dev.
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
              <strong>Applies to:</strong> the Discord application &quot;Augustus&quot; (the &quot;Bot&quot;) only
            </li>
            <li>
              <strong>Controller:</strong> David Fischer, 87439 Kempten, Germany
            </li>
            <li>
              <strong>Contact:</strong> theupsider@gmx.de
            </li>
            <li>
              <strong>Legal bases:</strong> Art. 6(1)(f) and Art. 6(1)(c) GDPR
            </li>
            <li>
              <strong>AI processing:</strong> replies are generated within Germany, without transfer to a model
              provider outside Germany
            </li>
            <li>
              <strong>Retention:</strong> session context at most 24 hours; logs 7 days (security-relevant at most 30
              days)
            </li>
            <li>
              <strong>Your rights:</strong> access, rectification, erasure, restriction, portability, objection, and
              complaint to the Bavarian DPA (BayLDA)
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
