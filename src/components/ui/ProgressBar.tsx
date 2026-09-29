import { useEffect, useState } from 'react'

import { cn } from '@/utils/cn'

export interface ProgressBarProps {
  /** 0–100. */
  value: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
  tone?: 'forest' | 'moss' | 'light'
  showValue?: boolean
  className?: string
}

const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }

const tracks = {
  forest: 'bg-sand-200',
  moss: 'bg-moss-100',
  light: 'bg-white/20',
}

const fills = {
  forest: 'bg-forest-600',
  moss: 'bg-moss-500',
  light: 'bg-moss-300',
}

export function ProgressBar({
  value,
  label,
  size = 'md',
  tone = 'forest',
  showValue = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  // Animate from zero on mount so the bar visibly fills in.
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setWidth(clamped))
    return () => cancelAnimationFrame(frame)
  }, [clamped])

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          {label ? <span className="text-sm font-medium">{label}</span> : null}
          {showValue ? (
            <span className="text-sm font-semibold tabular-nums">{Math.round(clamped)} %</span>
          ) : null}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Framsteg'}
        className={cn('w-full overflow-hidden rounded-full', heights[size], tracks[tone])}
      >
        <div
          className={cn('h-full rounded-full transition-[width] duration-700 ease-out', fills[tone])}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
