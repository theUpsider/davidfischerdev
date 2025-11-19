import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Projects from '@/pages/Projects'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Explore David Fischer's portfolio of software engineering projects including NodeGrade, ComfyUI-Logic, VR applications, and machine learning research. Award-winning projects in AI, game development, and web technologies.",
  keywords: [
    'Software Projects',
    'Portfolio',
    'NodeGrade',
    'ComfyUI',
    'VR Development',
    'Machine Learning',
    'Game Development',
    'Open Source'
  ],
  openGraph: {
    title: 'Projects | David Fischer',
    description: 'Award-winning projects in AI, machine learning, game development, and web technologies',
    url: 'https://davidfischer.dev/projects',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'David Fischer Projects'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | David Fischer',
    description: 'Award-winning projects in AI, machine learning, and game development',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/projects'
  }
}

export default function ProjectsPage() {
  return (
    <ClientOnly>
      <Projects />
    </ClientOnly>
  )
}
