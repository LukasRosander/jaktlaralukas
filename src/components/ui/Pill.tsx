import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

export type PillTone = 'neutral' | 'forest' | 'moss' | 'sand' | 'success' | 'warning' | 'danger'

const tones: Record<PillTone, string> = {
  neutral: 'bg-sand-100 text-ink-700 border-sand-200',
  forest: 'bg-forest-800 text-sand-100 border-forest-800',
  moss: 'bg-moss-100 text-forest-700 border-moss-200',
  sand: 'bg-white/15 text-sand-100 border-white/25',
  success: 'bg-moss-100 text-forest-700 border-moss-300',
  warning: 'bg-amber-ochre-light text-amber-ochre border-amber-ochre/30',
  danger: 'bg-berry-50 text-berry-600 border-berry-500/25',
}

/** Small status label used for chapter counts, difficulty and categories. */
export function Pill({
  children,
  tone = 'neutral',
  icon,
  className,
}: {
  children: ReactNode
  tone?: PillTone
  icon?: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
