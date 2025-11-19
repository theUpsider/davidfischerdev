import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Media from '@/pages/Media'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Media',
  description:
    'Connect with David Fischer across social media platforms. Follow for tech tutorials, project updates, development insights, and behind-the-scenes content on YouTube, Instagram, Twitter, and Facebook.',
  keywords: ['Social Media', 'YouTube', 'Instagram', 'Twitter', 'Facebook', 'Tech Content', 'Developer Content'],
  openGraph: {
    title: 'Media | David Fischer',
    description: 'Connect with me on YouTube, Instagram, Twitter, and Facebook for tech tutorials and project updates',
    url: 'https://davidfischer.dev/media',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'David Fischer Social Media'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media | David Fischer',
    description: 'Connect on social media for tech tutorials and project updates',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/media'
  }
}

export default function MediaPage() {
  return (
    <ClientOnly>
      <Media />
    </ClientOnly>
  )
}
