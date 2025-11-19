import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import About from '@/pages/About'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn about David Fischer, a software engineer with a Master's degree in Computer Science from the University of Applied Sciences Kempten. Passionate about deep learning, game engineering, and data science.",
  keywords: [
    'About David Fischer',
    'Software Engineer Bio',
    'Computer Science',
    'AI',
    'Machine Learning',
    'Game Engineering',
    'Data Science'
  ],
  openGraph: {
    title: 'About David Fischer',
    description:
      'Software engineer specializing in AI, machine learning, and web development. Currently working at the University of Applied Sciences Kempten.',
    url: 'https://davidfischer.dev/about',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'About David Fischer'
      }
    ],
    locale: 'en_US',
    type: 'profile'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About David Fischer',
    description: 'Software engineer specializing in AI, machine learning, and web development',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/about'
  }
}

export default function AboutPage() {
  return (
    <ClientOnly>
      <About />
    </ClientOnly>
  )
}
