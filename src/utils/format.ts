const decimal = new Intl.NumberFormat('sv-SE')

export function formatNumber(value: number): string {
  return decimal.format(value)
}

/** Swedish plural helper: `pluralize(1, 'fråga', 'frågor')`. */
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

export const ANSWER_LETTERS = ['A', 'B', 'C', 'D'] as const

export function answerLetter(index: number): string {
  return ANSWER_LETTERS[index] ?? String.fromCharCode(65 + index)
}

/** Copy for a score, used on result screens. */
export function scoreVerdict(percent: number): { title: string; tone: 'good' | 'ok' | 'weak' } {
  if (percent >= 90) return { title: 'Utmärkt resultat', tone: 'good' }
  if (percent >= 80) return { title: 'Godkänt resultat', tone: 'good' }
  if (percent >= 65) return { title: 'Nästan där', tone: 'ok' }
  return { title: 'Fortsätt träna', tone: 'weak' }
}
