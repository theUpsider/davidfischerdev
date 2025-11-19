import '../index.css'
import { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://davidfischer.dev'),
  title: {
    default: 'David Fischer | Software Engineer',
    template: '%s | David Fischer'
  },
  description:
    'Software Engineer specializing in web development, system architecture, and modern JavaScript frameworks. Explore my projects, blog, and technical insights.',
  keywords: [
    'Software Engineer',
    'Web Development',
    'TypeScript',
    'React',
    'Next.js',
    'Full Stack Developer',
    'David Fischer',
    'AI',
    'Machine Learning'
  ],
  authors: [{ name: 'David Fischer' }],
  creator: 'David Fischer',
  publisher: 'David Fischer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davidfischer.dev',
    siteName: 'David Fischer',
    images: [
      {
        url: '/images/og/default.png',
        width: 1200,
        height: 630,
        alt: 'David Fischer - Software Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theUpsider',
    creator: '@theUpsider'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'David Fischer',
              url: 'https://davidfischer.dev',
              jobTitle: 'Software Engineer',
              description: 'Software Engineer specializing in web development, AI, and system architecture',
              sameAs: ['https://github.com/theUpsider', 'https://linkedin.com/in/david-fischer-824566155']
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
