import { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for the interactive Discord application "Augustus", operated by David Fischer: scope, acceptable use, warranty, liability, and contact.',
  openGraph: {
    title: 'Terms of Service | David Fischer',
    description: 'Terms of Service for the Discord application "Augustus"',
    url: 'https://davidfischer.dev/discordbot/terms',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'Terms of Service'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | David Fischer',
    description: 'Terms of Service for the Discord application "Augustus"',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/discordbot/terms'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function TermsPage() {
  return (
    <LegalPage>
      <h1>TERMS OF SERVICE //</h1>
      <p>Last updated: 2026-10-28</p>

      <section>
        <h2>1. Scope and provider</h2>
        <p>
          These Terms govern the use of the Discord application &quot;Augustus&quot; (the &quot;Bot&quot;), provided by
          David Fischer, 87439 Kempten, Germany (&quot;we&quot;, &quot;us&quot;). They apply only to the Bot, not to the
          website davidfischer.dev or any other service. By using the Bot you accept these Terms. This acceptance is not
          a data-protection consent; where we need consent, we obtain it separately and it can be withdrawn.
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
          secret data; you must not attempt to bypass its safeguards (prompt injection, bulk queries); and you must not
          use it commercially or resell it without permission.
        </p>
      </section>

      <section>
        <h2>4. Availability</h2>
        <p>
          The Bot is free of charge and provided &quot;as is&quot;, without any availability guarantee. Functions may
          change or be discontinued at any time. Outputs are non-binding information and may be wrong; do not spread the
          Bot&apos;s statements as facts about real people.
        </p>
      </section>

      <section>
        <h2>5. Liability</h2>
        <p>
          We are liable without limitation for intent, gross negligence, injury to life, body or health, fraudulent
          concealment, a given guarantee, and under the German Product Liability Act. For slight negligence we are liable
          only for breach of a material duty, limited to foreseeable, contract-typical damage. Mandatory statutory
          liability remains unaffected.
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
    </LegalPage>
  )
}
