import { Timer } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/cn'
import { formatDuration } from '@/utils/date'

export interface ExamTimerProps {
  /** Counts down from this many seconds; counts up when omitted. */
  limitSec?: number
  running: boolean
  /** Called once when a countdown reaches zero. */
  onExpire?: () => void
  /** Reports elapsed seconds on every tick so the parent can store it. */
  onTick?: (elapsedSec: number) => void
}

export function ExamTimer({ limitSec, running, onExpire, onTick }: ExamTimerProps) {
  const [elapsed, setElapsed] = useState(0)
  const expiredRef = useRef(false)
  const onExpireRef = useRef(onExpire)
  const onTickRef = useRef(onTick)

  // Keep the latest callbacks without restarting the interval each render.
  useEffect(() => {
    onExpireRef.current = onExpire
    onTickRef.current = onTick
  }, [onExpire, onTick])

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setElapsed((current) => {
        const next = current + 1
        onTickRef.current?.(next)
        if (limitSec !== undefined && next >= limitSec && !expiredRef.current) {
          expiredRef.current = true
          onExpireRef.current?.()
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [running, limitSec])

  const remaining = limitSec === undefined ? undefined : Math.max(0, limitSec - elapsed)
  const display = formatDuration(remaining ?? elapsed)
  const urgent = remaining !== undefined && remaining <= 120

  return (
    <span
      role="timer"
      aria-live="off"
      aria-label={limitSec === undefined ? 'Förfluten tid' : 'Återstående tid'}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold tabular-nums transition-colors duration-300',
        urgent
          ? 'border-berry-500/30 bg-berry-50 text-berry-600'
          : 'border-sand-200 text-ink-700 bg-white',
      )}
    >
      <Timer className={cn('size-4', urgent && 'animate-pulse')} />
      {display}
    </span>
  )
}
