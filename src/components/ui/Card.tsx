import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a hover lift, for cards that link somewhere. */
  interactive?: boolean
  tone?: 'default' | 'forest' | 'sand'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const tones = {
  default: 'bg-white border-sand-200',
  forest: 'bg-forest-800 border-forest-700 text-sand-100',
  sand: 'bg-sand-100 border-sand-200',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

export function Card({
  interactive,
  tone = 'default',
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border shadow-soft transition-all duration-300',
        tones[tone],
        paddings[padding],
        interactive && 'hover:-translate-y-0.5 hover:shadow-lift',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  action,
  description,
}: {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {description ? <p className="text-ink-500 mt-1 text-sm">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
