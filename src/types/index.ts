/**
 * Domain model for Jaktlära.
 *
 * Every entity is a plain, serialisable object so the current mock data layer
 * (`src/data`) can later be swapped for a real REST/GraphQL API without
 * touching the UI. See `src/data/repository.ts` for the access boundary.
 */

/** A verifiable reference backing a question or a theory section. */
export interface ContentSource {
  /** Human readable label, e.g. "Naturvårdsverket – Jakttider". */
  label: string
  /** Publisher, e.g. "Naturvårdsverket", "Riksdagen". */
  publisher?: string
  url?: string
  /** ISO date (YYYY-MM-DD) when the source was last checked. */
  retrievedAt?: string
}

export type CategoryId =
  | 'jaktens-grunder'
  | 'viltet-i-sverige'
  | 'viltvard-och-ekologi'
  | 'jaktformer'
  | 'jakthundar'
  | 'vapen-och-ammunition'
  | 'skytte'
  | 'jaktetik'
  | 'jakt-och-sakerhet'
  | 'lagstiftning'
  | 'praktisk-jakt'
  | 'artkannedom'

export type Difficulty = 'lätt' | 'medel' | 'svår'

/** Index of the correct alternative in `Question.answers` (0 = A). */
export type AnswerIndex = number

export interface Question {
  id: string
  categoryId: CategoryId
  question: string
  /** Always four alternatives, rendered as A–D. */
  answers: string[]
  correctAnswer: AnswerIndex
  explanation: string
  difficulty: Difficulty
  /** Free-form tags used for filtering, e.g. ["älg", "artkännedom"]. */
  tags?: string[]
  sources?: ContentSource[]
}

/** A rich text block inside a theory chapter. */
export type TheoryBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'fact'; title: string; text: string }
  | { kind: 'important'; title?: string; items: string[] }
  | { kind: 'image'; src: string; alt: string; caption?: string }
  | { kind: 'table'; headings: string[]; rows: string[][] }

export interface TheoryChapter {
  id: string
  categoryId: CategoryId
  title: string
  /** Short teaser shown in lists. */
  summary: string
  /** Estimated reading time in minutes. */
  readingTimeMin: number
  blocks: TheoryBlock[]
  sources?: ContentSource[]
}

export interface TheoryCategory {
  id: CategoryId
  /** Display order in the theory overview. */
  order: number
  title: string
  description: string
  /** Imported image URL (bundled asset). */
  image: string
  /** Lucide icon name used for compact surfaces. */
  icon: string
  chapters: TheoryChapter[]
}

export type AchievementTier = 'brons' | 'silver' | 'guld'

export interface Achievement {
  id: string
  title: string
  description: string
  /** Emoji used as the badge face. */
  emoji: string
  tier: AchievementTier
  /** How the badge is unlocked, evaluated against the progress state. */
  criteria: AchievementCriteria
}

export type AchievementCriteria =
  | { type: 'chaptersCompleted'; target: number }
  | { type: 'correctAnswers'; target: number }
  | { type: 'examsCompleted'; target: number }
  | { type: 'streakDays'; target: number }
  | { type: 'categoryCorrect'; categoryId: CategoryId; target: number }
  | { type: 'examScore'; target: number }
  | { type: 'allChaptersInCategory'; categoryId: CategoryId }

export interface UnlockedAchievement {
  achievementId: string
  /** ISO timestamp. */
  unlockedAt: string
}

/** One answered question, used for statistics and review. */
export interface AnswerRecord {
  questionId: string
  categoryId: CategoryId
  selectedAnswer: AnswerIndex
  isCorrect: boolean
  /** ISO timestamp. */
  answeredAt: string
  /** Where the answer was given. */
  context: 'practice' | 'exam'
}

export type ExamPreset = 'quick' | 'standard' | 'full' | 'simulation'

export interface ExamConfig {
  preset: ExamPreset
  questionCount: 25 | 50 | 70
  /** Empty array means all categories. */
  categoryIds: CategoryId[]
  shuffleQuestions: boolean
  /** Reveal the correct answer right after each pick. */
  instantFeedback: boolean
  timerEnabled: boolean
  /** Total time budget in minutes, when the timer is on. */
  timeLimitMin: number
}

export interface CategoryScore {
  categoryId: CategoryId
  correct: number
  total: number
}

export interface ExamAttempt {
  id: string
  /** ISO timestamp for when the attempt was finished. */
  completedAt: string
  config: ExamConfig
  questionIds: string[]
  /**
   * Selected alternative per question slot, keyed by `"<index>:<questionId>"`
   * (see `slotKey` in `src/utils/exam.ts`). Slots are used because a question
   * can appear more than once in the same exam.
   */
  answers: Record<string, AnswerIndex>
  correctCount: number
  totalCount: number
  /** Whole percent, 0–100. */
  scorePercent: number
  /** Elapsed time in seconds. */
  durationSec: number
  categoryScores: CategoryScore[]
}

export type BookmarkKind = 'theory' | 'question'

export interface Bookmark {
  kind: BookmarkKind
  /** Chapter id or question id. */
  refId: string
  /** ISO timestamp. */
  savedAt: string
}

export interface UserProfile
  extends Readonly<{
    name: string
    /** ISO date. */
    memberSince: string
    avatar: string
    /** Target exam date, used for gentle nudges. */
    examGoalDate?: string
  }> {}

/**
 * A local account in the prototype.
 *
 * This is deliberately *not* a security model: the record lives in the
 * browser's localStorage, so anyone with access to the device can read it. The
 * password is salted and hashed only so it is not lying around in plain text —
 * real authentication belongs on a server. See the README.
 */
export interface Account {
  id: string
  /** Lowercase, unique, used to sign in. */
  username: string
  /** Name shown in the interface. */
  displayName: string
  passwordSalt: string
  /** SHA-256 of `"<salt>:<password>"`, hex encoded. */
  passwordHash: string
  /** ISO date. */
  createdAt: string
  /** Target exam date, used for gentle nudges. */
  examGoalDate?: string
}

export interface UserSettings {
  defaultQuestionCount: 25 | 50 | 70
  instantFeedback: boolean
  timerEnabled: boolean
  /** Randomise the order questions appear in during practice. */
  shuffleQuestions: boolean
  fontScale: 'liten' | 'normal' | 'stor'
  reduceMotion: boolean
  /** Reminder banner on the dashboard. */
  dailyReminder: boolean
  dailyGoal: number
}

/** Everything the app persists about one learner. */
export interface ProgressState {
  /** Chapter ids marked as completed. */
  completedChapters: string[]
  answers: AnswerRecord[]
  exams: ExamAttempt[]
  bookmarks: Bookmark[]
  unlockedAchievements: UnlockedAchievement[]
  /** ISO dates (YYYY-MM-DD) with at least one study activity. */
  activeDays: string[]
  settings: UserSettings
}

/** Aggregated numbers derived from `ProgressState`. */
export interface DerivedStats {
  totalAnswered: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: number
  averageExamScore: number
  bestExamScore: number
  streakDays: number
  completedChapterCount: number
  totalChapterCount: number
  overallProgress: number
  categoryBreakdown: CategoryScore[]
}

export interface WeeklyPoint {
  label: string
  accuracy: number
  answered: number
}
