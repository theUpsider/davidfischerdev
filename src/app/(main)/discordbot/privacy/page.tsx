import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Privacy from '@/pages/Privacy'

export const dynamic = 'force-dynamic'

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
    <ClientOnly>
      <Privacy />
    </ClientOnly>
  )
}
