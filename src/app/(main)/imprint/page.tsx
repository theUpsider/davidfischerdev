import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Imprint from '@/pages/Imprint'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Imprint & Privacy Policy',
  description:
    "Legal information, privacy policy, and imprint for David Fischer's website. Information about data protection, personal data handling, and contact details.",
  openGraph: {
    title: 'Imprint & Privacy Policy | David Fischer',
    description: 'Legal information and privacy policy',
    url: 'https://davidfischer.dev/imprint',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'Imprint'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imprint & Privacy Policy | David Fischer',
    description: 'Legal information and privacy policy',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/imprint'
  },
  robots: {
    index: false,
    follow: true
  }
}

export default function ImprintPage() {
  return (
    <ClientOnly>
      <Imprint />
    </ClientOnly>
  )
}
