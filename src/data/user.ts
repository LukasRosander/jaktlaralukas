import { images } from '@/data/images'
import type { UserProfile, UserSettings } from '@/types'

/**
 * Mock profile. When a backend is added this becomes the response of
 * `GET /api/me` and the avatar an uploaded URL.
 */
export const mockProfile: UserProfile = {
  name: 'Lukas',
  memberSince: '2026-01-04',
  avatar: images.avatarLukas,
  examGoalDate: '2026-11-14',
}

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
