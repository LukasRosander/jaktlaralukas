import { ArrowLeft, ArrowRight, Check, CircleCheck, Clock } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { TheoryBlocks } from '@/components/theory/TheoryBlocks'
import { BookmarkButton } from '@/components/ui/BookmarkButton'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { NotFoundPage } from '@/components/ui/NotFoundPage'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SourceList } from '@/components/ui/SourceList'
import { buttonStyles } from '@/components/ui/button-styles'
import { getTheoryCategory } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { categoryProgress } from '@/utils/stats'
import type { CategoryId } from '@/types'

export function TheoryChapterPage() {
  const { categoryId, chapterId } = useParams<{ categoryId: string; chapterId: string }>()
  const navigate = useNavigate()
  const { progress, isChapterCompleted, setChapterCompleted } = useProgress()

  const category = getTheoryCategory(categoryId as CategoryId)
  const chapterIndex = category?.chapters.findIndex((item) => item.id === chapterId) ?? -1
  const chapter = chapterIndex >= 0 ? category?.chapters[chapterIndex] : undefined

  if (!category || !chapter) {
    return (
      <NotFoundPage
        title="Kapitlet hittades inte"
        description="Innehållet kan ha flyttats. Välj ett kapitel från teoriöversikten."
        actionLabel="Till teorin"
        actionTo="/app/teori"
      />
    )
  }

  const completed = isChapterCompleted(chapter.id)
  const previous = chapterIndex > 0 ? category.chapters[chapterIndex - 1] : undefined
  const next =
    chapterIndex < category.chapters.length - 1 ? category.chapters[chapterIndex + 1] : undefined

  const handleComplete = () => {
    setChapterCompleted(chapter.id, !completed)
    if (!completed && next) {
      navigate(`/app/teori/${category.id}/${next.id}`)
    }
  }

  return (
    <article>
      <Link
        to={`/app/teori/${category.id}`}
        className="text-ink-500 hover:text-forest-700 mb-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="size-4" />
        {category.title}
      </Link>

      <div className="rounded-card shadow-soft relative overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="h-48 w-full object-cover sm:h-64 lg:h-72"
        />
        <div className="from-forest-950/95 absolute inset-0 bg-gradient-to-t via-forest-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="sand">
              Kapitel {chapterIndex + 1} av {category.chapters.length}
            </Pill>
            {completed ? (
              <Pill tone="success" icon={<CircleCheck className="size-3.5" />}>
                Markerat som klart
              </Pill>
            ) : null}
          </div>
          <h1 className="font-display mt-3 text-3xl leading-tight text-sand-50 sm:text-4xl lg:text-5xl">
            {chapter.title}
          </h1>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <div className="border-sand-200 mb-6 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
            <p className="text-ink-400 flex items-center gap-1.5 text-sm">
              <Clock className="size-4" />
              {chapter.readingTimeMin} min läsning
            </p>
            <BookmarkButton kind="theory" refId={chapter.id} variant="labelled" />
          </div>

          <p className="text-ink-600 mb-6 text-lg leading-relaxed font-medium">{chapter.summary}</p>

          <TheoryBlocks blocks={chapter.blocks} />

          <SourceList sources={chapter.sources} />

          {/* ── Completion ─────────────────────────────────────────────── */}
          <Card tone={completed ? 'sand' : 'forest'} padding="lg" className="mt-10">
            {completed ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-forest-700 flex items-center gap-2 font-semibold">
                    <CircleCheck className="size-5" />
                    Kapitlet är markerat som klart
                  </p>
                  <p className="text-ink-500 mt-1 text-sm">
                    Du kan ångra det om du vill läsa om kapitlet senare.
                  </p>
                </div>
                <Button variant="secondary" onClick={handleComplete} className="shrink-0">
                  Ångra markering
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-sand-50">Klar med kapitlet?</p>
                  <p className="mt-1 text-sm text-sand-200/80">
                    Markera det som klart så uppdateras din framsteg direkt.
                  </p>
                </div>
                <Button
                  variant="moss"
                  size="lg"
                  onClick={handleComplete}
                  iconLeft={<Check className="size-4.5" />}
                  className="shrink-0"
                >
                  Markera kapitlet som klart
                </Button>
              </div>
            )}
          </Card>

          {/* ── Chapter navigation ─────────────────────────────────────── */}
          <nav
            aria-label="Kapitelnavigering"
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between"
          >
            {previous ? (
              <Link
                to={`/app/teori/${category.id}/${previous.id}`}
                className={buttonStyles('secondary', 'md', 'justify-start text-left')}
              >
                <ArrowLeft className="size-4 shrink-0" />
                <span className="truncate">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/app/teori/${category.id}/${next.id}`}
                className={buttonStyles('secondary', 'md', 'justify-end text-right')}
              >
                <span className="truncate">{next.title}</span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            ) : (
              <Link
                to={`/app/teori/${category.id}`}
                className={buttonStyles('secondary', 'md', 'justify-end')}
              >
                Tillbaka till området
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            )}
          </nav>
        </div>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <Card>
            <ProgressBar
              value={categoryProgress(progress, category.id)}
              label={category.title}
              showValue
              size="sm"
            />
            <ol className="mt-4 space-y-1">
              {category.chapters.map((item, index) => {
                const active = item.id === chapter.id
                const itemDone = isChapterCompleted(item.id)
                return (
                  <li key={item.id}>
                    <Link
                      to={`/app/teori/${category.id}/${item.id}`}
                      aria-current={active ? 'page' : undefined}
                      className={
                        active
                          ? 'bg-forest-800 text-sand-50 flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium'
                          : 'text-ink-600 hover:bg-sand-100 flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors'
                      }
                    >
                      <span
                        className={
                          itemDone
                            ? 'mt-0.5 shrink-0 text-moss-500'
                            : 'text-ink-400 mt-0.5 shrink-0 tabular-nums'
                        }
                      >
                        {itemDone ? <CircleCheck className="size-4" /> : index + 1}
                      </span>
                      <span className="min-w-0">{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </Card>
        </aside>
      </div>
    </article>
  )
}
