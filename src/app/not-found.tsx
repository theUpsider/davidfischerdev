import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
      <h1>404 - Page Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/" style={{ color: '#61dafb' }}>
        Return Home
      </Link>
    </div>
  )
}
