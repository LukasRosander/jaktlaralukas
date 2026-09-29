import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset scroll position on navigation, the way a native app would. */
export function useScrollToTop(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}
