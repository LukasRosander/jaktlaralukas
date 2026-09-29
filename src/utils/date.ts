/** Local calendar date as `YYYY-MM-DD`, independent of timezone offsets. */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

const longDate = new Intl.DateTimeFormat('sv-SE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const shortDate = new Intl.DateTimeFormat('sv-SE', {
  day: 'numeric',
  month: 'short',
})

const monthYear = new Intl.DateTimeFormat('sv-SE', { month: 'long', year: 'numeric' })

export function formatLongDate(value: string | Date): string {
  return longDate.format(typeof value === 'string' ? new Date(value) : value)
}

export function formatShortDate(value: string | Date): string {
  return shortDate.format(typeof value === 'string' ? new Date(value) : value)
}

export function formatMonthYear(value: string | Date): string {
  return monthYear.format(typeof value === 'string' ? new Date(value) : value)
}

/** "idag", "igår" or a short date, for activity lists. */
export function formatRelativeDay(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  const today = toIsoDate(new Date())
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  if (toIsoDate(date) === today) return 'Idag'
  if (toIsoDate(date) === toIsoDate(yesterday)) return 'Igår'
  return formatShortDate(date)
}

/** Seconds as `mm:ss`, or `h:mm:ss` past an hour. */
export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  const pad = (value: number) => `${value}`.padStart(2, '0')

  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`
}

/** Whole days from today until `target`; negative once it has passed. */
export function daysUntil(target: string | Date): number {
  return daysBetween(new Date(), typeof target === 'string' ? new Date(target) : target)
}

/** Current calendar year, read once per call. */
export function currentYear(): number {
  return new Date().getFullYear()
}

export function daysBetween(from: Date, to: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime()
  return Math.round((b - a) / msPerDay)
}
