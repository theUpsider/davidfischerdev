import { useState, useEffect } from 'react'

export const useMediaQueryCustom = () => {
  const [matches, setMatches] = useState(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 768px)').matches
    }
    // Default to false during SSR
    return false
  })

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return

    const handler = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => setMatches(e.matches)
    const matchMedia = window.matchMedia('(min-width: 768px)')

    // Set initial value
    setMatches(matchMedia.matches)

    matchMedia.addEventListener('change', handler)
    // Cleanup function to remove the event listener
    return () => matchMedia.removeEventListener('change', handler)
  }, [])
  return matches
}
