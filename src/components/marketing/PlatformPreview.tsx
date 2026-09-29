import { BookOpen, ChartColumnBig, Flame, House, ListChecks, Target } from 'lucide-react'

import { images } from '@/data/images'
import { cn } from '@/utils/cn'

const railItems = [
  { icon: House, label: 'Hem', active: true },
  { icon: BookOpen, label: 'Teori' },
  { icon: ListChecks, label: 'Frågor' },
  { icon: Target, label: 'Prov' },
  { icon: ChartColumnBig, label: 'Statistik' },
]

const recentResults = [
  { label: 'Prov', score: '45/50', percent: 90 },
  { label: 'Prov', score: '42/50', percent: 84 },
  { label: 'Prov', score: '37/50', percent: 74 },
]

/**
 * Static, non-interactive rendering of the dashboard used as the hero visual.
 * Deliberately decoupled from the live app so marketing copy can differ.
 */
export function PlatformPreview({ className }: { className?: string }) {
  return (
    <div
      aria-label="Förhandsvisning av studieplattformen"
      role="img"
      className={cn(
        'border-forest-700/40 bg-forest-900/60 overflow-hidden rounded-2xl border p-2 shadow-lift backdrop-blur-sm sm:rounded-3xl sm:p-3',
        className,
      )}
    >
      <div className="bg-sand-50 overflow-hidden rounded-xl sm:rounded-2xl">
        <div className="border-sand-200 flex items-center gap-1.5 border-b bg-white px-3 py-2">
          <span className="bg-berry-500/40 size-2 rounded-full" />
          <span className="bg-amber-ochre/40 size-2 rounded-full" />
          <span className="bg-moss-400/50 size-2 rounded-full" />
          <span className="text-ink-400 ml-2 truncate text-[0.625rem]">
            jagarexamen.app / dashboard
          </span>
        </div>

        <div className="flex">
          <div className="border-sand-200 bg-sand-100/60 hidden w-36 shrink-0 flex-col gap-1 border-r p-2.5 sm:flex">
            {railItems.map((item) => (
              <span
                key={item.label}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.6875rem] font-medium',
                  item.active ? 'bg-forest-800 text-sand-50' : 'text-ink-500',
                )}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 space-y-2.5 p-3 sm:p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.625rem] font-semibold tracking-wider text-forest-600 uppercase">
                  Välkommen tillbaka
                </p>
                <p className="text-ink-900 text-sm font-semibold sm:text-base">
                  Fortsätt där du slutade
                </p>
              </div>
              <span className="bg-amber-ochre-light text-amber-ochre flex items-center gap-1 rounded-full px-2 py-1 text-[0.625rem] font-semibold">
                <Flame className="size-3" />
                65 dagar
              </span>
            </div>

            <div className="bg-forest-800 rounded-xl p-3 text-sand-100">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.6875rem] text-sand-200/80">Dina framsteg</span>
                <span className="text-lg font-semibold">40 %</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="bg-moss-300 h-full w-[40%] rounded-full" />
              </div>
              <p className="mt-1.5 text-[0.625rem] text-sand-200/70">8 av 20 kapitel klara</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '326', label: 'rätta svar' },
                { value: '458', label: 'frågor' },
                { value: '84 %', label: 'bästa prov' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border-sand-200 rounded-xl border bg-white px-2 py-2"
                >
                  <p className="text-ink-900 text-sm font-semibold tabular-nums">{stat.value}</p>
                  <p className="text-ink-400 text-[0.5625rem]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="border-sand-200 flex gap-2.5 overflow-hidden rounded-xl border bg-white p-2.5">
              <img
                src={images.species.alg}
                alt=""
                className="size-14 shrink-0 rounded-lg object-cover sm:size-16"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[0.5625rem] font-semibold tracking-wider text-forest-600 uppercase">
                  Fortsätt plugga
                </p>
                <p className="text-ink-900 truncate text-xs font-semibold">Viltet i Sverige</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-sand-200">
                  <div className="bg-forest-600 h-full w-[75%] rounded-full" />
                </div>
                <p className="text-ink-400 mt-1 text-[0.5625rem]">75 % klart</p>
              </div>
            </div>

            <div className="border-sand-200 rounded-xl border bg-white p-2.5">
              <p className="text-ink-700 mb-1.5 text-[0.625rem] font-semibold">Senaste resultat</p>
              <ul className="space-y-1">
                {recentResults.map((result) => (
                  <li key={result.percent} className="flex items-center gap-2">
                    <span className="text-ink-500 w-12 shrink-0 text-[0.5625rem]">
                      {result.label}
                    </span>
                    <span className="h-1 flex-1 overflow-hidden rounded-full bg-sand-200">
                      <span
                        className="bg-moss-500 block h-full rounded-full"
                        style={{ width: `${result.percent}%` }}
                      />
                    </span>
                    <span className="text-ink-700 w-14 shrink-0 text-right text-[0.5625rem] font-semibold tabular-nums">
                      {result.score}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
