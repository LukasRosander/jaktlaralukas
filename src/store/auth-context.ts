import { createContext } from 'react'

import type { Account } from '@/types'

export type AuthResult = { ok: true } | { ok: false; message: string }

export interface SignUpInput {
  username: string
  displayName: string
  password: string
}

export interface AuthContextValue {
  /** The signed-in account, or null when nobody is signed in. */
  account: Account | null
  /** How many accounts exist locally. Used for copy on the login page. */
  accountCount: number
  signIn: (username: string, password: string) => Promise<AuthResult>
  signUp: (input: SignUpInput) => Promise<AuthResult>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
