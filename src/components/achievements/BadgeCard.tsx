import { Lock } from 'lucide-react'

import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/utils/cn'
import type { AchievementStatus } from '@/utils/achievements'

const tierLabels = { brons: 'Brons', silver: 'Silver', guld: 'Guld' } as const

const tierRings = {
  brons: 'ring-amber-ochre/35',
  silver: 'ring-ink-400/35',
  guld: 'ring-amber-ochre/60',
}

/** Badge tile showing either the unlocked state or progress towards it. */
export function BadgeCard({ status }: { status: AchievementStatus }) {
  const { achievement, unlocked, current, target } = status

  return (
    <div
      className={cn(
        'rounded-card flex flex-col items-center border p-5 text-center transition-all duration-300',
        unlocked
          ? 'border-moss-200 bg-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift'
          : 'border-sand-200 bg-sand-100/60',
      )}
    >
      <span
        className={cn(
          'flex size-16 items-center justify-center rounded-2xl text-3xl ring-2 transition-transform duration-300',
          unlocked
            ? cn('bg-moss-50', tierRings[achievement.tier])
            : 'bg-sand-200/70 text-ink-400 ring-transparent grayscale',
        )}
        aria-hidden="true"
      >
        {unlocked ? achievement.emoji : <Lock className="size-6" />}
      </span>

      <h3 className={cn('mt-3.5 font-semibold', unlocked ? 'text-ink-900' : 'text-ink-500')}>
        {achievement.title}
      </h3>
      <p className="text-ink-500 mt-1 text-sm">{achievement.description}</p>

      <p
        className={cn(
          'mt-3 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase',
          unlocked ? 'text-forest-600' : 'text-ink-400',
        )}
      >
        {unlocked ? `${tierLabels[achievement.tier]} · Upplåst` : tierLabels[achievement.tier]}
      </p>

      {!unlocked ? (
        <div className="mt-3 w-full">
          <ProgressBar value={(current / target) * 100} size="sm" />
          <p className="text-ink-400 mt-1.5 text-xs tabular-nums">
            {current} / {target}
          </p>
        </div>
      ) : null}
    </div>
  )
}
