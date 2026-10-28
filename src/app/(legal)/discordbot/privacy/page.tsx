import { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for the interactive Discord application "Augustus": what data the Bot processes, purposes and legal basis, retention, sharing, and your rights.',
  openGraph: {
    title: 'Privacy Policy | David Fischer',
    description: 'Privacy Policy for the Discord application "Augustus"',
    url: 'https://davidfischer.dev/discordbot/privacy',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | David Fischer',
    description: 'Privacy Policy for the Discord application "Augustus"',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/discordbot/privacy'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function PrivacyPage() {
  return (
    <LegalPage>
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
            <strong>Answering your messages:</strong> Discord identifiers, message content and the context needed — Art.
            6(1)(f) GDPR (legitimate interest: operating a private assistant). See section 6 for how long context is
            kept.
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
          To generate replies, your messages are transmitted to and processed by a language model. Reply generation
          takes place in Germany; we do not use a language-model provider outside Germany. Your content is not used to
          train models.
        </p>
      </section>

      <section>
        <h2>5. Recipients</h2>
        <p>
          Discord (separately responsible, its own privacy policy). Where we use service providers to operate the Bot,
          they act as processors under Art. 28 GDPR. We do not share your data with third parties for their own
          purposes.
        </p>
      </section>

      <section>
        <h2>6. Retention</h2>
        <p>
          Conversation context needed to answer you is used while the session runs. For operations and security, session
          transcripts are archived for a limited period — up to 60 days — and then deleted. Individual messages may also
          feed the assistant&apos;s derived memory; such excerpts are kept until you ask for deletion. Technical logs: 7
          days; security-relevant at most 30 days. Records of data-protection requests: up to 3 years (limitation
          period). Data held at Discord itself cannot be deleted by the Bot — that is Discord&apos;s responsibility.
        </p>
      </section>

      <section>
        <h2>7. Objection and rights</h2>
        <p>
          You may object at any time to processing based on Art. 6(1)(f) GDPR (Art. 21 GDPR) — write to{' '}
          <a href="mailto:theupsider@gmx.de">theupsider@gmx.de</a>. You also have the right to access (Art. 15),
          rectification (16), erasure (17), restriction (18), portability (20), and withdrawal of consent (Art. 7(3)). We
          reply within one month as a rule. You have the right to complain to a supervisory authority (Art. 77),
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
    </LegalPage>
  )
}
