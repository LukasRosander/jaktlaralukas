import { ArrowRight, CircleCheck, CircleX, ListChecks, RotateCcw, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { QuestionCard } from '@/components/questions/QuestionCard'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { buttonStyles } from '@/components/ui/button-styles'
import { getQuestions, getTheoryCategories } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { shuffle } from '@/utils/random'
import { unmasteredQuestionIds } from '@/utils/stats'
import type { CategoryId, ProgressState, Question } from '@/types'

type Mode = 'alla' | 'obesvarade'

/** Questions matching the current filters, in curriculum order. */
function buildPool(progress: ProgressState, categoryId: CategoryId | null, mode: Mode): Question[] {
  const unmastered = new Set(unmasteredQuestionIds(progress))
  return getQuestions().filter((question) => {
    if (categoryId && question.categoryId !== categoryId) return false
    if (mode === 'obesvarade' && !unmastered.has(question.id)) return false
    return true
  })
}

export function PracticePage() {
  const { progress, recordAnswer } = useProgress()
  const [searchParams, setSearchParams] = useSearchParams()
  const categories = getTheoryCategories()

  const categoryParam = searchParams.get('kategori')
  const activeCategory = categories.some((category) => category.id === categoryParam)
    ? (categoryParam as CategoryId)
    : null
  const mode = (searchParams.get('läge') as Mode) ?? 'alla'

  const [queue, setQueue] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [session, setSession] = useState({ answered: 0, correct: 0 })

  const poolSize = useMemo(
    () => buildPool(progress, activeCategory, mode).length,
    [progress, activeCategory, mode],
  )

  /**
   * Builds a fresh queue from the current progress. The queue is then frozen in
   * state for the rest of the session, so answering a question never reorders
   * or shortens the run the learner is in the middle of.
   */
  const startSession = () => {
    const pool = buildPool(progress, activeCategory, mode)
    setQueue(progress.settings.shuffleQuestions ? shuffle(pool) : pool)
    setIndex(0)
    setSelected(null)
    setSession({ answered: 0, correct: 0 })
  }

  const startSessionRef = useRef(startSession)
  useEffect(() => {
    startSessionRef.current = startSession
  })

  // Restart only when the filters change; `startSessionRef` always holds the
  // latest closure, so the new queue reflects current progress.
  useEffect(() => {
    startSessionRef.current()
  }, [activeCategory, mode])

  const current = queue[index]
  const finished = queue.length > 0 && index >= queue.length

  const handleSelect = (answerIndex: number) => {
    if (selected !== null || !current) return
    setSelected(answerIndex)
    recordAnswer(current, answerIndex, 'practice')
    setSession((state) => ({
      answered: state.answered + 1,
      correct: state.correct + (answerIndex === current.correctAnswer ? 1 : 0),
    }))
  }

  const handleNext = () => {
    setSelected(null)
    setIndex((value) => value + 1)
  }

  const updateFilter = (patch: { kategori?: string | null; läge?: Mode }) => {
    const next = new URLSearchParams(searchParams)
    if ('kategori' in patch) {
      if (patch.kategori) next.set('kategori', patch.kategori)
      else next.delete('kategori')
    }
    if (patch.läge) {
      if (patch.läge === 'alla') next.delete('läge')
      else next.set('läge', patch.läge)
    }
    setSearchParams(next, { replace: true })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Övningsfrågor"
        title="Träna i ditt eget tempo"
        description="Du får förklaringen direkt efter varje svar. Alla svar räknas in i din statistik."
        action={
          <Button
            variant="secondary"
            onClick={startSession}
            iconLeft={<RotateCcw className="size-4" />}
          >
            Börja om
          </Button>
        }
      />

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <Card className="mb-6" padding="sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="kategori" className="text-ink-600 shrink-0 text-sm font-medium">
              Ämnesområde
            </label>
            <select
              id="kategori"
              value={activeCategory ?? ''}
              onChange={(event) => updateFilter({ kategori: event.target.value || null })}
              className="border-sand-300 text-ink-800 focus:border-forest-500 min-w-0 flex-1 rounded-full border bg-white px-4 py-2 text-sm transition-colors"
            >
              <option value="">Alla områden</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {(
              [
                { id: 'alla', label: 'Alla frågor' },
                { id: 'obesvarade', label: 'Ej klarade' },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => updateFilter({ läge: option.id })}
                className={
                  mode === option.id
                    ? 'bg-forest-800 text-sand-50 rounded-full px-4 py-2 text-sm font-medium'
                    : 'text-ink-600 hover:bg-sand-100 rounded-full px-4 py-2 text-sm font-medium transition-colors'
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* ── Session progress ─────────────────────────────────────────────── */}
      {queue.length > 0 && !finished ? (
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Pill tone="neutral" icon={<ListChecks className="size-3.5" />}>
            Fråga {index + 1} av {queue.length}
          </Pill>
          <Pill tone="success" icon={<CircleCheck className="size-3.5" />}>
            {session.correct} rätt
          </Pill>
          <Pill tone="danger" icon={<CircleX className="size-3.5" />}>
            {session.answered - session.correct} fel
          </Pill>
          <ProgressBar
            value={(index / queue.length) * 100}
            size="sm"
            className="min-w-40 flex-1"
          />
        </div>
      ) : null}

      {/* ── Question ─────────────────────────────────────────────────────── */}
      {queue.length === 0 && poolSize === 0 ? (
        <EmptyState
          icon={<Sparkles className="size-6" />}
          title="Inga frågor kvar här"
          description={
            mode === 'obesvarade'
              ? 'Du har redan svarat rätt på alla frågor i urvalet. Byt område eller växla till Alla frågor.'
              : 'Det finns inga frågor för det valda området ännu.'
          }
          action={
            <Button variant="secondary" onClick={() => updateFilter({ läge: 'alla', kategori: null })}>
              Visa alla frågor
            </Button>
          }
        />
      ) : finished ? (
        <Card padding="lg" className="animate-pop text-center">
          <div className="bg-moss-100 text-forest-600 mx-auto flex size-14 items-center justify-center rounded-full">
            <CircleCheck className="size-7" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Träningspasset är klart</h2>
          <p className="text-ink-500 mt-1.5">
            {session.correct} av {session.answered} rätt –{' '}
            {Math.round((session.correct / Math.max(1, session.answered)) * 100)} %
          </p>
          <ProgressBar
            value={(session.correct / Math.max(1, session.answered)) * 100}
            className="mx-auto mt-6 max-w-sm"
          />
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={startSession} iconLeft={<RotateCcw className="size-4" />}>
              Träna igen
            </Button>
            <Link to="/app/prov" className={buttonStyles('secondary', 'md')}>
              Gör ett prov
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Card>
      ) : current ? (
        <QuestionCard
          question={current}
          selectedAnswer={selected}
          revealed={selected !== null}
          onSelect={handleSelect}
          footer={
            selected !== null ? (
              <div className="flex justify-end">
                <Button onClick={handleNext} iconRight={<ArrowRight className="size-4" />}>
                  {index + 1 >= queue.length ? 'Se resultat' : 'Nästa fråga'}
                </Button>
              </div>
            ) : (
              <p className="text-ink-400 text-sm">Välj det alternativ du tror är rätt.</p>
            )
          }
        />
      ) : null}
    </div>
  )
}
