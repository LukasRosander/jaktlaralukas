import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * For public pages reached through links like `/#innehall`: client-side
 * navigation does not scroll to the fragment on its own, so do it here and
 * fall back to the top of the page when there is no fragment.
 */
export function useScrollToHash(): void {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
}
