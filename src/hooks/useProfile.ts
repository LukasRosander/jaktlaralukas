import { useMemo } from 'react'

import { profileFromAccount } from '@/data/accounts'
import { useAuth } from '@/hooks/useAuth'
import type { UserProfile } from '@/types'

/**
 * The signed-in account rendered as a profile. Only usable inside the
 * authenticated part of the app, where an account is guaranteed to exist.
 */
export function useProfile(): UserProfile {
  const { account } = useAuth()
  const profile = useMemo(() => (account ? profileFromAccount(account) : null), [account])
  if (!profile) {
    throw new Error('useProfile kräver ett inloggat konto.')
  }
  return profile
}
