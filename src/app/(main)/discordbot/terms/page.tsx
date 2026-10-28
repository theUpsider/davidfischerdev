import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Terms from '@/pages/Terms'

export const dynamic = 'force-dynamic'

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
    <ClientOnly>
      <Terms />
    </ClientOnly>
  )
}
