import { theoryCategories } from '@/data/theory'
import { categoryProgress } from '@/utils/stats'
import type { ProgressState, TheoryCategory, TheoryChapter } from '@/types'

export interface NextUpSuggestion {
  category: TheoryCategory
  chapter: TheoryChapter
  /** Category completion in percent. */
  categoryPercent: number
}

/**
 * What to put on the "Fortsätt plugga" card: the furthest started category that
 * is not finished, otherwise the first untouched one.
 */
export function nextUpChapter(progress: ProgressState): NextUpSuggestion | undefined {
  const ranked = theoryCategories
    .map((category) => ({ category, percent: categoryProgress(progress, category.id) }))
    .filter((entry) => entry.percent < 100)
    .sort((a, b) => b.percent - a.percent)

  for (const entry of ranked) {
    const chapter = entry.category.chapters.find(
      (candidate) => !progress.completedChapters.includes(candidate.id),
    )
    if (chapter) {
      return { category: entry.category, chapter, categoryPercent: entry.percent }
    }
  }

  return undefined
}

/** Recommended number of practice questions for today. */
export function recommendedQuestionCount(progress: ProgressState): number {
  return progress.settings.dailyGoal
}
