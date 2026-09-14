import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Research from '@/pages/Research'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research by David Fischer on automatic short answer grading, NLP-based educational assessment, generative AI in examinations, and video synthesis.',
  keywords: [
    'Research',
    'Automatic Short Answer Grading',
    'NLP',
    'NodeGrade',
    'Educational Assessment',
    'Video Synthesis'
  ],
  openGraph: {
    title: 'Research | David Fischer',
    description: 'Publications and research fields in educational assessment, NLP, and video synthesis.',
    url: 'https://davidfischer.dev/research',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'David Fischer Research'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research | David Fischer',
    description: 'Publications and research fields in educational assessment, NLP, and video synthesis.',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/research'
  }
}

export default function ResearchPage() {
  return (
    <ClientOnly>
      <Research />
    </ClientOnly>
  )
}
