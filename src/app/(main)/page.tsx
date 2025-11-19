import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Home from '@/pages/Home'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'David Fischer | Software Engineer',
  description:
    'Software Engineer specializing in web development, AI, machine learning, and system architecture. Developer, engineer, designer, researcher, and creator passionate about innovative solutions.',
  keywords: [
    'David Fischer',
    'Software Engineer',
    'Web Development',
    'AI',
    'Machine Learning',
    'Full Stack Developer',
    'TypeScript',
    'React',
    'Next.js'
  ],
  openGraph: {
    title: 'David Fischer | Software Engineer',
    description: 'Developer, engineer, designer, researcher, and creator specializing in web development and AI',
    url: 'https://davidfischer.dev',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'David Fischer - Software Engineer'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Fischer | Software Engineer',
    description: 'Developer, engineer, designer, researcher, and creator specializing in web development and AI',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev'
  }
}

export default function HomePage() {
  return (
    <ClientOnly>
      <Home />
    </ClientOnly>
  )
}
