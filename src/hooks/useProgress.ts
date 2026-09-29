import { useContext } from 'react'

import { ProgressContext, type ProgressContextValue } from '@/store/progress-context'

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress måste användas inuti en ProgressProvider.')
  }
  return context
}
