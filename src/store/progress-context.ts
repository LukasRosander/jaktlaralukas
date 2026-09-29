import { createContext } from 'react'

import type {
  Achievement,
  AnswerIndex,
  BookmarkKind,
  ExamAttempt,
  ProgressState,
  Question,
  UserSettings,
} from '@/types'

export interface ProgressContextValue {
  progress: ProgressState
  /** Badges unlocked since the last dismissal, shown as toasts. */
  pendingUnlocks: Achievement[]
  dismissUnlock: (achievementId: string) => void

  isChapterCompleted: (chapterId: string) => boolean
  setChapterCompleted: (chapterId: string, completed: boolean) => void

  recordAnswer: (
    question: Question,
    selectedAnswer: AnswerIndex,
    context: 'practice' | 'exam',
  ) => void
  /** Stores the attempt and one answer record per answered slot. */
  recordExam: (attempt: ExamAttempt, examQuestions: readonly Question[]) => void

  isBookmarked: (kind: BookmarkKind, refId: string) => boolean
  toggleBookmark: (kind: BookmarkKind, refId: string) => void

  updateSettings: (patch: Partial<UserSettings>) => void
  resetProgress: () => void
  restoreDemoData: () => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)
