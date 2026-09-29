import { achievements } from '@/data/achievements'
import { categoriesById } from '@/data/theory'
import { calculateStreak } from '@/utils/stats'
import type { Achievement, ProgressState } from '@/types'

/** Current value and target for one badge, used for the progress bars. */
export interface AchievementStatus {
  achievement: Achievement
  unlocked: boolean
  current: number
  target: number
}

function evaluate(achievement: Achievement, progress: ProgressState): { current: number; target: number } {
  const { criteria } = achievement

  switch (criteria.type) {
    case 'chaptersCompleted':
      return { current: progress.completedChapters.length, target: criteria.target }

    case 'correctAnswers':
      return {
        current: progress.answers.filter((answer) => answer.isCorrect).length,
        target: criteria.target,
      }

    case 'examsCompleted':
      return { current: progress.exams.length, target: criteria.target }

    case 'streakDays':
      return { current: calculateStreak(progress.activeDays), target: criteria.target }

    case 'categoryCorrect':
      return {
        current: progress.answers.filter(
          (answer) => answer.isCorrect && answer.categoryId === criteria.categoryId,
        ).length,
        target: criteria.target,
      }

    case 'examScore': {
      const best = progress.exams.reduce((max, exam) => Math.max(max, exam.scorePercent), 0)
      return { current: best, target: criteria.target }
    }

    case 'allChaptersInCategory': {
      const category = categoriesById[criteria.categoryId]
      const chapters = category?.chapters ?? []
      const done = chapters.filter((chapter) => progress.completedChapters.includes(chapter.id))
      return { current: done.length, target: Math.max(1, chapters.length) }
    }
  }
}

export function achievementStatuses(progress: ProgressState): AchievementStatus[] {
  return achievements.map((achievement) => {
    const { current, target } = evaluate(achievement, progress)
    return {
      achievement,
      current: Math.min(current, target),
      target,
      unlocked: current >= target,
    }
  })
}

/** Ids that qualify right now, regardless of whether they were already stored. */
export function qualifyingAchievementIds(progress: ProgressState): string[] {
  return achievementStatuses(progress)
    .filter((status) => status.unlocked)
    .map((status) => status.achievement.id)
}
