import { ArrowRight, BookOpen, BookmarkX, Clock } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { QuestionCard } from '@/components/questions/QuestionCard'
import { BookmarkButton } from '@/components/ui/BookmarkButton'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pill } from '@/components/ui/Pill'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import { buttonStyles } from '@/components/ui/button-styles'
import { getChapter, getQuestion } from '@/data/repository'
import { categoryTitle } from '@/data/theory'
import { useProgress } from '@/hooks/useProgress'
import { formatRelativeDay } from '@/utils/date'

type Filter = 'alla' | 'teori' | 'fragor'

export function SavedPage() {
  const { progress } = useProgress()
  const [filter, setFilter] = useState<Filter>('alla')

  const sorted = [...progress.bookmarks].sort((a, b) => b.savedAt.localeCompare(a.savedAt))
  const theoryBookmarks = sorted.filter((bookmark) => bookmark.kind === 'theory')
  const questionBookmarks = sorted.filter((bookmark) => bookmark.kind === 'question')

  const tabs: ReadonlyArray<TabItem<Filter>> = [
    { id: 'alla', label: 'Alla', count: sorted.length },
    { id: 'teori', label: 'Teori', count: theoryBookmarks.length },
    { id: 'fragor', label: 'Frågor', count: questionBookmarks.length },
  ]

  const showTheory = filter === 'alla' || filter === 'teori'
  const showQuestions = filter === 'alla' || filter === 'fragor'

  const visibleTheory = showTheory ? theoryBookmarks : []
  const visibleQuestions = showQuestions ? questionBookmarks : []
  const nothingToShow = visibleTheory.length === 0 && visibleQuestions.length === 0

  return (
    <div>
      <PageHeader
        eyebrow="Sparat"
        title="Sparat"
        description="Kapitel och frågor du sparat för att komma tillbaka till. Använd bokmärket var som helst i appen."
      />

      <div className="mb-6">
        <Tabs items={tabs} value={filter} onChange={setFilter} aria-label="Filtrera sparat" />
      </div>

      {nothingToShow ? (
        <EmptyState
          icon={<BookmarkX className="size-6" />}
          title={filter === 'alla' ? 'Inget sparat ännu' : 'Inget sparat i den här kategorin'}
          description="Tryck på bokmärket på ett teorikapitel eller en fråga för att spara det här. Bra för sådant du vill repetera dagen före provet."
          action={
            <Link to="/app/teori" className={buttonStyles('primary', 'md')}>
              Utforska teorin
              <ArrowRight className="size-4" />
            </Link>
          }
        />
      ) : (
        <div className="space-y-8">
          {visibleTheory.length > 0 ? (
            <section aria-labelledby="sparad-teori">
              <h2 id="sparad-teori" className="mb-3 text-lg font-semibold">
                Teori
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {visibleTheory.map((bookmark) => {
                  const chapter = getChapter(bookmark.refId)
                  if (!chapter) return null
                  return (
                    <li key={bookmark.refId}>
                      <Card className="flex h-full items-start gap-4">
                        <span className="bg-moss-100 text-forest-600 flex size-10 shrink-0 items-center justify-center rounded-full">
                          <BookOpen className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <Pill tone="neutral">{categoryTitle(chapter.categoryId)}</Pill>
                          <h3 className="mt-2 font-semibold">
                            <Link
                              to={`/app/teori/${chapter.categoryId}/${chapter.id}`}
                              className="hover:text-forest-700 transition-colors"
                            >
                              {chapter.title}
                            </Link>
                          </h3>
                          <p className="text-ink-500 mt-1 text-sm">{chapter.summary}</p>
                          <p className="text-ink-400 mt-2.5 flex items-center gap-1.5 text-xs">
                            <Clock className="size-3.5" />
                            {chapter.readingTimeMin} min · sparad {formatRelativeDay(bookmark.savedAt)}
                          </p>
                        </div>
                        <BookmarkButton kind="theory" refId={chapter.id} />
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}

          {visibleQuestions.length > 0 ? (
            <section aria-labelledby="sparade-fragor">
              <h2 id="sparade-fragor" className="mb-3 text-lg font-semibold">
                Frågor
              </h2>
              <ul className="space-y-4">
                {visibleQuestions.map((bookmark) => {
                  const question = getQuestion(bookmark.refId)
                  if (!question) return null
                  return (
                    <li key={bookmark.refId}>
                      <QuestionCard
                        question={question}
                        selectedAnswer={null}
                        revealed
                        revealMode="reference"
                        onSelect={() => undefined}
                        counterLabel={`Sparad ${formatRelativeDay(bookmark.savedAt)}`}
                      />
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </div>
  )
}
