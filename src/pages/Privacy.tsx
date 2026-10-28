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
      <strong>&quot;Augustus&quot;</strong> (the &quot;Bot&quot;) operated by David Fischer. It does <strong>not</strong>{' '}
      apply to the website davidfischer.dev or to any other website or service.
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
          <p>Controller within the meaning of the EU General Data Protection Regulation (GDPR) is:</p>
          <p>David Fischer, Westendstraße 15, 87439 Kempten, Germany — theupsider@gmx.de</p>
        </section>

        <section>
          <h2>2. Scope</h2>
          <p>
            This Privacy Policy describes how the Discord application &quot;Augustus&quot; (the &quot;Bot&quot;)
            processes personal data. It applies only to the Bot. It does not describe the processing on the website
            davidfischer.dev, which is covered by the privacy information published on that website.
          </p>
        </section>

        <section>
          <h2>3. What data we process</h2>
          <p>When you message the Bot or share a Discord server with it, we process:</p>
          <ul>
            <li>
              <strong>Discord account data:</strong> your Discord user ID, username, display name, and (if applicable)
              server and channel identifiers needed to deliver replies.
            </li>
            <li>
              <strong>Message content:</strong> the text (and, if you send them, attachments such as voice notes) you
              address to the Bot, together with the message context needed to answer it.
            </li>
            <li>
              <strong>Technical data:</strong> timestamps and technical logs needed to operate, debug, and secure the
              Bot.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> ask for, and do not intend to process, special categories of personal data (Art. 9
            GDPR), such as health, religious, or political data. Please do not send such data to the Bot.
          </p>
        </section>

        <section>
          <h2>4. Purposes and legal bases</h2>
          <p>We process the data to provide the Bot and to answer your requests. The legal bases are:</p>
          <ul>
            <li>
              <strong>Art. 6(1)(b) GDPR</strong> — to provide the service you initiated by messaging or inviting the
              Bot;
            </li>
            <li>
              <strong>Art. 6(1)(f) GDPR</strong> — our legitimate interest in operating, securing, and improving the
              Bot, and in preventing abuse.
            </li>
          </ul>
          <p>We do not use the data for advertising and we do not sell it.</p>
        </section>

        <section>
          <h2>5. Automated processing by AI models — how it actually works</h2>
          <p>
            The Bot is an AI assistant. To generate replies, the messages you send are transmitted to and processed by a{' '}
            <strong>language model</strong>. Depending on the request, this may be a model running on our own
            infrastructure or a <strong>third-party model provider</strong>. Your message content is therefore processed
            by that provider for the sole purpose of producing a reply. If a provider processes data outside the EU/EEA,
            the transfer is based on appropriate safeguards (for example the EU Standard Contractual Clauses, Art. 46
            GDPR) or on your consent. We do not use your messages to train our own or third-party models.
          </p>
        </section>

        <section>
          <h2>6. Recipients and processors</h2>
          <p>Data is shared only as necessary to run the Bot:</p>
          <ul>
            <li>
              <strong>Discord</strong> (Discord Inc./Discord Netherlands B.V.), as the platform the Bot runs on;
            </li>
            <li>
              the <strong>language-model provider(s)</strong> engaged to generate replies;
            </li>
            <li>infrastructure we use to host the Bot.</li>
          </ul>
          <p>
            These recipients act as processors under Art. 28 GDPR or on their own legal basis. We do not share your data
            with third parties for their own purposes.
          </p>
        </section>

        <section>
          <h2>7. Retention</h2>
          <p>
            We keep message content and the resulting conversation context only as long as needed to provide the service
            and to keep operational records, and then delete or anonymise it. Technical logs are kept for a short,
            limited period for security and debugging. You can ask us to delete your data at any time (see section 9).
          </p>
        </section>

        <section>
          <h2>8. No automated decision-making</h2>
          <p>
            We do not use your data for automated decision-making that produces legal or similarly significant effects
            within the meaning of Art. 22 GDPR.
          </p>
        </section>

        <section>
          <h2>9. Your rights</h2>
          <p>
            You have the right to request access to (Art. 15), rectification of (Art. 16), erasure of (Art. 17),
            restriction of (Art. 18), and portability of (Art. 20) your data, and to object to processing based on
            legitimate interest (Art. 21). To exercise these rights, contact us at the address in section 1. You also
            have the right to lodge a complaint with a data-protection supervisory authority (Art. 77 GDPR); the
            competent authority for us is the Bavarian Data Protection Authority (BayLDA), Ansbach, Germany.
          </p>
        </section>

        <section>
          <h2>10. Security</h2>
          <p>
            We use reasonable technical and organisational measures to protect your data against loss and unauthorised
            access, in line with Art. 32 GDPR. No system is completely secure.
          </p>
        </section>

        <section>
          <h2>11. Changes</h2>
          <p>
            We may update this Privacy Policy; the current version is always published at this address, with the
            &quot;last updated&quot; date above.
          </p>
        </section>

        <section>
          <h2>12. Contact</h2>
          <p>For any privacy question or request: theupsider@gmx.de</p>
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
              <strong>Controller:</strong> David Fischer, Westendstraße 15, 87439 Kempten, Germany
            </li>
            <li>
              <strong>Contact:</strong> theupsider@gmx.de
            </li>
            <li>
              <strong>Data processed:</strong> Discord account data, message content, and technical logs
            </li>
            <li>
              <strong>Legal bases:</strong> Art. 6(1)(b) and Art. 6(1)(f) GDPR
            </li>
            <li>
              <strong>AI processing:</strong> messages are processed by a language model, possibly at a third-party
              provider
            </li>
            <li>
              <strong>Your rights:</strong> access, rectification, erasure, restriction, portability, objection, and
              complaint to the BayLDA
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
