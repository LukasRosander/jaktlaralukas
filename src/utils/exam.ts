import { questions } from '@/data/questions'
import { shuffle } from '@/utils/random'
import type { CategoryId, CategoryScore, ExamConfig, ExamPreset, Question } from '@/types'

export interface ExamPresetDefinition {
  id: ExamPreset
  title: string
  subtitle: string
  questionCount: 25 | 50 | 70
  timeLimitMin: number
  /** Simulation mode locks the options to mimic a real exam setting. */
  locked: boolean
}

export const examPresets: ExamPresetDefinition[] = [
  {
    id: 'quick',
    title: '25 frågor',
    subtitle: 'Snabbt pass för att känna av kunskapsläget',
    questionCount: 25,
    timeLimitMin: 25,
    locked: false,
  },
  {
    id: 'standard',
    title: '50 frågor',
    subtitle: 'Halvlångt prov med bred täckning',
    questionCount: 50,
    timeLimitMin: 50,
    locked: false,
  },
  {
    id: 'full',
    title: '70 frågor',
    subtitle: 'Full längd över hela kursinnehållet',
    questionCount: 70,
    timeLimitMin: 70,
    locked: false,
  },
  {
    id: 'simulation',
    title: 'Simulera jägarexamen',
    subtitle: 'Provläge med tidspress, utan hjälpmedel och utan facit under provet',
    questionCount: 70,
    timeLimitMin: 70,
    locked: true,
  },
]

export const presetsById: Record<ExamPreset, ExamPresetDefinition> = Object.fromEntries(
  examPresets.map((preset) => [preset.id, preset]),
) as Record<ExamPreset, ExamPresetDefinition>

export function createExamConfig(
  preset: ExamPreset,
  overrides: Partial<ExamConfig> = {},
): ExamConfig {
  const definition = presetsById[preset]
  const base: ExamConfig = {
    preset,
    questionCount: definition.questionCount,
    categoryIds: [],
    shuffleQuestions: true,
    instantFeedback: false,
    timerEnabled: true,
    timeLimitMin: definition.timeLimitMin,
  }

  if (preset === 'simulation') return base
  return { ...base, ...overrides, preset }
}

/**
 * Pick the questions for an exam.
 *
 * The bank is smaller than 70 questions in the prototype, so when a learner
 * asks for more questions than exist we cycle through the bank again rather
 * than silently shortening the exam. A real backend would return a larger pool.
 */
export function buildExamQuestions(config: ExamConfig): Question[] {
  const pool =
    config.categoryIds.length === 0
      ? questions
      : questions.filter((question) => config.categoryIds.includes(question.categoryId))

  if (pool.length === 0) return []

  const ordered = config.shuffleQuestions ? shuffle(pool) : [...pool]
  const picked: Question[] = []
  let round = 0

  while (picked.length < config.questionCount) {
    const source = round === 0 ? ordered : shuffle(pool)
    for (const question of source) {
      if (picked.length >= config.questionCount) break
      picked.push(question)
    }
    round += 1
  }

  return picked
}

export function scoreByCategory(
  examQuestions: readonly Question[],
  answers: Readonly<Record<string, number>>,
): CategoryScore[] {
  const totals = new Map<CategoryId, CategoryScore>()

  examQuestions.forEach((question, index) => {
    const entry = totals.get(question.categoryId) ?? {
      categoryId: question.categoryId,
      correct: 0,
      total: 0,
    }
    entry.total += 1
    if (answers[slotKey(question.id, index)] === question.correctAnswer) entry.correct += 1
    totals.set(question.categoryId, entry)
  })

  return [...totals.values()].sort((a, b) => b.correct / b.total - a.correct / a.total)
}

/**
 * Exams can repeat a question when the bank is smaller than the requested
 * length, so answers are keyed by question id *and* position.
 */
export function slotKey(questionId: string, index: number): string {
  return `${index}:${questionId}`
}
