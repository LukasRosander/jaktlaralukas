import { ArrowRight, Check, Clock, Play, ShieldAlert, Target } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Switch } from '@/components/ui/Switch'
import { getQuestionsByCategory, getTheoryCategories } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { cn } from '@/utils/cn'
import { formatRelativeDay } from '@/utils/date'
import { createExamConfig, examPresets } from '@/utils/exam'
import type { CategoryId, ExamPreset } from '@/types'

export function ExamSetupPage() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const categories = getTheoryCategories()
  const settings = progress.settings

  const [preset, setPreset] = useState<ExamPreset>(
    settings.defaultQuestionCount === 25 ? 'quick' : settings.defaultQuestionCount === 70 ? 'full' : 'standard',
  )
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([])
  const [shuffleQuestions, setShuffleQuestions] = useState(true)
  const [instantFeedback, setInstantFeedback] = useState(settings.instantFeedback)
  const [timerEnabled, setTimerEnabled] = useState(settings.timerEnabled)

  const isSimulation = preset === 'simulation'
  const availableQuestions = getQuestionsByCategory(selectedCategories).length
  const recentExams = [...progress.exams].reverse().slice(0, 4)

  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const start = () => {
    const config = createExamConfig(preset, {
      categoryIds: isSimulation ? [] : selectedCategories,
      shuffleQuestions: isSimulation ? true : shuffleQuestions,
      instantFeedback: isSimulation ? false : instantFeedback,
      timerEnabled: isSimulation ? true : timerEnabled,
    })
    navigate('/app/prov/kor', { state: { config } })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Prov"
        title="Provsimulator"
        description="Välj längd och innehåll, eller kör provläget som efterliknar en riktig provsituation."
      />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-4 sm:space-y-6">
          {/* ── Presets ────────────────────────────────────────────────── */}
          <section aria-labelledby="provlangd">
            <h2 id="provlangd" className="mb-3 text-lg font-semibold">
              Provlängd
            </h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {examPresets
                .filter((option) => option.id !== 'simulation')
                .map((option) => {
                  const active = preset === option.id
                  return (
                    <li key={option.id}>
                      <button
                        type="button"
                        onClick={() => setPreset(option.id)}
                        aria-pressed={active}
                        className={cn(
                          'rounded-card flex h-full w-full flex-col border p-4 text-left transition-all duration-200',
                          active
                            ? 'border-forest-700 bg-forest-800 text-sand-100 shadow-lift'
                            : 'border-sand-200 shadow-soft hover:border-forest-300 bg-white hover:-translate-y-0.5',
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-xl font-semibold">{option.questionCount}</span>
                          {active ? <Check className="text-moss-300 size-4.5" /> : null}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 text-sm font-medium',
                            active ? 'text-sand-200/90' : 'text-ink-700',
                          )}
                        >
                          frågor
                        </span>
                        <span
                          className={cn(
                            'mt-2 text-xs leading-relaxed',
                            active ? 'text-sand-200/70' : 'text-ink-500',
                          )}
                        >
                          {option.subtitle}
                        </span>
                      </button>
                    </li>
                  )
                })}
            </ul>

            <button
              type="button"
              onClick={() => setPreset('simulation')}
              aria-pressed={isSimulation}
              className={cn(
                'rounded-card mt-3 flex w-full items-center gap-4 border p-4 text-left transition-all duration-200 sm:p-5',
                isSimulation
                  ? 'border-amber-ochre/50 bg-forest-900 text-sand-100 shadow-lift'
                  : 'border-sand-200 shadow-soft hover:border-forest-300 bg-white hover:-translate-y-0.5',
              )}
            >
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-xl',
                  isSimulation ? 'bg-amber-ochre/20 text-amber-ochre' : 'bg-sand-100 text-forest-600',
                )}
              >
                <Target className="size-5.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold">Simulera jägarexamen</span>
                  <Pill tone={isSimulation ? 'warning' : 'neutral'}>70 frågor · 70 min</Pill>
                </span>
                <span
                  className={cn(
                    'mt-1 block text-sm',
                    isSimulation ? 'text-sand-200/75' : 'text-ink-500',
                  )}
                >
                  Timer, inga facit under provet och frågor från hela kursen. Inställningarna är
                  låsta för att efterlikna en riktig provsituation.
                </span>
              </span>
              {isSimulation ? <Check className="text-moss-300 size-5 shrink-0" /> : null}
            </button>
          </section>

          {/* ── Options ────────────────────────────────────────────────── */}
          <Card padding="lg">
            <CardHeader
              title="Inställningar"
              description={
                isSimulation
                  ? 'Provläget använder fasta inställningar.'
                  : 'Anpassa provet efter vad du vill träna på.'
              }
            />
            <div className="space-y-5">
              <Switch
                label="Blanda frågorna"
                description="Slumpa ordningen i stället för att följa kursens ordning."
                checked={isSimulation ? true : shuffleQuestions}
                onChange={setShuffleQuestions}
                disabled={isSimulation}
              />
              <Switch
                label="Visa rätt svar direkt"
                description="Få facit efter varje fråga i stället för först vid resultatet."
                checked={isSimulation ? false : instantFeedback}
                onChange={setInstantFeedback}
                disabled={isSimulation}
              />
              <Switch
                label="Timer"
                description="Räkna ner tiden, precis som vid ett riktigt prov."
                checked={isSimulation ? true : timerEnabled}
                onChange={setTimerEnabled}
                disabled={isSimulation}
              />
            </div>
          </Card>

          {/* ── Category filter ────────────────────────────────────────── */}
          <Card padding="lg">
            <CardHeader
              title="Ämnesområden"
              description={
                isSimulation
                  ? 'Provläget använder alltid frågor från hela kursen.'
                  : 'Välj ett eller flera områden, eller lämna tomt för hela kursen.'
              }
              action={
                selectedCategories.length > 0 && !isSimulation ? (
                  <button
                    type="button"
                    onClick={() => setSelectedCategories([])}
                    className="text-forest-700 shrink-0 text-sm font-medium hover:underline"
                  >
                    Rensa
                  </button>
                ) : undefined
              }
            />
            <ul className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = selectedCategories.includes(category.id)
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      disabled={isSimulation}
                      onClick={() => toggleCategory(category.id)}
                      aria-pressed={active}
                      className={cn(
                        'rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-40',
                        active
                          ? 'border-forest-700 bg-forest-800 text-sand-50'
                          : 'border-sand-300 text-ink-600 hover:border-forest-300 bg-white',
                      )}
                    >
                      {category.title}
                    </button>
                  </li>
                )
              })}
            </ul>
            {!isSimulation && selectedCategories.length > 0 ? (
              <p className="text-ink-500 mt-4 text-sm">
                {availableQuestions} frågor finns i urvalet. Frågor återkommer om provet är längre än
                urvalet.
              </p>
            ) : null}
          </Card>
        </div>

        {/* ── Summary / start ──────────────────────────────────────────── */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card tone="forest" padding="lg">
            <p className="text-moss-300 text-xs font-semibold tracking-[0.12em] uppercase">
              Ditt prov
            </p>
            <p className="font-display mt-2 text-4xl leading-none text-sand-50">
              {createExamConfig(preset).questionCount}
            </p>
            <p className="mt-1 text-sm text-sand-200/80">frågor</p>

            <ul className="mt-5 space-y-2.5 text-sm text-sand-200/90">
              <li className="flex items-center gap-2.5">
                <Clock className="text-moss-300 size-4 shrink-0" />
                {(isSimulation ? true : timerEnabled)
                  ? `${createExamConfig(preset).timeLimitMin} minuter`
                  : 'Ingen tidsgräns'}
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldAlert className="text-moss-300 size-4 shrink-0" />
                {(isSimulation ? false : instantFeedback)
                  ? 'Facit visas direkt'
                  : 'Facit visas vid resultatet'}
              </li>
              <li className="flex items-center gap-2.5">
                <Target className="text-moss-300 size-4 shrink-0" />
                {selectedCategories.length === 0 || isSimulation
                  ? 'Hela kursen'
                  : `${selectedCategories.length} valda områden`}
              </li>
            </ul>

            <Button
              variant="moss"
              size="lg"
              fullWidth
              onClick={start}
              iconLeft={<Play className="size-4.5" />}
              className="mt-6"
            >
              Starta provet
            </Button>
          </Card>

          {recentExams.length > 0 ? (
            <Card>
              <CardHeader title="Tidigare prov" />
              <ul className="space-y-2.5">
                {recentExams.map((exam) => (
                  <li key={exam.id}>
                    <Link
                      to={`/app/prov/resultat/${exam.id}`}
                      className="hover:bg-sand-50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {exam.correctCount} / {exam.totalCount}
                        </span>
                        <span className="text-ink-400 text-xs">
                          {formatRelativeDay(exam.completedAt)}
                        </span>
                      </span>
                      <span className="w-16 shrink-0">
                        <ProgressBar
                          value={exam.scorePercent}
                          size="sm"
                          tone={exam.scorePercent >= 80 ? 'moss' : 'forest'}
                        />
                      </span>
                      <span className="text-ink-700 w-10 shrink-0 text-right text-sm font-semibold tabular-nums">
                        {exam.scorePercent}%
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/app/statistik"
                className="text-forest-700 mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                All statistik
                <ArrowRight className="size-4" />
              </Link>
            </Card>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
