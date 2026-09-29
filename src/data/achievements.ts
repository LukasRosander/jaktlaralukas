import type { Achievement } from '@/types'

/**
 * Badge definitions. Unlocking is evaluated in `src/utils/achievements.ts`
 * against the persisted progress state, so adding a badge only requires a new
 * entry here plus a matching `criteria` type in `src/types`.
 */
export const achievements: Achievement[] = [
  {
    id: 'ach-forsta-provet',
    title: 'Första provet',
    description: 'Genomför ditt första provsimulering från början till slut.',
    emoji: '🏆',
    tier: 'brons',
    criteria: { type: 'examsCompleted', target: 1 },
  },
  {
    id: 'ach-forsta-kapitlet',
    title: 'Första kapitlet',
    description: 'Markera ditt första teorikapitel som klart.',
    emoji: '🌲',
    tier: 'brons',
    criteria: { type: 'chaptersCompleted', target: 1 },
  },
  {
    id: 'ach-sju-dagar',
    title: '7 dagar i rad',
    description: 'Plugga varje dag i en hel vecka.',
    emoji: '🔥',
    tier: 'silver',
    criteria: { type: 'streakDays', target: 7 },
  },
  {
    id: 'ach-hundra-ratt',
    title: '100 rätt',
    description: 'Svara rätt på 100 frågor totalt.',
    emoji: '🎯',
    tier: 'silver',
    criteria: { type: 'correctAnswers', target: 100 },
  },
  {
    id: 'ach-artkannare',
    title: 'Artkännare',
    description: 'Svara rätt på 20 frågor om viltet i Sverige.',
    emoji: '🦌',
    tier: 'silver',
    criteria: { type: 'categoryCorrect', categoryId: 'viltet-i-sverige', target: 20 },
  },
  {
    id: 'ach-vapenkoll',
    title: 'Vapenkoll',
    description: 'Svara rätt på 15 frågor om vapen och ammunition.',
    emoji: '🔫',
    tier: 'silver',
    criteria: { type: 'categoryCorrect', categoryId: 'vapen-och-ammunition', target: 15 },
  },
  {
    id: 'ach-teorin-klar',
    title: 'Teorin klar',
    description: 'Markera samtliga teorikapitel som klara.',
    emoji: '📚',
    tier: 'guld',
    criteria: { type: 'chaptersCompleted', target: 20 },
  },
  {
    id: 'ach-lagkunnig',
    title: 'Lagkunnig',
    description: 'Läs ut hela kapitelsamlingen om lagstiftning.',
    emoji: '⚖️',
    tier: 'brons',
    criteria: { type: 'allChaptersInCategory', categoryId: 'lagstiftning' },
  },
  {
    id: 'ach-skarpt-lage',
    title: 'Skarpt läge',
    description: 'Nå minst 90 % på ett prov.',
    emoji: '⭐',
    tier: 'guld',
    criteria: { type: 'examScore', target: 90 },
  },
  {
    id: 'ach-provmaskin',
    title: 'Provmaskin',
    description: 'Genomför fem prov.',
    emoji: '📝',
    tier: 'silver',
    criteria: { type: 'examsCompleted', target: 5 },
  },
  {
    id: 'ach-uthallig',
    title: 'Uthållig',
    description: 'Håll en studiestreak i 30 dagar.',
    emoji: '🧭',
    tier: 'guld',
    criteria: { type: 'streakDays', target: 30 },
  },
  {
    id: 'ach-femhundra-ratt',
    title: '500 rätt',
    description: 'Svara rätt på 500 frågor totalt.',
    emoji: '🥇',
    tier: 'guld',
    criteria: { type: 'correctAnswers', target: 500 },
  },
]

export const achievementsById: Record<string, Achievement> = Object.fromEntries(
  achievements.map((achievement) => [achievement.id, achievement]),
)
