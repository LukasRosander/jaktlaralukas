import { Bookmark, BookmarkCheck } from 'lucide-react'

import { useProgress } from '@/hooks/useProgress'
import { cn } from '@/utils/cn'
import type { BookmarkKind } from '@/types'

/** Toggles a saved item and reflects the current state. */
export function BookmarkButton({
  kind,
  refId,
  variant = 'icon',
  className,
}: {
  kind: BookmarkKind
  refId: string
  variant?: 'icon' | 'labelled'
  className?: string
}) {
  const { isBookmarked, toggleBookmark } = useProgress()
  const saved = isBookmarked(kind, refId)
  const label = saved ? 'Ta bort från sparat' : 'Spara'

  if (variant === 'labelled') {
    return (
      <button
        type="button"
        onClick={() => toggleBookmark(kind, refId)}
        aria-pressed={saved}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
          saved
            ? 'border-moss-300 bg-moss-100 text-forest-700'
            : 'border-sand-300 text-ink-600 bg-white hover:border-forest-300',
          className,
        )}
      >
        {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        {saved ? 'Sparad' : 'Spara'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(kind, refId)}
      aria-label={label}
      title={label}
      aria-pressed={saved}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full transition-colors duration-200',
        saved ? 'bg-moss-100 text-forest-600' : 'text-ink-400 hover:bg-sand-100 hover:text-ink-700',
        className,
      )}
    >
      {saved ? <BookmarkCheck className="size-4.5" /> : <Bookmark className="size-4.5" />}
    </button>
  )
}
