import { useMemo, useState } from 'react'

import { TheoryCard } from '@/components/theory/TheoryCard'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import { getTheoryCategories } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { categoryProgress, completedChaptersInCategory, deriveStats } from '@/utils/stats'

type Filter = 'alla' | 'pagaende' | 'klara'

export function TheoryPage() {
  const { progress } = useProgress()
  const [filter, setFilter] = useState<Filter>('alla')
  const stats = deriveStats(progress)

  const enriched = useMemo(
    () =>
      getTheoryCategories().map((category) => ({
        category,
        percent: categoryProgress(progress, category.id),
        completed: completedChaptersInCategory(progress, category.id),
      })),
    [progress],
  )

  const tabs: ReadonlyArray<TabItem<Filter>> = [
    { id: 'alla', label: 'Alla', count: enriched.length },
    {
      id: 'pagaende',
      label: 'Pågående',
      count: enriched.filter((entry) => entry.percent > 0 && entry.percent < 100).length,
    },
    {
      id: 'klara',
      label: 'Klara',
      count: enriched.filter((entry) => entry.percent >= 100).length,
    },
  ]

  const visible = enriched.filter((entry) => {
    if (filter === 'pagaende') return entry.percent > 0 && entry.percent < 100
    if (filter === 'klara') return entry.percent >= 100
    return true
  })

  return (
    <div>
      <PageHeader
        eyebrow="Teori"
        title="Kursens tolv ämnesområden"
        description="Läs ett kapitel i taget och markera det som klart när du känner dig säker. Din framsteg uppdateras direkt."
      />

      <Card tone="sand" className="mb-6">
        <ProgressBar
          value={stats.overallProgress}
          label="Teorin totalt"
          showValue
          size="md"
        />
        <p className="text-ink-500 mt-2.5 text-sm">
          {stats.completedChapterCount} av {stats.totalChapterCount} kapitel klara i{' '}
          {enriched.length} ämnesområden.
        </p>
      </Card>

      <div className="mb-6">
        <Tabs items={tabs} value={filter} onChange={setFilter} aria-label="Filtrera ämnesområden" />
      </div>

      {visible.length === 0 ? (
        <p className="text-ink-500 py-8 text-center text-sm">
          Inga ämnesområden matchar filtret just nu.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((entry) => (
            <li key={entry.category.id}>
              <TheoryCard
                category={entry.category}
                progress={entry.percent}
                completedChapters={entry.completed}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
