import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Media from '@/pages/Media'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Media',
  description:
    'Tutorials, project deep-dives, awards and press coverage from David Fischer\u2019s work: Stable Diffusion and game engine devlogs on YouTube, ECSEE 2025 Best Paper, gamespreis-decorated VR projects.',
  keywords: ['YouTube', 'Stable Diffusion', 'Game Engine', 'Vulkan', 'NodeGrade', 'Best Paper Award', 'VR Subway Simulator'],
  openGraph: {
    title: 'Media | David Fischer',
    description: 'Tutorials, project deep-dives, awards and press coverage',
    url: 'https://davidfischer.dev/media',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'David Fischer Media'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media | David Fischer',
    description: 'Tutorials, project deep-dives, awards and press coverage',
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
