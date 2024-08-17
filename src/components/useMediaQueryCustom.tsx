import { useState, useEffect } from 'react'

export const useMediaQueryCustom = () => {
  const [matches, setMatches] = useState(window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const handler = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => setMatches(e.matches)
    const matchMedia = window.matchMedia('(min-width: 768px)')

    matchMedia.addEventListener('change', handler)
    // Cleanup function to remove the event listener
    return () => matchMedia.removeEventListener('change', handler)
  }, [])
  return matches
}
