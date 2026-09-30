import { useCallback, useMemo, type ReactNode } from 'react'

import { createAccountList } from '@/data/accounts'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { AuthContext, type AuthResult, type SignUpInput } from '@/store/auth-context'
import { toIsoDate } from '@/utils/date'
import { createSalt, hashPassword, hashesMatch } from '@/utils/password'
import { createId } from '@/utils/random'
import type { Account } from '@/types'

const ACCOUNTS_KEY = 'jaktlara.accounts.v1'
const SESSION_KEY = 'jaktlara.session.v1'

/** Usernames are compared case-insensitively, so they are stored lowercased. */
function normalizeUsername(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * Local accounts for the prototype.
 *
 * Everything lives in localStorage, which means this is a convincing *flow*
 * rather than real security — see `src/utils/password.ts`. Each account gets its
 * own progress, because `RequireAuth` remounts `ProgressProvider` with a
 * per-account storage key.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useLocalStorage<Account[]>(ACCOUNTS_KEY, createAccountList)
  const [sessionId, setSessionId] = useLocalStorage<string | null>(SESSION_KEY, () => null)

  const account = useMemo(
    () => accounts.find((entry) => entry.id === sessionId) ?? null,
    [accounts, sessionId],
  )

  const signIn = useCallback(
    async (username: string, password: string): Promise<AuthResult> => {
      const match = accounts.find((entry) => entry.username === normalizeUsername(username))
      if (!match) {
        return { ok: false, message: 'Det finns inget konto med det användarnamnet.' }
      }
      const hash = await hashPassword(password, match.passwordSalt)
      if (!hashesMatch(hash, match.passwordHash)) {
        return { ok: false, message: 'Fel lösenord. Försök igen.' }
      }
      setSessionId(match.id)
      return { ok: true }
    },
    [accounts, setSessionId],
  )

  const signUp = useCallback(
    async ({ username, displayName, password }: SignUpInput): Promise<AuthResult> => {
      const normalized = normalizeUsername(username)
      if (accounts.some((entry) => entry.username === normalized)) {
        return { ok: false, message: 'Användarnamnet är redan taget. Välj ett annat.' }
      }
      const passwordSalt = createSalt()
      const created: Account = {
        id: createId('acc'),
        username: normalized,
        displayName: displayName.trim() || normalized,
        passwordSalt,
        passwordHash: await hashPassword(password, passwordSalt),
        createdAt: toIsoDate(new Date()),
      }
      setAccounts([...accounts, created])
      setSessionId(created.id)
      return { ok: true }
    },
    [accounts, setAccounts, setSessionId],
  )

  const signOut = useCallback(() => setSessionId(null), [setSessionId])

  const value = useMemo(
    () => ({ account, accountCount: accounts.length, signIn, signUp, signOut }),
    [account, accounts.length, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
