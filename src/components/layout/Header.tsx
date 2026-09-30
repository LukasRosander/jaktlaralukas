import { Flame, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { Logo } from '@/components/layout/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { Pill } from '@/components/ui/Pill'
import { navItems, profileNavItem } from '@/config/navigation'
import { useProfile } from '@/hooks/useProfile'
import { useProgress } from '@/hooks/useProgress'
import { pluralize } from '@/utils/format'
import { calculateStreak } from '@/utils/stats'

function currentTitle(pathname: string): string {
  const match = [...navItems, profileNavItem]
    .filter((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))
    .sort((a, b) => b.to.length - a.to.length)[0]
  return match?.label ?? 'Hem'
}

/** Sticky top bar: brand on mobile, section title and streak on desktop. */
export function Header() {
  const location = useLocation()
  const { progress } = useProgress()
  const profile = useProfile()
  const streak = calculateStreak(progress.activeDays)

  return (
    <header className="border-sand-200 bg-sand-50/85 sticky top-0 z-30 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="lg:hidden" aria-label="Till startsidan">
          <Logo />
        </Link>

        <h1 className="hidden text-lg font-semibold lg:block">{currentTitle(location.pathname)}</h1>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/app/fragor"
            aria-label="Sök i frågor"
            className="text-ink-500 hover:bg-white hover:text-forest-700 hidden size-10 items-center justify-center rounded-full transition-colors sm:flex"
          >
            <Search className="size-4.5" />
          </Link>
          {streak > 0 ? (
            <Pill
              tone="warning"
              icon={<Flame className="size-3.5" />}
              className="hidden sm:inline-flex"
            >
              {streak} {pluralize(streak, 'dag', 'dagar')}
            </Pill>
          ) : null}
          <Link to="/app/profil" aria-label="Min profil" className="shrink-0">
            <Avatar
              name={profile.name}
              src={profile.avatar}
              className="hover:ring-moss-400 transition-all"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
