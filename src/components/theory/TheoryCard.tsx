import { BookOpen, CircleCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { pluralize } from '@/utils/format'
import type { TheoryCategory } from '@/types'

/** Category tile for the theory overview grid. */
export function TheoryCard({
  category,
  progress,
  completedChapters,
}: {
  category: TheoryCategory
  /** 0–100. */
  progress: number
  completedChapters: number
}) {
  const total = category.chapters.length
  const done = progress >= 100

  return (
    <Link
      to={`/app/teori/${category.id}`}
      className="group rounded-card border-sand-200 shadow-soft hover:shadow-lift focus-visible:outline-forest-600 flex h-full flex-col overflow-hidden border bg-white transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="from-forest-950/70 absolute inset-0 bg-gradient-to-t via-forest-950/10 to-transparent" />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <span className="text-sand-50 text-[0.6875rem] font-semibold tracking-wide uppercase">
            {String(category.order).padStart(2, '0')}
          </span>
          {done ? (
            <Pill tone="success" icon={<CircleCheck className="size-3.5" />}>
              Klar
            </Pill>
          ) : (
            <Pill tone="sand" icon={<BookOpen className="size-3.5" />}>
              {completedChapters}/{total} {pluralize(total, 'kapitel', 'kapitel')}
            </Pill>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="group-hover:text-forest-700 text-lg leading-tight font-semibold transition-colors">
          {category.title}
        </h3>
        <p className="text-ink-500 mt-1.5 flex-1 text-sm">{category.description}</p>
        <div className="mt-4">
          <ProgressBar
            value={progress}
            size="sm"
            tone={done ? 'moss' : 'forest'}
            showValue
            label="Klart"
          />
        </div>
      </div>
    </Link>
  )
}
