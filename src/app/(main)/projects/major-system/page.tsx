import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import MajorSystem from '@/pages/MajorSystem'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Major System Mnemonics Generator',
  description:
    'Generate mnemonics using the Major System to remember numbers easily. Convert numbers into memorable words and phrases with this interactive tool.',
  keywords: ['Major System', 'Mnemonics', 'Memory Tool', 'Number Memory', 'Mnemonic Generator'],
  openGraph: {
    title: 'Major System Mnemonics Generator | David Fischer',
    description: 'Generate mnemonics to remember numbers using the Major System technique',
    url: 'https://davidfischer.dev/projects/major-system',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'Major System Generator'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Major System Mnemonics Generator',
    description: 'Generate mnemonics to remember numbers easily',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/projects/major-system'
  }
}

export default function MajorSystemPage() {
  return (
    <ClientOnly>
      <MajorSystem />
    </ClientOnly>
  )
}
