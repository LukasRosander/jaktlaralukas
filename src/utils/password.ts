/**
 * Password helpers for the prototype's local accounts.
 *
 * Hashing in the browser does not make this secure — an attacker with access to
 * localStorage can simply replace the stored hash. The point is narrower: no
 * password is written to disk in plain text, and the login flow has the same
 * shape it would have against a real backend, so swapping in `POST /api/login`
 * later touches only `AuthProvider`.
 */

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

/** Random salt, unique per account. */
export function createSalt(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return toHex(bytes.buffer)
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoded = new TextEncoder().encode(`${salt}:${password}`)
  return toHex(await crypto.subtle.digest('SHA-256', encoded))
}

/** Constant-time-ish comparison. Cheap, and avoids a trivially timeable early exit. */
export function hashesMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export interface PasswordRule {
  test: (value: string) => boolean
  message: string
}

/**
 * Intentionally forgiving, because the demo account uses `12345`. A real product
 * would enforce length and check against a breached-password list.
 */
export const passwordRules: PasswordRule[] = [
  { test: (value) => value.length >= 4, message: 'Lösenordet måste vara minst 4 tecken.' },
]

export const usernameRules: PasswordRule[] = [
  { test: (value) => value.trim().length >= 3, message: 'Användarnamnet måste vara minst 3 tecken.' },
  {
    test: (value) => /^[a-z0-9._-]+$/i.test(value.trim()),
    message: 'Använd bara bokstäver, siffror, punkt, bindestreck eller understreck.',
  },
]

/** First failing rule, or undefined when the value is fine. */
export function firstError(rules: PasswordRule[], value: string): string | undefined {
  return rules.find((rule) => !rule.test(value))?.message
}
