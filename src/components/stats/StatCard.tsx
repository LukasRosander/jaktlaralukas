import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

export interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon?: ReactNode
  tone?: 'default' | 'forest' | 'moss' | 'warning'
  className?: string
}

const tones = {
  default: 'bg-white border-sand-200',
  forest: 'bg-forest-800 border-forest-800 text-sand-100',
  moss: 'bg-moss-100 border-moss-200',
  warning: 'bg-amber-ochre-light border-amber-ochre/20',
}

const iconTones = {
  default: 'bg-sand-100 text-forest-600',
  forest: 'bg-white/10 text-moss-300',
  moss: 'bg-white text-forest-600',
  warning: 'bg-white text-amber-ochre',
}

export function StatCard({ label, value, hint, icon, tone = 'default', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-card flex flex-col gap-3 border p-4 shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:p-5',
        tones[tone],
        className,
      )}
    >
      {icon ? (
        <span
          className={cn(
            'flex size-9 items-center justify-center rounded-full',
            iconTones[tone],
          )}
        >
          {icon}
        </span>
      ) : null}
      <div>
        <p
          className={cn(
            'text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl',
            tone === 'forest' ? 'text-sand-50' : 'text-ink-900',
          )}
        >
          {value}
        </p>
        <p className={cn('mt-0.5 text-sm', tone === 'forest' ? 'text-sand-200/80' : 'text-ink-500')}>
          {label}
        </p>
        {hint ? (
          <p
            className={cn(
              'mt-1.5 text-xs',
              tone === 'forest' ? 'text-moss-300' : 'text-forest-600',
            )}
          >
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  )
}
