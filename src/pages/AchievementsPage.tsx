import { Lock, Trophy } from 'lucide-react'
import { useState } from 'react'

import { BadgeCard } from '@/components/achievements/BadgeCard'
import { StatCard } from '@/components/stats/StatCard'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import { useProgress } from '@/hooks/useProgress'
import { achievementStatuses } from '@/utils/achievements'
import { deriveStats } from '@/utils/stats'

type Filter = 'alla' | 'upplasta' | 'lasta'

export function AchievementsPage() {
  const { progress } = useProgress()
  const [filter, setFilter] = useState<Filter>('alla')

  const statuses = achievementStatuses(progress)
  const unlocked = statuses.filter((status) => status.unlocked)
  const locked = statuses.filter((status) => !status.unlocked)
  const stats = deriveStats(progress)

  const tabs: ReadonlyArray<TabItem<Filter>> = [
    { id: 'alla', label: 'Alla', count: statuses.length },
    { id: 'upplasta', label: 'Upplåsta', count: unlocked.length },
    { id: 'lasta', label: 'Låsta', count: locked.length },
  ]

  const visible =
    filter === 'upplasta' ? unlocked : filter === 'lasta' ? locked : [...unlocked, ...locked]

  return (
    <div>
      <PageHeader
        eyebrow="Framsteg"
        title="Dina märken"
        description="Märken låses upp automatiskt när du når ett delmål. De finns för att göra det lättare att plugga regelbundet."
      />

      <Card tone="forest" padding="lg" className="mb-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-moss-300 flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
              <Trophy className="size-4" />
              Upplåsta märken
            </p>
            <p className="font-display mt-2 text-5xl leading-none text-sand-50">
              {unlocked.length}
              <span className="text-2xl text-sand-200/60"> / {statuses.length}</span>
            </p>
            <ProgressBar
              value={(unlocked.length / statuses.length) * 100}
              tone="light"
              className="mt-5 max-w-xl"
            />
          </div>

          <ul className="flex flex-wrap gap-2 lg:max-w-56 lg:justify-end">
            {statuses.map((status) => (
              <li key={status.achievement.id}>
                <span
                  title={status.achievement.title}
                  className={
                    status.unlocked
                      ? 'bg-moss-300/20 flex size-11 items-center justify-center rounded-xl text-xl'
                      : 'flex size-11 items-center justify-center rounded-xl bg-white/5 text-sand-300/40'
                  }
                >
                  {status.unlocked ? (
                    status.achievement.emoji
                  ) : (
                    <Lock className="size-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {status.achievement.title} – {status.unlocked ? 'upplåst' : 'låst'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <ul className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li>
          <StatCard label="Kapitel klara" value={`${stats.completedChapterCount}`} />
        </li>
        <li>
          <StatCard label="Rätta svar" value={`${stats.correctAnswers}`} />
        </li>
        <li>
          <StatCard label="Genomförda prov" value={`${progress.exams.length}`} />
        </li>
        <li>
          <StatCard label="Dagar i rad" value={`${stats.streakDays}`} tone="warning" />
        </li>
      </ul>

      <div className="mb-6">
        <Tabs items={tabs} value={filter} onChange={setFilter} aria-label="Filtrera märken" />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((status) => (
          <li key={status.achievement.id}>
            <BadgeCard status={status} />
          </li>
        ))}
      </ul>
    </div>
  )
}
