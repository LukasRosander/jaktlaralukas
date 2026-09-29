import { Outlet, useLocation } from 'react-router-dom'

import { AchievementToast } from '@/components/achievements/AchievementToast'
import { Header } from '@/components/layout/Header'
import { MobileNavigation } from '@/components/layout/MobileNavigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { useScrollToTop } from '@/hooks/useScrollToTop'

/** Shell for every signed-in screen: rail on desktop, bottom bar on mobile. */
export function AppLayout() {
  const location = useLocation()
  useScrollToTop()

  return (
    <div className="bg-sand-50 flex min-h-dvh">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main
          id="main"
          className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-28 sm:px-6 sm:pt-8 lg:px-8 lg:pb-16"
        >
          {/* Keying on the path replays the entrance animation per page. */}
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNavigation />
      <AchievementToast />
    </div>
  )
}
