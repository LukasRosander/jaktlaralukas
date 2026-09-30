import { questions } from '@/data/questions'
import { defaultSettings } from '@/data/user'
import { qualifyingAchievementIds } from '@/utils/achievements'
import { toIsoDate } from '@/utils/date'
import { slotKey } from '@/utils/exam'
import type { AnswerRecord, CategoryId, ExamAttempt, ProgressState } from '@/types'

/**
 * Seeded demo progress.
 *
 * New visitors start from `createEmptyProgress()`; this believable study history
 * is opt-in from the settings page, so every screen can be reviewed with data in
 * it. When a backend exists, `GET /api/progress` replaces both – nothing else in
 * the app depends on the seed.
 */

/** Deterministic PRNG so the demo data is identical on every load. */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Streak length of the seeded learner, in days. */
export const SEED_STREAK_DAYS = 65

/** Answers per week and the accuracy the learner had that week, oldest first. */
const WEEKLY_PLAN: ReadonlyArray<{ answered: number; accuracy: number }> = [
  { answered: 75, accuracy: 0.55 },
  { answered: 86, accuracy: 0.63 },
  { answered: 95, accuracy: 0.71 },
  { answered: 100, accuracy: 0.78 },
  { answered: 102, accuracy: 0.84 },
]

/** Relative strength per subject, used to make the breakdown feel realistic. */
const CATEGORY_STRENGTH: Record<CategoryId, number> = {
  'jaktens-grunder': 0.9,
  'viltet-i-sverige': 0.92,
  'viltvard-och-ekologi': 0.84,
  jaktformer: 0.86,
  jakthundar: 0.8,
  'vapen-och-ammunition': 0.76,
  skytte: 0.83,
  jaktetik: 0.88,
  'jakt-och-sakerhet': 0.87,
  lagstiftning: 0.81,
  'praktisk-jakt': 0.79,
  artkannedom: 0.92,
}

const SEED_COMPLETED_CHAPTERS = [
  'ch-grund-intro',
  'ch-grund-ansvar',
  'ch-vilt-hjortdjur',
  'ch-vilt-vildsvin',
  'ch-vilt-rovdjur',
  'ch-eko-ekosystem',
  'ch-form-vanliga',
  'ch-etik-principer',
]

function shiftDays(from: Date, days: number): Date {
  const next = new Date(from)
  next.setDate(next.getDate() + days)
  return next
}

function buildAnswerHistory(today: Date): AnswerRecord[] {
  const random = mulberry32(20260129)
  const records: AnswerRecord[] = []
  const weekCount = WEEKLY_PLAN.length

  WEEKLY_PLAN.forEach((week, weekIndex) => {
    // Week 0 is the oldest; the last plan entry covers the most recent 7 days.
    const weeksAgo = weekCount - 1 - weekIndex
    const targetCorrect = Math.round(week.answered * week.accuracy)
    const weekRecords: AnswerRecord[] = []

    for (let i = 0; i < week.answered; i += 1) {
      const question = questions[(i * 7 + weekIndex * 13) % questions.length]
      const dayOffset = -(weeksAgo * 7) - (i % 7)
      const answeredAt = shiftDays(today, dayOffset)
      answeredAt.setHours(18, 30 + (i % 25), 0, 0)

      // Early weeks are weaker across the board; strong subjects stay strong.
      const skill = CATEGORY_STRENGTH[question.categoryId] * (week.accuracy / 0.84)
      const isCorrect = random() < skill

      weekRecords.push({
        questionId: question.id,
        categoryId: question.categoryId,
        selectedAnswer: isCorrect
          ? question.correctAnswer
          : (question.correctAnswer + 1) % question.answers.length,
        isCorrect,
        answeredAt: answeredAt.toISOString(),
        context: 'practice',
      })
    }

    balanceCorrectCount(weekRecords, targetCorrect)
    records.push(...weekRecords)
  })

  return records.sort((a, b) => a.answeredAt.localeCompare(b.answeredAt))
}

