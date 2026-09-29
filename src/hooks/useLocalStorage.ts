import { useCallback, useEffect, useState } from 'react'

/**
 * Persisted state with a lazy initialiser.
 *
 * Reads are guarded so a corrupt or missing value falls back to the default
 * instead of breaking the app. Writes are best-effort: private browsing modes
 * can reject them.
 */
export function useLocalStorage<T>(
  key: string,
  createInitial: () => T,
): [T, (next: T | ((current: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored) return JSON.parse(stored) as T
    } catch {
      // Ignore and fall through to the default.
    }
    return createInitial()
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage unavailable – the app still works for this session.
    }
  }, [key, value])

  const update = useCallback((next: T | ((current: T) => T)) => {
    setValue((current) => (typeof next === 'function' ? (next as (c: T) => T)(current) : next))
  }, [])

  return [value, update]
}
