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
        <ScopeBanner />
        <h1>TERMS OF SERVICE //</h1>
        <p>Last updated: 2026-10-28</p>

        <section>
          <h2>1. Scope and provider</h2>
          <p>
            These Terms govern the use of the Discord application &quot;Augustus&quot; (the &quot;Bot&quot;), provided
            by David Fischer, 87439 Kempten, Germany (&quot;we&quot;, &quot;us&quot;). They apply only to the Bot, not
            to the website davidfischer.dev or any other service. By using the Bot you accept these Terms. This
            acceptance is not a data-protection consent; where we need consent, we obtain it separately and it can be
            withdrawn.
          </p>
        </section>

        <section>
          <h2>2. What the Bot is</h2>
          <p>
            The Bot is a private, invite-only AI assistant. It answers messages in Discord servers and direct messages.
            You are interacting with an AI system, not with a person. Access may be restricted at any time.
          </p>
        </section>

        <section>
          <h2>3. Acceptable use</h2>
          <p>
            You must not use the Bot for unlawful content, harassment, or to obtain other people&apos;s credentials or
            secret data; you must not attempt to bypass its safeguards (prompt injection, bulk queries); and you must
            not use it commercially or resell it without permission.
          </p>
        </section>

        <section>
          <h2>4. Availability</h2>
          <p>
            The Bot is free of charge and provided &quot;as is&quot;, without any availability guarantee. Functions may
            change or be discontinued at any time. Outputs are non-binding information and may be wrong; do not spread
            the Bot&apos;s statements as facts about real people.
          </p>
        </section>

        <section>
          <h2>5. Liability</h2>
          <p>
            We are liable without limitation for intent, gross negligence, injury to life, body or health, fraudulent
            concealment, a given guarantee, and under the German Product Liability Act. For slight negligence we are
            liable only for breach of a material duty, limited to foreseeable, contract-typical damage. Mandatory
            statutory liability remains unaffected.
          </p>
        </section>

        <section>
          <h2>6. Platform and law</h2>
          <p>
            The Bot runs on Discord; Discord&apos;s own terms also apply. German law applies; mandatory
            consumer-protection rules of your country of residence remain unaffected.
          </p>
        </section>

        <section>
          <h2>7. Changes and contact</h2>
          <p>
            The current version is always published here (with the date above). Contact:{' '}
            <a href="mailto:theupsider@gmx.de">theupsider@gmx.de</a>
          </p>
        </section>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>Terms Information</h2>
        <p>
          This section provides a summary of the Terms of Service for the Discord application &quot;Augustus&quot; (the
          &quot;Bot&quot;). The Terms apply only to the Bot on Discord, not to the website davidfischer.dev.
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
              <strong>Provider:</strong> David Fischer, 87439 Kempten, Germany
            </li>
            <li>
              <strong>Contact:</strong> theupsider@gmx.de
            </li>
            <li>
              <strong>Nature of service:</strong> private, invite-only AI assistant; free of charge and provided
              &quot;as is&quot;, without any availability guarantee
            </li>
            <li>
              <strong>Platform:</strong> Discord — Discord&apos;s own terms also apply
            </li>
            <li>
              <strong>Governing law:</strong> German law; mandatory consumer-protection rules of your country of
              residence remain unaffected
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
