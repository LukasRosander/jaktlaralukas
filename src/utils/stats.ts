import { questions } from '@/data/questions'
import { categoriesById, theoryCategories, totalChapterCount } from '@/data/theory'
import { toIsoDate } from '@/utils/date'
import type {
  CategoryId,
  CategoryScore,
  DerivedStats,
  ProgressState,
  WeeklyPoint,
} from '@/types'

/** Longest run of consecutive active days ending today or yesterday. */
export function calculateStreak(activeDays: readonly string[]): number {
  if (activeDays.length === 0) return 0
  const days = new Set(activeDays)
  const cursor = new Date()

  // A streak stays alive until the end of tomorrow, so allow a one-day gap.
  if (!days.has(toIsoDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(toIsoDate(cursor))) return 0
  }

  let streak = 0
  while (days.has(toIsoDate(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function categoryBreakdown(progress: ProgressState): CategoryScore[] {
  const totals = new Map<CategoryId, CategoryScore>()

  for (const category of theoryCategories) {
    totals.set(category.id, { categoryId: category.id, correct: 0, total: 0 })
  }

  for (const answer of progress.answers) {
    const entry = totals.get(answer.categoryId)
    if (!entry) continue
    entry.total += 1
    if (answer.isCorrect) entry.correct += 1
  }

  return [...totals.values()]
}

export function deriveStats(progress: ProgressState): DerivedStats {
  const totalAnswered = progress.answers.length
  const correctAnswers = progress.answers.filter((answer) => answer.isCorrect).length
  const examScores = progress.exams.map((exam) => exam.scorePercent)

  return {
    totalAnswered,
    correctAnswers,
    incorrectAnswers: totalAnswered - correctAnswers,
    accuracy: totalAnswered === 0 ? 0 : (correctAnswers / totalAnswered) * 100,
    averageExamScore:
      examScores.length === 0
        ? 0
        : examScores.reduce((sum, score) => sum + score, 0) / examScores.length,
    bestExamScore: examScores.length === 0 ? 0 : Math.max(...examScores),
    streakDays: calculateStreak(progress.activeDays),
    completedChapterCount: progress.completedChapters.length,
    totalChapterCount,
    overallProgress:
      totalChapterCount === 0 ? 0 : (progress.completedChapters.length / totalChapterCount) * 100,
    categoryBreakdown: categoryBreakdown(progress),
  }
}

/** Completion percent for one theory category, based on completed chapters. */
export function categoryProgress(progress: ProgressState, categoryId: CategoryId): number {
  const category = categoriesById[categoryId]
  if (!category || category.chapters.length === 0) return 0
  const done = category.chapters.filter((chapter) =>
    progress.completedChapters.includes(chapter.id),
  ).length
  return (done / category.chapters.length) * 100
}

export function completedChaptersInCategory(
  progress: ProgressState,
  categoryId: CategoryId,
): number {
  const category = categoriesById[categoryId]
  if (!category) return 0
  return category.chapters.filter((chapter) => progress.completedChapters.includes(chapter.id))
    .length
}

/**
 * Accuracy per calendar week for the development chart.
 * `weeks` counts backwards from the current week.
 */
export function weeklySeries(progress: ProgressState, weeks = 5): WeeklyPoint[] {
  const buckets: WeeklyPoint[] = []
  const now = new Date()

  for (let index = weeks - 1; index >= 0; index -= 1) {
    const end = new Date(now)
    end.setDate(end.getDate() - index * 7)
    end.setHours(23, 59, 59, 999)
    const start = new Date(end)
    start.setDate(start.getDate() - 6)
    start.setHours(0, 0, 0, 0)

    const inRange = progress.answers.filter((answer) => {
      const at = new Date(answer.answeredAt).getTime()
      return at >= start.getTime() && at <= end.getTime()
    })

    const correct = inRange.filter((answer) => answer.isCorrect).length
    buckets.push({
      label: `Vecka ${weeks - index}`,
      answered: inRange.length,
      accuracy: inRange.length === 0 ? 0 : Math.round((correct / inRange.length) * 100),
    })
  }

  return buckets
}

/** Questions the learner has answered incorrectly most recently. */
export function weakestCategories(progress: ProgressState, limit = 4): CategoryScore[] {
  return categoryBreakdown(progress)
    .filter((entry) => entry.total >= 3)
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, limit)
}

/** Answers given today, used for the daily training goal. */
export function answeredToday(progress: ProgressState): number {
  const today = toIsoDate(new Date())
  return progress.answers.filter((answer) => toIsoDate(new Date(answer.answeredAt)) === today)
    .length
}

/** Question ids the learner has never answered correctly. */
export function unmasteredQuestionIds(progress: ProgressState): string[] {
  const mastered = new Set(
    progress.answers.filter((answer) => answer.isCorrect).map((answer) => answer.questionId),
  )
  return questions.filter((question) => !mastered.has(question.id)).map((question) => question.id)
}
