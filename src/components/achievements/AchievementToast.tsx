import { X } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useProgress } from '@/hooks/useProgress'

/** Announces newly unlocked badges. Auto-dismisses after a few seconds. */
export function AchievementToast() {
  const { pendingUnlocks, dismissUnlock } = useProgress()
  const first = pendingUnlocks[0]

  useEffect(() => {
    if (!first) return
    const timer = setTimeout(() => dismissUnlock(first.id), 6000)
    return () => clearTimeout(timer)
  }, [first, dismissUnlock])

  if (!first) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-pop fixed inset-x-4 bottom-24 z-50 mx-auto max-w-sm sm:inset-x-auto sm:right-6 sm:bottom-6 sm:mx-0 lg:right-8"
    >
      <div className="bg-forest-800 shadow-lift flex items-center gap-3 rounded-2xl p-3 pr-2 text-sand-100">
        <span className="bg-moss-300/20 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl">
          {first.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-moss-300 text-xs font-semibold tracking-wide uppercase">
            Nytt märke upplåst
          </p>
          <Link to="/app/framsteg" className="block truncate text-sm font-semibold hover:underline">
            {first.title}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => dismissUnlock(first.id)}
          aria-label="Stäng"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-sand-200 transition-colors hover:bg-white/10"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
