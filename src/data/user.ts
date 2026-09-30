import type { UserSettings } from '@/types'

/**
 * Defaults applied to every new account. Profile data lives on the account
 * itself – see `src/data/accounts.ts`.
 */
export const defaultSettings: UserSettings = {
  defaultQuestionCount: 50,
  instantFeedback: false,
  timerEnabled: true,
  shuffleQuestions: true,
  fontScale: 'normal',
  reduceMotion: false,
  dailyReminder: true,
  dailyGoal: 10,
}
