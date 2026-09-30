import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { mobilePrimaryItems, mobileSecondaryItems } from '@/config/navigation'
import { cn } from '@/utils/cn'

/** Bottom bar plus a "Mer" sheet for the remaining destinations. */
export function MobileNavigation() {
  const location = useLocation()
  // Remembering *where* the sheet was opened makes navigation close it without
  // an effect: the pathname changes, so the sheet no longer matches.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const sheetOpen = openedAt === location.pathname
  const setSheetOpen = (open: boolean) => setOpenedAt(open ? location.pathname : null)

  const secondaryActive = mobileSecondaryItems.some((item) =>
    location.pathname.startsWith(item.to),
  )

  return (
    <>
      {sheetOpen ? (
        <div
          className="animate-fade-in fixed inset-0 z-40 bg-forest-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSheetOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        id="mobile-more-sheet"
        hidden={!sheetOpen}
        className={cn(
          'border-sand-200 animate-rise fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t bg-white p-4 pb-24 shadow-lift lg:hidden',
        )}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-base font-semibold">Mer</h2>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            aria-label="Stäng menyn"
            className="text-ink-500 hover:bg-sand-100 flex size-9 items-center justify-center rounded-full"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {mobileSecondaryItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-forest-800 bg-forest-800 text-sand-50'
                      : 'border-sand-200 text-ink-700 hover:bg-sand-50',
                  )
                }
              >
                <item.icon className="size-4.5 shrink-0" />
                <span className="min-w-0 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="bg-sand-200 text-ink-500 ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[0.5625rem] font-semibold tracking-wide uppercase">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <nav
        aria-label="Huvudmeny"
        className="border-sand-200 fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid grid-cols-5">
          {mobilePrimaryItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 px-1 py-2.5 text-[0.6875rem] font-medium transition-colors duration-200',
                    isActive ? 'text-forest-800' : 'text-ink-400',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        'flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-200',
                        isActive && 'bg-moss-100',
                      )}
                    >
                      <item.icon className="size-5" />
                    </span>
                    {item.shortLabel ?? item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setSheetOpen(!sheetOpen)}
              aria-expanded={sheetOpen}
              aria-controls="mobile-more-sheet"
              className={cn(
                'flex w-full flex-col items-center gap-1 px-1 py-2.5 text-[0.6875rem] font-medium transition-colors duration-200',
                sheetOpen || secondaryActive ? 'text-forest-800' : 'text-ink-400',
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-200',
                  (sheetOpen || secondaryActive) && 'bg-moss-100',
                )}
              >
                <Menu className="size-5" />
              </span>
              Mer
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
