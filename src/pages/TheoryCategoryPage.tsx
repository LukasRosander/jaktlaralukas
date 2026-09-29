import { ArrowLeft, ArrowRight, Circle, CircleCheck, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { NotFoundPage } from '@/components/ui/NotFoundPage'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { buttonStyles } from '@/components/ui/button-styles'
import { getTheoryCategory } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { pluralize } from '@/utils/format'
import { categoryProgress, completedChaptersInCategory } from '@/utils/stats'
import type { CategoryId } from '@/types'

export function TheoryCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { progress, isChapterCompleted } = useProgress()
  const category = getTheoryCategory(categoryId as CategoryId)

  if (!category) {
    return (
      <NotFoundPage
        title="Ämnesområdet hittades inte"
        description="Länken kan vara gammal. Gå tillbaka till teoriöversikten och välj ett område."
        actionLabel="Till teorin"
        actionTo="/app/teori"
      />
    )
  }

  const percent = categoryProgress(progress, category.id)
  const completed = completedChaptersInCategory(progress, category.id)
  const nextChapter =
    category.chapters.find((chapter) => !isChapterCompleted(chapter.id)) ?? category.chapters[0]

  return (
    <div>
      <Link
        to="/app/teori"
        className="text-ink-500 hover:text-forest-700 mb-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="size-4" />
        Alla ämnesområden
      </Link>

      <div className="rounded-card shadow-soft relative overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="h-56 w-full object-cover sm:h-72 lg:h-80"
        />
        <div className="from-forest-950/95 absolute inset-0 bg-gradient-to-t via-forest-950/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <Pill tone="sand">Område {String(category.order).padStart(2, '0')}</Pill>
          <h1 className="font-display mt-3 text-3xl leading-tight text-sand-50 sm:text-4xl lg:text-5xl">
            {category.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-sand-200/90 sm:text-base">
            {category.description}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section aria-labelledby="kapitel">
          <h2 id="kapitel" className="mb-3 text-lg font-semibold">
            {category.chapters.length} {pluralize(category.chapters.length, 'kapitel', 'kapitel')}
          </h2>
          <ol className="space-y-3">
            {category.chapters.map((chapter, index) => {
              const done = isChapterCompleted(chapter.id)
              return (
                <li key={chapter.id}>
                  <Link to={`/app/teori/${category.id}/${chapter.id}`} className="block">
                    <Card interactive className="flex items-start gap-4">
                      <span
                        className={
                          done
                            ? 'bg-moss-100 text-forest-600 flex size-10 shrink-0 items-center justify-center rounded-full'
                            : 'bg-sand-100 text-ink-400 flex size-10 shrink-0 items-center justify-center rounded-full'
                        }
                      >
                        {done ? (
                          <CircleCheck className="size-5" />
                        ) : (
                          <span className="text-sm font-semibold tabular-nums">{index + 1}</span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-semibold">{chapter.title}</span>
                          {done ? (
                            <Pill tone="success" icon={<CircleCheck className="size-3" />}>
                              Klart
                            </Pill>
                          ) : null}
                        </span>
                        <span className="text-ink-500 mt-1 block text-sm">{chapter.summary}</span>
                        <span className="text-ink-400 mt-2 flex items-center gap-1.5 text-xs">
                          <Clock className="size-3.5" />
                          {chapter.readingTimeMin} min läsning
                        </span>
                      </span>
                      <ArrowRight className="text-ink-300 mt-2.5 size-4.5 shrink-0" />
                    </Card>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <ProgressBar value={percent} label="Klart i området" showValue />
            <p className="text-ink-500 mt-2.5 text-sm">
              {completed} av {category.chapters.length} kapitel markerade som klara.
            </p>
            {nextChapter ? (
              <Link
                to={`/app/teori/${category.id}/${nextChapter.id}`}
                className={buttonStyles('primary', 'md', 'mt-4 w-full')}
              >
                {percent === 0 ? 'Börja läsa' : percent >= 100 ? 'Repetera' : 'Fortsätt läsa'}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </Card>

          <Card tone="sand">
            <h2 className="text-sm font-semibold">Träna på området</h2>
            <p className="text-ink-500 mt-1.5 text-sm">
              Testa dina kunskaper med frågor från just {category.title.toLowerCase()}.
            </p>
            <Link
              to={`/app/fragor?kategori=${category.id}`}
              className={buttonStyles('secondary', 'md', 'mt-4 w-full')}
            >
              <Circle className="size-4" />
              Öva på frågor
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  )
}
