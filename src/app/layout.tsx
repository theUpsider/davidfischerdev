import '../index.css'
import { AppShell } from '../components/AppShell'

export const metadata = {
  title: 'David Fischer',
  description: 'Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