/** Flip individual answers until the week hits its exact accuracy target. */
function balanceCorrectCount(records: AnswerRecord[], targetCorrect: number): void {
  const setCorrect = (record: AnswerRecord, correct: boolean) => {
    const question = questions.find((item) => item.id === record.questionId)
    if (!question) return
    record.isCorrect = correct
    record.selectedAnswer = correct
      ? question.correctAnswer
      : (question.correctAnswer + 1) % question.answers.length
  }

  let correct = records.filter((record) => record.isCorrect).length
  for (const record of records) {
    if (correct === targetCorrect) break
    if (correct > targetCorrect && record.isCorrect) {
      setCorrect(record, false)
      correct -= 1
    } else if (correct < targetCorrect && !record.isCorrect) {
      setCorrect(record, true)
      correct += 1
    }
  }
}

function buildExamHistory(today: Date): ExamAttempt[] {
  const plan = [
    { daysAgo: 19, correct: 42, total: 50, durationSec: 38 * 60 + 21 },
    { daysAgo: 11, correct: 37, total: 50, durationSec: 41 * 60 + 8 },
    { daysAgo: 3, correct: 45, total: 50, durationSec: 34 * 60 + 52 },
  ]

  return plan.map((entry, index) => {
    const completedAt = shiftDays(today, -entry.daysAgo)
    completedAt.setHours(20, 15, 0, 0)
    // The bank is smaller than a full exam, so slots cycle through it.
    const picked = Array.from(
      { length: entry.total },
      (_, slot) => questions[slot % questions.length],
    )
    const random = mulberry32(90210 + index)

    const categoryScores = Object.entries(CATEGORY_STRENGTH).map(([categoryId, strength]) => {
      const total = 4 + Math.floor(random() * 4)
      const ratio = Math.min(1, strength * (entry.correct / entry.total) * 1.12)
      return {
        categoryId: categoryId as CategoryId,
        correct: Math.round(total * ratio),
        total,
      }
    })

    return {
      id: `seed-exam-${index + 1}`,
      completedAt: completedAt.toISOString(),
      config: {
        preset: 'standard',
        questionCount: 50,
        categoryIds: [],
        shuffleQuestions: true,
        instantFeedback: false,
        timerEnabled: true,
        timeLimitMin: 60,
      },
      questionIds: picked.map((question) => question.id),
      answers: Object.fromEntries(
        picked.map((question, questionIndex) => [
          slotKey(question.id, questionIndex),
          questionIndex < entry.correct
            ? question.correctAnswer
            : (question.correctAnswer + 1) % question.answers.length,
        ]),
      ),
      correctCount: entry.correct,
      totalCount: entry.total,
      scorePercent: Math.round((entry.correct / entry.total) * 100),
      durationSec: entry.durationSec,
      categoryScores,
    }
  })
}

export function createSeedProgress(today: Date = new Date()): ProgressState {
  const activeDays = Array.from({ length: SEED_STREAK_DAYS }, (_, index) =>
    toIsoDate(shiftDays(today, -index)),
  )

  const unlockedAt = shiftDays(today, -1).toISOString()
  const state: ProgressState = {
    completedChapters: SEED_COMPLETED_CHAPTERS,
    answers: buildAnswerHistory(today),
    exams: buildExamHistory(today),
    bookmarks: [
      { kind: 'theory', refId: 'ch-vilt-hjortdjur', savedAt: shiftDays(today, -12).toISOString() },
      {
        kind: 'theory',
        refId: 'ch-lag-vapen-jakttider',
        savedAt: shiftDays(today, -8).toISOString(),
      },
      { kind: 'question', refId: 'q-hund-002', savedAt: shiftDays(today, -6).toISOString() },
      { kind: 'question', refId: 'q-vapen-003', savedAt: shiftDays(today, -5).toISOString() },
      { kind: 'question', refId: 'q-vilt-009', savedAt: shiftDays(today, -2).toISOString() },
    ],
    unlockedAchievements: [],
    activeDays,
    settings: defaultSettings,
  }

  // Bake in the badges the seeded history already qualifies for, so the demo
  // learner does not get a burst of unlock toasts on first load.
  return {
    ...state,
    unlockedAchievements: qualifyingAchievementIds(state).map((achievementId) => ({
      achievementId,
      unlockedAt,
    })),
  }
}

/** Empty state, used by "nollställ framsteg" in settings. */
export function createEmptyProgress(): ProgressState {
  return {
    completedChapters: [],
    answers: [],
    exams: [],
    bookmarks: [],
    unlockedAchievements: [],
    activeDays: [],
    settings: defaultSettings,
  }
}
