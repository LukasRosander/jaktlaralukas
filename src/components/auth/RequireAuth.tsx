import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'
import { ProgressProvider } from '@/store/ProgressProvider'

/**
 * Gate for everything under `/app`.
 *
 * `ProgressProvider` is keyed on the account id so switching account remounts it
 * with that account's storage key – no state can leak from the previous user.
 */
export function RequireAuth() {
  const { account } = useAuth()
  const location = useLocation()

  if (!account) {
    return <Navigate to="/logga-in" replace state={{ from: location.pathname }} />
  }

  return (
    <ProgressProvider key={account.id} accountId={account.id}>
      <Outlet />
    </ProgressProvider>
  )
}
