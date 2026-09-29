import { useEffect, useState } from 'react'

import { cn } from '@/utils/cn'

/** Circular progress used for the big score figures. */
export function RingProgress({
  value,
  size = 160,
  strokeWidth = 12,
  tone = 'forest',
  children,
  className,
}: {
  value: number
  size?: number
  strokeWidth?: number
  tone?: 'forest' | 'light'
  children?: React.ReactNode
  className?: string
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setProgress(clamped))
    return () => cancelAnimationFrame(frame)
  }, [clamped])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={tone === 'forest' ? 'stroke-sand-200' : 'stroke-white/20'}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          className={cn(
            'transition-[stroke-dashoffset] duration-1000 ease-out',
            tone === 'forest' ? 'stroke-forest-600' : 'stroke-moss-300',
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}
