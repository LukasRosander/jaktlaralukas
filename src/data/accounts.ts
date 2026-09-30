import { images } from '@/data/images'
import type { Account, UserProfile } from '@/types'

/**
 * The account that ships with the prototype so the app can be tried without
 * signing up first. Username `lukasrosander`, password `12345`.
 *
 * The hash is precomputed from `"jaktlara-demo:12345"` so the seed needs no
 * async work at startup.
 */
export const demoAccount: Account = {
  id: 'acc-lukasrosander',
  username: 'lukasrosander',
  displayName: 'Lukas',
  passwordSalt: 'jaktlara-demo',
  passwordHash: '96c75194fa07feb5c6c54324570d3bfe854641e6eb23dbd4e1e6755ecb525993',
  createdAt: '2026-01-04',
  examGoalDate: '2026-11-14',
}

/** Credentials shown as a hint on the login page. */
export const demoCredentials = { username: 'lukasrosander', password: '12345' }

/**
 * Avatars are bundled images rather than uploads in this version. New accounts
 * get a neutral mark generated from their initials instead.
 */
export const demoAvatar = images.avatarLukas

export function createAccountList(): Account[] {
  return [demoAccount]
}

/**
 * The shape the interface renders. Only the seeded account has a portrait –
 * accounts created in the app fall back to initials, since there is nowhere to
 * upload an image in this version.
 */
export function profileFromAccount(account: Account): UserProfile {
  return {
    name: account.displayName,
    memberSince: account.createdAt,
    avatar: account.id === demoAccount.id ? demoAvatar : '',
    examGoalDate: account.examGoalDate,
  }
}
