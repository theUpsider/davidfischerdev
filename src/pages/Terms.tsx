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
            These Terms of Service (&quot;Terms&quot;) govern the use of the Discord application &quot;Augustus&quot;
            (the &quot;Bot&quot;). The Bot is provided by David Fischer, Westendstraße 15, 87439 Kempten, Germany
            (&quot;we&quot;, &quot;us&quot;). These Terms apply only to the Bot and not to any website or other service.
            By inviting the Bot to a Discord server or messaging it, you agree to these Terms. If you do not agree, do
            not use the Bot.
          </p>
        </section>

        <section>
          <h2>2. What the Bot is</h2>
          <p>
            The Bot is a personal assistant and information service. It answers messages in direct messages and in
            Discord servers where it has been invited and authorised. It is a private, invite-only service; access may be
            limited to specific servers and users at any time.
          </p>
        </section>

        <section>
          <h2>3. Requirements</h2>
          <p>
            You must be at least the minimum age required by Discord&apos;s Terms of Service to use Discord, and you must
            comply with Discord&apos;s terms and policies. You are responsible for your Discord account and for the
            content you send to the Bot.
          </p>
        </section>

        <section>
          <h2>4. Acceptable use</h2>
          <p>
            You agree not to use the Bot to violate any law; to harass, threaten, or harm others; to send unlawful,
            infringing, or harmful content; to attempt to extract credentials, secrets, or other people&apos;s personal
            data; or to abuse, overload, probe, reverse-engineer, or circumvent the Bot&apos;s access controls. We may
            restrict or revoke access at any time.
          </p>
        </section>

        <section>
          <h2>5. Availability and changes</h2>
          <p>
            The Bot is provided free of charge and &quot;as is&quot;. It may be unavailable, may answer incompletely or
            incorrectly, and may be changed or discontinued at any time without notice. We may update these Terms; the
            current version is always published at this address, and continued use after a change means you accept the
            updated Terms.
          </p>
        </section>

        <section>
          <h2>6. No professional advice</h2>
          <p>
            The Bot does not provide legal, medical, financial, or other professional advice. Do not rely on its output
            for decisions with legal, medical, financial, or safety consequences.
          </p>
        </section>

        <section>
          <h2>7. Limitation of liability</h2>
          <p>
            To the extent permitted by law, we are not liable for indirect, incidental, or consequential damages, or for
            lost data, arising from the use of or inability to use the Bot. Liability for intent, gross negligence, and
            mandatory statutory liability (including under the German Product Liability Act) remains unaffected. Where
            liability is not excluded, it is limited to the foreseeable damage typical for this type of service.
          </p>
        </section>

        <section>
          <h2>8. Third-party platform</h2>
          <p>
            The Bot operates on Discord. Your use of Discord is governed by Discord&apos;s own terms and policies, which
            we do not control.
          </p>
        </section>

        <section>
          <h2>9. Governing law and contact</h2>
          <p>
            These Terms are governed by the laws of the Federal Republic of Germany, excluding its conflict-of-law
            rules; mandatory consumer-protection rules of your country of residence remain unaffected. Contact:
            theupsider@gmx.de.
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
              <strong>Provider:</strong> David Fischer, Westendstraße 15, 87439 Kempten, Germany
            </li>
            <li>
              <strong>Contact:</strong> theupsider@gmx.de
            </li>
            <li>
              <strong>Nature of service:</strong> private, invite-only assistant; free of charge and provided
              &quot;as is&quot;
            </li>
            <li>
              <strong>Platform:</strong> Discord — Discord&apos;s own terms and policies also apply
            </li>
            <li>
              <strong>Governing law:</strong> Federal Republic of Germany; mandatory consumer-protection rules of your
              country of residence remain unaffected
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
