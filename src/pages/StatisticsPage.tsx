import {
  CircleCheck,
  CircleX,
  Flame,
  ListChecks,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { CategoryBars } from '@/components/stats/CategoryBars'
import { ProgressChart } from '@/components/stats/ProgressChart'
import { StatCard } from '@/components/stats/StatCard'
import { Card, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { buttonStyles } from '@/components/ui/button-styles'
import { useProgress } from '@/hooks/useProgress'
import { formatRelativeDay } from '@/utils/date'
import { formatNumber } from '@/utils/format'
import { deriveStats, weeklySeries } from '@/utils/stats'

export function StatisticsPage() {
  const { progress } = useProgress()
  const stats = deriveStats(progress)
  const series = weeklySeries(progress)
  const exams = [...progress.exams].reverse()

  if (stats.totalAnswered === 0 && exams.length === 0) {
    return (
      <div>
        <PageHeader eyebrow="Statistik" title="Din utveckling" />
        <EmptyState
          icon={<ListChecks className="size-6" />}
          title="Ingen statistik ännu"
          description="Så snart du svarar på frågor eller gör ett prov börjar vi mäta hur du utvecklas, vecka för vecka."
          action={
            <Link to="/app/fragor" className={buttonStyles('primary', 'md')}>
              Träna på frågor
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Statistik"
        title="Din utveckling"
        description="Siffrorna bygger på allt du svarat på i övningsläget och i prov."
      />

      {/* ── Key numbers ──────────────────────────────────────────────────── */}
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <li>
          <StatCard
            label="Besvarade frågor"
            value={formatNumber(stats.totalAnswered)}
            icon={<ListChecks className="size-4" />}
          />
        </li>
        <li>
          <StatCard
            label="Rätta svar"
            value={formatNumber(stats.correctAnswers)}
            hint={`${Math.round(stats.accuracy)} % av alla svar`}
            icon={<CircleCheck className="size-4" />}
            tone="moss"
          />
        </li>
        <li>
          <StatCard
            label="Felaktiga svar"
            value={formatNumber(stats.incorrectAnswers)}
            icon={<CircleX className="size-4" />}
          />
        </li>
        <li>
          <StatCard
            label="Snitt på prov"
            value={`${Math.round(stats.averageExamScore)} %`}
            hint={`${exams.length} genomförda prov`}
            icon={<Target className="size-4" />}
          />
        </li>
        <li>
          <StatCard
            label="Bästa provresultat"
            value={`${Math.round(stats.bestExamScore)} %`}
            icon={<Trophy className="size-4" />}
            tone="forest"
          />
        </li>
        <li>
          <StatCard
            label="Dagar i rad"
            value={`${stats.streakDays}`}
            icon={<Flame className="size-4" />}
            tone="warning"
          />
        </li>
      </ul>

      {/* ── Development chart ────────────────────────────────────────────── */}
      <Card padding="lg" className="mt-4 sm:mt-6">
        <CardHeader
          title="Din utveckling"
          description="Andel rätta svar per vecka."
          action={
            <Pill tone="success" icon={<TrendingUp className="size-3.5" />}>
              {series.at(-1)?.accuracy ?? 0} % senaste veckan
            </Pill>
          }
        />
        <ProgressChart data={series} />
      </Card>

      <div className="mt-4 grid gap-4 sm:mt-6 lg:grid-cols-2">
        {/* ── Category accuracy ────────────────────────────────────────── */}
        <Card padding="lg">
          <CardHeader
            title="Resultat per ämnesområde"
            description="Klicka på ett område för att gå till teorin."
          />
          <CategoryBars scores={stats.categoryBreakdown} linkToTheory />
        </Card>

        {/* ── Exam history ─────────────────────────────────────────────── */}
        <Card padding="lg">
          <CardHeader title="Provhistorik" description={`${exams.length} genomförda prov.`} />
          {exams.length === 0 ? (
            <p className="text-ink-400 text-sm">Du har inte gjort något prov ännu.</p>
          ) : (
            <ul className="space-y-3">
              {exams.map((exam) => (
                <li key={exam.id}>
                  <Link
                    to={`/app/prov/resultat/${exam.id}`}
                    className="hover:bg-sand-50 -mx-2 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        Prov – {exam.correctCount}/{exam.totalCount}
                      </span>
                      <span className="text-ink-400 text-xs">
                        {formatRelativeDay(exam.completedAt)} · {exam.config.questionCount} frågor
                      </span>
                      <ProgressBar
                        value={exam.scorePercent}
                        size="sm"
                        tone={exam.scorePercent >= 80 ? 'moss' : 'forest'}
                        className="mt-2"
                      />
                    </span>
                    <span className="text-ink-900 w-12 shrink-0 text-right text-lg font-semibold tabular-nums">
                      {exam.scorePercent}%
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
