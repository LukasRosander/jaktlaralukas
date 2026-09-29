import {
  ArrowRight,
  CircleCheck,
  CircleX,
  Clock,
  RefreshCw,
  Repeat,
  Trophy,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { CategoryBars } from '@/components/stats/CategoryBars'
import { StatCard } from '@/components/stats/StatCard'
import { QuestionCard } from '@/components/questions/QuestionCard'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import { NotFoundPage } from '@/components/ui/NotFoundPage'
import { RingProgress } from '@/components/ui/RingProgress'
import { getQuestion } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { formatDuration, formatLongDate } from '@/utils/date'
import { slotKey } from '@/utils/exam'
import { scoreVerdict } from '@/utils/format'
import type { Question } from '@/types'

interface ReviewSlot {
  index: number
  question: Question
  /** `null` when the learner left the question unanswered. */
  selected: number | null
}

export function ExamResultPage() {
  const { attemptId } = useParams<{ attemptId: string }>()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const [reviewing, setReviewing] = useState(false)

  const attempt = progress.exams.find((exam) => exam.id === attemptId)

  if (!attempt) {
    return (
      <NotFoundPage
        title="Provresultatet hittades inte"
        description="Resultatet kan ha nollställts. Gör ett nytt prov för att se din nivå."
        actionLabel="Till provsimulatorn"
        actionTo="/app/prov"
      />
    )
  }

  const verdict = scoreVerdict(attempt.scorePercent)

  const slots: ReviewSlot[] = attempt.questionIds.flatMap((questionId, index) => {
    const question = getQuestion(questionId)
    if (!question) return []
    return [{ index, question, selected: attempt.answers[slotKey(questionId, index)] ?? null }]
  })

  const incorrectSlots = slots.filter((slot) => slot.selected !== slot.question.correctAnswer)

  const retakeSame = () => {
    navigate('/app/prov/kor', {
      state: { config: attempt.config, questionIds: attempt.questionIds },
    })
  }

  return (
    <div>
      <header className="animate-rise mb-6 text-center sm:mb-8">
        <p className="text-forest-600 text-xs font-semibold tracking-[0.12em] uppercase">
          {formatLongDate(attempt.completedAt)}
        </p>
        <h1 className="font-display mt-1.5 text-3xl leading-tight sm:text-4xl">Prov avslutat!</h1>
        <p className="text-ink-500 mt-2">{verdict.title}</p>
      </header>

      {/* ── Score ────────────────────────────────────────────────────────── */}
      <Card padding="lg" className="animate-pop">
        <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
          <RingProgress value={attempt.scorePercent} size={176} strokeWidth={14}>
            <span className="font-display text-4xl leading-none">{attempt.scorePercent} %</span>
            <span className="text-ink-500 mt-1 text-sm tabular-nums">
              {attempt.correctCount} / {attempt.totalCount}
            </span>
          </RingProgress>

          <dl className="grid w-full max-w-sm gap-3 sm:w-auto">
            {[
              {
                label: 'Rätt svar',
                value: `${attempt.correctCount}`,
                icon: <CircleCheck className="size-4" />,
                tone: 'moss' as const,
              },
              {
                label: 'Fel svar',
                value: `${attempt.totalCount - attempt.correctCount}`,
                icon: <CircleX className="size-4" />,
                tone: 'default' as const,
              },
              {
                label: 'Tid',
                value: formatDuration(attempt.durationSec),
                icon: <Clock className="size-4" />,
                tone: 'default' as const,
              },
            ].map((item) => (
              <StatCard
                key={item.label}
                label={item.label}
                value={item.value}
                icon={item.icon}
                tone={item.tone}
                className="sm:min-w-52"
              />
            ))}
          </dl>
        </div>

        <div className="border-sand-200 mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-center">
          <Button
            onClick={() => setReviewing((open) => !open)}
            disabled={incorrectSlots.length === 0}
            iconLeft={<Repeat className="size-4" />}
          >
            {reviewing ? 'Stäng genomgången' : `Gå igenom fel svar (${incorrectSlots.length})`}
          </Button>
          <Button variant="secondary" onClick={retakeSame} iconLeft={<RefreshCw className="size-4" />}>
            Gör samma prov igen
          </Button>
          <Button variant="ghost" onClick={() => navigate('/app/prov')} iconRight={<ArrowRight className="size-4" />}>
            Nytt prov
          </Button>
        </div>
      </Card>

      {/* ── Per category ─────────────────────────────────────────────────── */}
      <div className="mt-4 grid gap-4 sm:mt-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card padding="lg">
          <CardHeader
            title="Resultat per ämnesområde"
            description="Områden med låg andel rätt är de som ger mest tillbaka att repetera."
          />
          <CategoryBars scores={attempt.categoryScores} linkToTheory />
        </Card>

        <Card tone="sand" padding="lg">
          <span className="bg-white text-forest-600 flex size-11 items-center justify-center rounded-xl">
            <Trophy className="size-5.5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Nästa steg</h2>
          <p className="text-ink-500 mt-1.5 text-sm">
            {attempt.scorePercent >= 85
              ? 'Du ligger stabilt. Håll i gång med korta pass och fokusera på de områden där du tappar poäng.'
              : 'Repetera teorin i de svagaste områdena och kör sedan ett nytt prov för att se effekten.'}
          </p>
          <Link
            to="/app/teori"
            className="text-forest-700 mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            Gå till teorin
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/app/statistik"
            className="text-forest-700 mt-2 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            Se din utveckling
            <ArrowRight className="size-4" />
          </Link>
        </Card>
      </div>

      {/* ── Review ───────────────────────────────────────────────────────── */}
      {reviewing ? (
        <section aria-labelledby="genomgang" className="animate-rise mt-6">
          <h2 id="genomgang" className="mb-3 text-lg font-semibold">
            Genomgång av fel svar
          </h2>
          <ul className="space-y-4">
            {incorrectSlots.map((slot) => (
              <li key={`${slot.index}-${slot.question.id}`}>
                <QuestionCard
                  question={slot.question}
                  selectedAnswer={slot.selected}
                  revealed
                  onSelect={() => undefined}
                  counterLabel={`Fråga ${slot.index + 1}`}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
