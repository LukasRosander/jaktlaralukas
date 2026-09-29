import { ArrowLeft, ArrowRight, Flag, LayoutGrid, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { ExamTimer } from '@/components/exam/ExamTimer'
import { QuestionNavigator } from '@/components/exam/QuestionNavigator'
import { Logo } from '@/components/layout/Logo'
import { QuestionCard } from '@/components/questions/QuestionCard'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { getQuestion } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { cn } from '@/utils/cn'
import { buildExamQuestions, scoreByCategory, slotKey } from '@/utils/exam'
import { createId } from '@/utils/random'
import type { ExamAttempt, ExamConfig, Question } from '@/types'

interface RunnerState {
  config?: ExamConfig
  /** Set when retaking an earlier attempt with the exact same questions. */
  questionIds?: string[]
}

export function ExamRunnerPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { recordExam } = useProgress()
  const state = location.state as RunnerState | null
  const config = state?.config
  const replayIds = state?.questionIds

  // Build the question set once; re-shuffling on re-render would be chaos.
  const examQuestions = useMemo(() => {
    if (!config) return []
    if (replayIds && replayIds.length > 0) {
      const replayed = replayIds
        .map((id) => getQuestion(id))
        .filter((question): question is Question => Boolean(question))
      if (replayed.length > 0) return replayed
    }
    return buildExamQuestions(config)
  }, [config, replayIds])

  const elapsedRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [navigatorOpen, setNavigatorOpen] = useState(false)
  const [confirmFinish, setConfirmFinish] = useState(false)

  const answeredIndexes = useMemo(() => {
    const set = new Set<number>()
    examQuestions.forEach((question, position) => {
      if (answers[slotKey(question.id, position)] !== undefined) set.add(position)
    })
    return set
  }, [answers, examQuestions])

  if (!config || examQuestions.length === 0) {
    return <Navigate to="/app/prov" replace />
  }

  const current = examQuestions[index]
  const currentKey = slotKey(current.id, index)
  const selected = answers[currentKey] ?? null
  const revealed = config.instantFeedback && selected !== null
  const unanswered = examQuestions.length - answeredIndexes.size
  const isSimulation = config.preset === 'simulation'

  const handleSelect = (answerIndex: number) => {
    if (revealed) return
    setAnswers((current) => ({ ...current, [currentKey]: answerIndex }))
  }

  const finish = () => {
    const correctCount = examQuestions.reduce(
      (total, question, position) =>
        answers[slotKey(question.id, position)] === question.correctAnswer ? total + 1 : total,
      0,
    )

    const attempt: ExamAttempt = {
      id: createId('exam'),
      completedAt: new Date().toISOString(),
      config,
      questionIds: examQuestions.map((question) => question.id),
      answers,
      correctCount,
      totalCount: examQuestions.length,
      scorePercent: Math.round((correctCount / examQuestions.length) * 100),
      durationSec: elapsedRef.current,
      categoryScores: scoreByCategory(examQuestions, answers),
    }

    recordExam(attempt, examQuestions)
    navigate(`/app/prov/resultat/${attempt.id}`, { replace: true })
  }

  const progressPercent = ((index + 1) / examQuestions.length) * 100

  return (
    <div className={cn('flex min-h-dvh flex-col', isSimulation ? 'bg-forest-950' : 'bg-sand-50')}>
      {/* ── Exam chrome ──────────────────────────────────────────────────── */}
      <header
        className={cn(
          'sticky top-0 z-30 border-b backdrop-blur-md',
          isSimulation ? 'border-forest-800 bg-forest-950/90' : 'border-sand-200 bg-sand-50/90',
        )}
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Logo tone={isSimulation ? 'light' : 'dark'} className="hidden sm:inline-flex" />
              {isSimulation ? (
                <Pill tone="warning">Provläge</Pill>
              ) : (
                <Pill tone="neutral">Övningsprov</Pill>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {config.timerEnabled ? (
                <ExamTimer
                  limitSec={config.timeLimitMin * 60}
                  running
                  onTick={(elapsed) => {
                    elapsedRef.current = elapsed
                  }}
                  onExpire={finish}
                />
              ) : (
                <ExamTimer
                  running
                  onTick={(elapsed) => {
                    elapsedRef.current = elapsed
                  }}
                />
              )}
              <button
                type="button"
                onClick={() => navigate('/app/prov')}
                aria-label="Avbryt provet"
                className={cn(
                  'flex size-10 items-center justify-center rounded-full transition-colors',
                  isSimulation
                    ? 'text-sand-300 hover:bg-white/10'
                    : 'text-ink-500 hover:bg-white',
                )}
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div className="pb-3">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span
                className={cn(
                  'text-xs font-semibold tabular-nums',
                  isSimulation ? 'text-sand-300' : 'text-ink-500',
                )}
              >
                Fråga {index + 1} av {examQuestions.length}
              </span>
              <span
                className={cn('text-xs', isSimulation ? 'text-sand-400/80' : 'text-ink-400')}
              >
                {unanswered === 0 ? 'Alla frågor besvarade' : `${unanswered} obesvarade`}
              </span>
            </div>
            <div
              className={cn(
                'h-1.5 w-full overflow-hidden rounded-full',
                isSimulation ? 'bg-forest-800' : 'bg-sand-200',
              )}
            >
              <div
                className={cn(
                  'h-full rounded-full transition-[width] duration-500 ease-out',
                  isSimulation ? 'bg-moss-300' : 'bg-forest-600',
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <QuestionCard
          key={currentKey}
          question={current}
          selectedAnswer={selected}
          revealed={revealed}
          onSelect={handleSelect}
          showBookmark={!isSimulation}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
                disabled={index === 0}
                iconLeft={<ArrowLeft className="size-4" />}
              >
                Föregående
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setNavigatorOpen((open) => !open)}
                  iconLeft={<LayoutGrid className="size-4" />}
                >
                  Översikt
                </Button>
                {index + 1 < examQuestions.length ? (
                  <Button
                    onClick={() => setIndex((value) => value + 1)}
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    Nästa
                  </Button>
                ) : (
                  <Button
                    onClick={() => (unanswered > 0 ? setConfirmFinish(true) : finish())}
                    iconRight={<Flag className="size-4" />}
                  >
                    Avsluta provet
                  </Button>
                )}
              </div>
            </div>
          }
        />

        {navigatorOpen ? (
          <Card className="animate-rise mt-4">
            <h2 className="mb-3 text-sm font-semibold">Alla frågor</h2>
            <QuestionNavigator
              total={examQuestions.length}
              currentIndex={index}
              answeredIndexes={answeredIndexes}
              onJump={(next) => {
                setIndex(next)
                setNavigatorOpen(false)
              }}
            />
            <div className="border-sand-200 mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
              <p className="text-ink-500 text-sm">
                {unanswered === 0
                  ? 'Alla frågor är besvarade.'
                  : `${unanswered} frågor är obesvarade.`}
              </p>
              <Button
                variant="secondary"
                onClick={() => (unanswered > 0 ? setConfirmFinish(true) : finish())}
                iconRight={<Flag className="size-4" />}
              >
                Avsluta provet
              </Button>
            </div>
          </Card>
        ) : null}
      </main>

      {/* ── Finish confirmation ──────────────────────────────────────────── */}
      {confirmFinish ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <div
            className="bg-forest-950/50 absolute inset-0 backdrop-blur-sm"
            onClick={() => setConfirmFinish(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="animate-pop relative w-full max-w-md rounded-3xl bg-white p-6 shadow-lift"
          >
            <h2 id="confirm-title" className="text-lg font-semibold">
              Avsluta provet?
            </h2>
            <p className="text-ink-500 mt-2 text-sm">
              Du har {unanswered} obesvarade{' '}
              {unanswered === 1 ? 'fråga' : 'frågor'}. Obesvarade frågor räknas som fel.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={() => setConfirmFinish(false)}>
                Gå tillbaka
              </Button>
              <Button onClick={finish}>Avsluta ändå</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
