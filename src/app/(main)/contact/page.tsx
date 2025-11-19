import { Metadata } from 'next'
import { ClientOnly } from '@/components/ClientOnly'
import Contact from '@/pages/Contact'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with David Fischer for project inquiries, collaborations, or technical discussions. Connect via email, LinkedIn, or GitHub.',
  keywords: ['Contact David Fischer', 'Software Engineer Contact', 'Project Inquiries', 'Collaboration'],
  openGraph: {
    title: 'Contact David Fischer',
    description:
      'Get in touch for project inquiries, collaborations, or technical discussions. Located in Kempten, Germany.',
    url: 'https://davidfischer.dev/contact',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'Contact David Fischer'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact David Fischer',
    description: 'Get in touch for project inquiries and collaborations',
    images: ['/images/og/default.svg'],
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  alternates: {
    canonical: 'https://davidfischer.dev/contact'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function ContactPage() {
  return (
    <ClientOnly>
      <Contact />
    </ClientOnly>
  )
}
