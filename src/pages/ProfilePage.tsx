import { ArrowRight, CalendarDays, CircleCheck, Flame, LogOut, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BadgeCard } from '@/components/achievements/BadgeCard'
import { StatCard } from '@/components/stats/StatCard'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { buttonStyles } from '@/components/ui/button-styles'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { useProgress } from '@/hooks/useProgress'
import { daysUntil, formatLongDate, formatMonthYear } from '@/utils/date'
import { achievementStatuses } from '@/utils/achievements'
import { formatNumber } from '@/utils/format'
import { deriveStats } from '@/utils/stats'

export function ProfilePage() {
  const { progress } = useProgress()
  const profile = useProfile()
  const { account, signOut } = useAuth()
  const stats = deriveStats(progress)
  const statuses = achievementStatuses(progress)
  const unlocked = statuses.filter((status) => status.unlocked)

  const daysToExam = profile.examGoalDate ? daysUntil(profile.examGoalDate) : undefined

  return (
    <div>
      {/* ── Profile header ───────────────────────────────────────────────── */}
      <Card padding="lg" className="animate-rise">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
          <Avatar name={profile.name} src={profile.avatar} size="lg" className="ring-4" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl leading-tight sm:text-4xl">{profile.name}</h1>
            <p className="text-ink-500 mt-1 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm sm:justify-start">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                Medlem sedan {formatMonthYear(profile.memberSince)}
              </span>
              {account ? <span className="text-ink-400">@{account.username}</span> : null}
            </p>
            {daysToExam !== undefined && daysToExam > 0 ? (
              <Pill tone="warning" icon={<Target className="size-3.5" />} className="mt-3">
                {daysToExam} dagar till provdatum {formatLongDate(profile.examGoalDate!)}
              </Pill>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/app/installningar" className={buttonStyles('secondary', 'md')}>
              Inställningar
            </Link>
            <Button variant="ghost" onClick={signOut} iconLeft={<LogOut className="size-4" />}>
              Logga ut
            </Button>
          </div>
        </div>

        <div className="border-sand-200 mt-7 border-t pt-6">
          <ProgressBar
            value={stats.overallProgress}
            label="Teorin totalt"
            showValue
            size="md"
          />
          <p className="text-ink-500 mt-2.5 text-sm">
            {stats.completedChapterCount} av {stats.totalChapterCount} kapitel klara
          </p>
        </div>
      </Card>

      {/* ── Key figures ──────────────────────────────────────────────────── */}
      <ul className="mt-4 grid grid-cols-3 gap-3 sm:mt-6 sm:gap-4">
        <li>
          <StatCard
            label="kapitel"
            value={`${stats.completedChapterCount}`}
            icon={<CircleCheck className="size-4" />}
          />
        </li>
        <li>
          <StatCard
            label="rätt"
            value={formatNumber(stats.correctAnswers)}
            icon={<Target className="size-4" />}
            tone="moss"
          />
        </li>
        <li>
          <StatCard
            label="dagar i rad"
            value={`${stats.streakDays}`}
            icon={<Flame className="size-4" />}
            tone="warning"
          />
        </li>
      </ul>

      {/* ── Badges ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="mina-marken" className="mt-6 sm:mt-8">
        <Card padding="lg">
          <CardHeader
            title={<span id="mina-marken">Mina märken</span>}
            description={`${unlocked.length} av ${statuses.length} märken upplåsta.`}
            action={
              <Link
                to="/app/framsteg"
                className="text-forest-700 hidden shrink-0 items-center gap-1.5 text-sm font-medium hover:underline sm:inline-flex"
              >
                Se alla
                <ArrowRight className="size-4" />
              </Link>
            }
          />

          {unlocked.length === 0 ? (
            <p className="text-ink-500 text-sm">
              Du har inga märken ännu. Läs ditt första kapitel eller gör ett prov för att låsa upp
              det första.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {unlocked.slice(0, 8).map((status) => (
                <li key={status.achievement.id}>
                  <BadgeCard status={status} />
                </li>
              ))}
            </ul>
          )}

          <Link
            to="/app/framsteg"
            className={buttonStyles('secondary', 'md', 'mt-6 w-full sm:hidden')}
          >
            Se alla märken
            <ArrowRight className="size-4" />
          </Link>
        </Card>
      </section>
    </div>
  )
}
