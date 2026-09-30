import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Flame,
  ListChecks,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { CategoryBars } from '@/components/stats/CategoryBars'
import { Card, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { buttonStyles } from '@/components/ui/button-styles'
import { getProfile } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { formatNumber, pluralize } from '@/utils/format'
import { nextUpChapter, recommendedQuestionCount } from '@/utils/learning'
import { answeredToday, deriveStats, weakestCategories } from '@/utils/stats'
import { formatRelativeDay } from '@/utils/date'

export function DashboardPage() {
  const { progress } = useProgress()
  const profile = getProfile()
  const stats = deriveStats(progress)
  const nextUp = nextUpChapter(progress)
  const goal = recommendedQuestionCount(progress)
  const todayCount = answeredToday(progress)
  const remaining = Math.max(0, goal - todayCount)
  const recentExams = [...progress.exams].reverse().slice(0, 3)
  // When the reminder is turned off in settings, the card drops the daily goal
  // framing and simply offers a practice session.
  const showDailyGoal = progress.settings.dailyReminder
  // A brand new visitor gets welcoming copy instead of "continue where you left
  // off", which would be confusing with nothing to continue from.
  const hasStarted =
    stats.totalAnswered > 0 || stats.completedChapterCount > 0 || progress.exams.length > 0

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="animate-rise">
        <p className="text-forest-600 text-xs font-semibold tracking-[0.12em] uppercase">
          {hasStarted ? `Välkommen tillbaka, ${profile.name}!` : `Välkommen, ${profile.name}!`}
        </p>
        <h1 className="font-display mt-1.5 text-3xl leading-tight sm:text-4xl">
          {hasStarted ? 'Fortsätt där du slutade.' : 'Så här kommer du igång.'}
        </h1>
      </header>

      {/* ── Progress overview ────────────────────────────────────────────── */}
      <Card tone="forest" padding="lg" className="relative overflow-hidden">
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-moss-300 text-xs font-semibold tracking-[0.12em] uppercase">
              Dina framsteg
            </p>
            <p className="font-display mt-2 text-5xl leading-none text-sand-50 sm:text-6xl">
              {Math.round(stats.overallProgress)} %
            </p>
            <ProgressBar
              value={stats.overallProgress}
              tone="light"
              size="lg"
              className="mt-5 max-w-xl"
            />
            <p className="mt-3 text-sm text-sand-200/80">
              {stats.completedChapterCount} av {stats.totalChapterCount} kapitel klara
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 lg:gap-8">
            {[
              {
                value: formatNumber(stats.correctAnswers),
                label: 'rätta svar',
                icon: <CircleCheck className="size-4" />,
              },
              {
                value: `${stats.streakDays}`,
                label: 'dagar i rad',
                icon: <Flame className="size-4" />,
              },
              {
                value: progress.exams.length > 0 ? `${Math.round(stats.bestExamScore)} %` : '–',
                label: 'bästa prov',
                icon: <TrendingUp className="size-4" />,
              },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-moss-300 mb-1.5 flex items-center gap-1.5 text-xs">
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </dt>
                <dd>
                  <span className="text-sand-50 block text-2xl font-semibold tabular-nums sm:text-3xl">
                    {item.value}
                  </span>
                  <span className="text-xs text-sand-200/70">{item.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Card>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* ── Continue studying ──────────────────────────────────────────── */}
        <section aria-labelledby="fortsatt-plugga">
          <h2 id="fortsatt-plugga" className="mb-3 text-lg font-semibold">
            {hasStarted ? 'Fortsätt plugga' : 'Börja här'}
          </h2>

          {nextUp ? (
            <Card padding="none" className="overflow-hidden" interactive>
              <div className="flex flex-col sm:flex-row">
                <img
                  src={nextUp.category.image}
                  alt={nextUp.category.title}
                  className="h-40 w-full object-cover sm:h-auto sm:w-48 lg:w-56"
                />
                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <Pill tone="moss" icon={<BookOpen className="size-3.5" />} className="self-start">
                    Teori
                  </Pill>
                  <h3 className="mt-3 text-xl leading-tight font-semibold sm:text-2xl">
                    {nextUp.category.title}
                  </h3>
                  <p className="text-ink-500 mt-1.5 text-sm">
                    {nextUp.categoryPercent > 0 ? 'Nästa kapitel' : 'Första kapitlet'}:{' '}
                    {nextUp.chapter.title}
                  </p>

                  <div className="mt-4">
                    <ProgressBar
                      value={nextUp.categoryPercent}
                      label={`${Math.round(nextUp.categoryPercent)} % klart`}
                      size="sm"
                    />
                  </div>

                  <Link
                    to={`/app/teori/${nextUp.category.id}/${nextUp.chapter.id}`}
                    className={buttonStyles('primary', 'md', 'mt-5 self-start')}
                  >
                    {nextUp.categoryPercent > 0 ? 'Fortsätt läsa' : 'Börja läsa'}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ) : (
            <EmptyState
              icon={<Sparkles className="size-6" />}
              title="All teori är avklarad"
              description="Snyggt jobbat. Håll kunskapen varm med ett prov eller repetera ett kapitel du sparat."
              action={
                <Link to="/app/prov" className={buttonStyles('primary', 'md')}>
                  Gör ett prov
                </Link>
              }
            />
          )}
        </section>

        {/* ── Today's practice ───────────────────────────────────────────── */}
        <section aria-labelledby="dagens-traning">
          <h2 id="dagens-traning" className="mb-3 text-lg font-semibold">
            {showDailyGoal ? 'Dagens träning' : 'Träna på frågor'}
          </h2>
          <Card className="flex h-full flex-col">
            <span className="bg-moss-100 text-forest-700 flex size-11 items-center justify-center rounded-xl">
              <ListChecks className="size-5.5" />
            </span>

            {showDailyGoal ? (
              <>
                <p className="mt-4 text-lg font-semibold">
                  {remaining > 0
                    ? `${remaining} ${pluralize(remaining, 'fråga', 'frågor')} rekommenderas idag`
                    : 'Dagens mål är klart'}
                </p>
                <p className="text-ink-500 mt-1 text-sm">
                  {remaining > 0
                    ? `Du har svarat på ${todayCount} av ${goal} frågor idag.`
                    : `Du har svarat på ${todayCount} frågor idag. Fortsätt gärna om du har tid.`}
                </p>
                <ProgressBar
                  value={goal === 0 ? 100 : (todayCount / goal) * 100}
                  size="sm"
                  tone={remaining > 0 ? 'forest' : 'moss'}
                  className="mt-4"
                />
              </>
            ) : (
              <>
                <p className="mt-4 text-lg font-semibold">Öva när det passar dig</p>
                <p className="text-ink-500 mt-1 text-sm">
                  Du får facit och en förklaring direkt efter varje svar.
                </p>
              </>
            )}

            <Link to="/app/fragor" className={buttonStyles('primary', 'md', 'mt-5 self-start')}>
              {showDailyGoal && remaining === 0 ? 'Träna mer' : 'Starta träning'}
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/app/prov"
              className="text-forest-700 mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
            >
              <Target className="size-4" />
              Eller gör ett helt prov
            </Link>
          </Card>
        </section>
      </div>

      {/* ── Recent results ───────────────────────────────────────────────── */}
      <section aria-labelledby="senaste-resultat">
        <div className="mb-3 flex items-end justify-between gap-4">
          <h2 id="senaste-resultat" className="text-lg font-semibold">
            Senaste resultat
          </h2>
          <Link
            to="/app/statistik"
            className="text-forest-700 text-sm font-medium hover:underline"
          >
            All statistik
          </Link>
        </div>

        {recentExams.length === 0 ? (
          <EmptyState
            icon={<Target className="size-6" />}
            title="Inga prov ännu"
            description="Gör ditt första prov för att se hur du ligger till. Du väljer själv antal frågor och om timern ska vara på."
            action={
              <Link to="/app/prov" className={buttonStyles('primary', 'md')}>
                Starta ett prov
              </Link>
            }
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-3">
            {recentExams.map((exam) => (
              <li key={exam.id}>
                <Link to={`/app/prov/resultat/${exam.id}`} className="block h-full">
                  <Card interactive className="h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-ink-500 text-sm">
                          Prov · {formatRelativeDay(exam.completedAt)}
                        </p>
                        <p className="mt-1 text-2xl font-semibold tabular-nums">
                          {exam.correctCount} / {exam.totalCount}
                        </p>
                      </div>
                      <Pill tone={exam.scorePercent >= 80 ? 'success' : 'warning'}>
                        {exam.scorePercent} %
                      </Pill>
                    </div>
                    <ProgressBar
                      value={exam.scorePercent}
                      size="sm"
                      tone={exam.scorePercent >= 80 ? 'moss' : 'forest'}
                      className="mt-4"
                    />
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── Focus areas ──────────────────────────────────────────────────── */}
      {stats.totalAnswered > 0 ? (
        <section aria-labelledby="fokusomraden">
          <Card padding="lg">
            <CardHeader
              title={<span id="fokusomraden">Områden att fokusera på</span>}
              description="Baserat på dina svar – de ämnen där du har lägst andel rätt."
              action={
                <Link
                  to="/app/statistik"
                  className="text-forest-700 hidden shrink-0 text-sm font-medium hover:underline sm:block"
                >
                  Se allt
                </Link>
              }
            />
            <CategoryBars scores={weakestCategories(progress)} linkToTheory />
          </Card>
        </section>
      ) : null}
    </div>
  )
}
