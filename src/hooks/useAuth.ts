import { useContext } from 'react'

import { AuthContext, type AuthContextValue } from '@/store/auth-context'

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth måste användas inuti en AuthProvider.')
  }
  return value
}
