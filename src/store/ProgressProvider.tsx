import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { achievementsById } from '@/data/achievements'
import { createEmptyProgress, createSeedProgress } from '@/data/statistics'
import { defaultSettings } from '@/data/user'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ProgressContext, type ProgressContextValue } from '@/store/progress-context'
import { qualifyingAchievementIds } from '@/utils/achievements'
import { toIsoDate } from '@/utils/date'
import { slotKey } from '@/utils/exam'
import type {
  Achievement,
  AnswerIndex,
  AnswerRecord,
  BookmarkKind,
  ExamAttempt,
  ProgressState,
  Question,
  UserSettings,
} from '@/types'

/**
 * Bumped when the default first-run state changes, so existing browsers start
 * over instead of keeping a save that no longer matches the defaults.
 */
const STORAGE_KEY = 'jaktlara.progress.v2'

const FONT_SCALES: Record<UserSettings['fontScale'], string> = {
  liten: '0.9375',
  normal: '1',
  stor: '1.125',
}

/** Merge stored state with defaults so older saves keep working. */
function normalize(state: ProgressState): ProgressState {
  return {
    ...createEmptyProgress(),
    ...state,
    settings: { ...defaultSettings, ...state.settings },
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  // New visitors start from zero. Demo data is opt-in from the settings page.
  const [stored, setStored] = useLocalStorage<ProgressState>(STORAGE_KEY, createEmptyProgress)
  const progress = useMemo(() => normalize(stored), [stored])
  const [pendingUnlockIds, setPendingUnlockIds] = useState<string[]>([])

  /**
   * Apply a change, register today as an active study day and unlock any badge
   * the change qualifies for. Doing it here rather than in an effect keeps the
   * unlock tied to the action that caused it.
   */
  const mutate = useCallback(
    (updater: (current: ProgressState) => ProgressState, markActive = true) => {
      let next = updater(progress)

      if (markActive) {
        const today = toIsoDate(new Date())
        if (!next.activeDays.includes(today)) {
          next = { ...next, activeDays: [...next.activeDays, today] }
        }
      }

      const known = new Set(next.unlockedAchievements.map((entry) => entry.achievementId))
      const fresh = qualifyingAchievementIds(next).filter((id) => !known.has(id))

      if (fresh.length > 0) {
        const unlockedAt = new Date().toISOString()
        next = {
          ...next,
          unlockedAchievements: [
            ...next.unlockedAchievements,
            ...fresh.map((achievementId) => ({ achievementId, unlockedAt })),
          ],
        }
        setPendingUnlockIds((current) => [...current, ...fresh])
      }

      setStored(next)
    },
    [progress, setStored],
  )

  // Settings that affect the document root.
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--app-font-scale',
      FONT_SCALES[progress.settings.fontScale],
    )
    document.documentElement.classList.toggle('reduce-motion', progress.settings.reduceMotion)
  }, [progress.settings.fontScale, progress.settings.reduceMotion])

  const isChapterCompleted = useCallback(
    (chapterId: string) => progress.completedChapters.includes(chapterId),
    [progress.completedChapters],
  )

  const setChapterCompleted = useCallback(
    (chapterId: string, completed: boolean) => {
      mutate((current) => ({
        ...current,
        completedChapters: completed
          ? [...new Set([...current.completedChapters, chapterId])]
          : current.completedChapters.filter((id) => id !== chapterId),
      }))
    },
    [mutate],
  )

  const recordAnswer = useCallback(
    (question: Question, selectedAnswer: AnswerIndex, context: 'practice' | 'exam') => {
      mutate((current) => ({
        ...current,
        answers: [
          ...current.answers,
          {
            questionId: question.id,
            categoryId: question.categoryId,
            selectedAnswer,
            isCorrect: selectedAnswer === question.correctAnswer,
            answeredAt: new Date().toISOString(),
            context,
          },
        ],
      }))
    },
    [mutate],
  )

  const recordExam = useCallback(
    (attempt: ExamAttempt, examQuestions: readonly Question[]) => {
      const answeredAt = new Date().toISOString()
      const records: AnswerRecord[] = examQuestions.flatMap((question, index) => {
        const selectedAnswer = attempt.answers[slotKey(question.id, index)]
        if (selectedAnswer === undefined) return []
        return [
          {
            questionId: question.id,
            categoryId: question.categoryId,
            selectedAnswer,
            isCorrect: selectedAnswer === question.correctAnswer,
            answeredAt,
            context: 'exam' as const,
          },
        ]
      })

      mutate((current) => ({
        ...current,
        exams: [...current.exams, attempt],
        answers: [...current.answers, ...records],
      }))
    },
    [mutate],
  )

  const isBookmarked = useCallback(
    (kind: BookmarkKind, refId: string) =>
      progress.bookmarks.some((bookmark) => bookmark.kind === kind && bookmark.refId === refId),
    [progress.bookmarks],
  )

  const toggleBookmark = useCallback(
    (kind: BookmarkKind, refId: string) => {
      mutate((current) => {
        const exists = current.bookmarks.some(
          (bookmark) => bookmark.kind === kind && bookmark.refId === refId,
        )
        return {
          ...current,
          bookmarks: exists
            ? current.bookmarks.filter(
                (bookmark) => !(bookmark.kind === kind && bookmark.refId === refId),
              )
            : [...current.bookmarks, { kind, refId, savedAt: new Date().toISOString() }],
        }
      }, false)
    },
    [mutate],
  )

  const updateSettings = useCallback(
    (patch: Partial<UserSettings>) => {
      mutate((current) => ({ ...current, settings: { ...current.settings, ...patch } }), false)
    },
    [mutate],
  )

  const resetProgress = useCallback(() => {
    setPendingUnlockIds([])
    setStored({ ...createEmptyProgress(), settings: progress.settings })
  }, [progress.settings, setStored])

  const restoreDemoData = useCallback(() => {
    setPendingUnlockIds([])
    setStored({ ...createSeedProgress(), settings: progress.settings })
  }, [progress.settings, setStored])

  const dismissUnlock = useCallback((achievementId: string) => {
    setPendingUnlockIds((current) => current.filter((id) => id !== achievementId))
  }, [])

  const pendingUnlocks = useMemo<Achievement[]>(
    () =>
      pendingUnlockIds
        .map((id) => achievementsById[id])
        .filter((achievement): achievement is Achievement => Boolean(achievement)),
    [pendingUnlockIds],
  )

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      pendingUnlocks,
      dismissUnlock,
      isChapterCompleted,
      setChapterCompleted,
      recordAnswer,
      recordExam,
      isBookmarked,
      toggleBookmark,
      updateSettings,
      resetProgress,
      restoreDemoData,
    }),
    [
      progress,
      pendingUnlocks,
      dismissUnlock,
      isChapterCompleted,
      setChapterCompleted,
      recordAnswer,
      recordExam,
      isBookmarked,
      toggleBookmark,
      updateSettings,
      resetProgress,
      restoreDemoData,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
