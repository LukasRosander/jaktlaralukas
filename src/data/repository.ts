import { achievements } from '@/data/achievements'
import { questions, questionsById } from '@/data/questions'
import { allChapters, categoriesById, chaptersById, theoryCategories } from '@/data/theory'
import type {
  Achievement,
  CategoryId,
  Question,
  TheoryCategory,
  TheoryChapter,
} from '@/types'

/**
 * Content access boundary.
 *
 * Every screen reads content through this module instead of importing the mock
 * data directly. Swapping in a real backend then means replacing the bodies
 * below with `fetch` calls – the return types already are promises.
 *
 *   export async function getQuestions() {
 *     const response = await fetch('/api/questions')
 *     return response.json() as Promise<Question[]>
 *   }
 */
const simulateLatency = false

async function resolve<T>(value: T): Promise<T> {
  if (simulateLatency) {
    await new Promise((done) => setTimeout(done, 250))
  }
  return value
}

export function getTheoryCategories(): TheoryCategory[] {
  return theoryCategories
}

export function getTheoryCategory(id: CategoryId): TheoryCategory | undefined {
  return categoriesById[id]
}

export function getChapter(id: string): TheoryChapter | undefined {
  return chaptersById[id]
}

export function getAllChapters(): TheoryChapter[] {
  return allChapters
}

export function getQuestions(): Question[] {
  return questions
}

export function getQuestion(id: string): Question | undefined {
  return questionsById[id]
}

export function getQuestionsByCategory(categoryIds: readonly CategoryId[]): Question[] {
  if (categoryIds.length === 0) return questions
  return questions.filter((question) => categoryIds.includes(question.categoryId))
}

export function getAchievements(): Achievement[] {
  return achievements
}

/**
 * Async variants, kept for the eventual API migration. The profile is not here:
 * it comes from the signed-in account via `useProfile`, so a real backend would
 * expose it as `GET /api/me` next to the login endpoint instead.
 */
export const api = {
  theoryCategories: () => resolve(theoryCategories),
  questions: () => resolve(questions),
  achievements: () => resolve(achievements),
}
