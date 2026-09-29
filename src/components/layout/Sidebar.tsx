import { Flame } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { Logo } from '@/components/layout/Logo'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { navItems } from '@/config/navigation'
import { getProfile } from '@/data/repository'
import { useProgress } from '@/hooks/useProgress'
import { cn } from '@/utils/cn'
import { deriveStats } from '@/utils/stats'

/** Desktop navigation rail. Hidden below the `lg` breakpoint. */
export function Sidebar() {
  const { progress } = useProgress()
  const stats = deriveStats(progress)
  const profile = getProfile()

  return (
    <aside className="border-sand-200 bg-sand-100/70 hidden w-72 shrink-0 flex-col border-r px-4 py-6 lg:flex xl:w-76">
      <Link to="/" className="mb-8 px-2" aria-label="Till startsidan">
        <Logo withTagline />
      </Link>

      <nav aria-label="Huvudmeny" className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-forest-800 text-sand-50 shadow-soft'
                      : 'text-ink-700 hover:bg-white hover:text-forest-800',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn(
                        'size-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110',
                        isActive ? 'text-moss-300' : 'text-ink-400 group-hover:text-forest-600',
                      )}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-sand-200 mt-6 space-y-4 border-t pt-5">
        <div className="px-1">
          <ProgressBar
            value={stats.overallProgress}
            label="Dina framsteg"
            showValue
            tone="forest"
          />
          <p className="text-ink-500 mt-2 text-xs">
            {stats.completedChapterCount} av {stats.totalChapterCount} kapitel klara
          </p>
        </div>

        <Link
          to="/app/profil"
          className="hover:shadow-soft flex items-center gap-3 rounded-xl bg-white p-3 transition-shadow"
        >
          <img
            src={profile.avatar}
            alt=""
            className="ring-moss-200 size-10 rounded-full object-cover ring-2"
          />
          <span className="min-w-0 flex-1">
            <span className="text-ink-900 block truncate text-sm font-semibold">
              {profile.name}
            </span>
            <span className="text-ink-500 flex items-center gap-1 text-xs">
              <Flame className="text-amber-ochre size-3.5" />
              {stats.streakDays} dagar i rad
            </span>
          </span>
        </Link>
      </div>
    </aside>
  )
}
