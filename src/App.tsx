import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NotFoundPage } from '@/components/ui/NotFoundPage'
import { AppLayout } from '@/layouts/AppLayout'
import { AchievementsPage } from '@/pages/AchievementsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ExamResultPage } from '@/pages/ExamResultPage'
import { ExamRunnerPage } from '@/pages/ExamRunnerPage'
import { ExamSetupPage } from '@/pages/ExamSetupPage'
import { LandingPage } from '@/pages/LandingPage'
import { PracticePage } from '@/pages/PracticePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SavedPage } from '@/pages/SavedPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { StatisticsPage } from '@/pages/StatisticsPage'
import { TheoryCategoryPage } from '@/pages/TheoryCategoryPage'
import { TheoryChapterPage } from '@/pages/TheoryChapterPage'
import { TheoryPage } from '@/pages/TheoryPage'
import { ProgressProvider } from '@/store/ProgressProvider'

export function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <a
          href="#main"
          className="focus:bg-forest-800 focus:text-sand-50 sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
        >
          Hoppa till innehållet
        </a>

        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* The exam runner is intentionally outside the app shell so the
              simulation mode fills the screen without navigation chrome. */}
          <Route path="/app/prov/kor" element={<ExamRunnerPage />} />

          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="teori" element={<TheoryPage />} />
            <Route path="teori/:categoryId" element={<TheoryCategoryPage />} />
            <Route path="teori/:categoryId/:chapterId" element={<TheoryChapterPage />} />
            <Route path="fragor" element={<PracticePage />} />
            <Route path="prov" element={<ExamSetupPage />} />
            <Route path="prov/resultat/:attemptId" element={<ExamResultPage />} />
            <Route path="statistik" element={<StatisticsPage />} />
            <Route path="sparat" element={<SavedPage />} />
            <Route path="framsteg" element={<AchievementsPage />} />
            <Route path="profil" element={<ProfilePage />} />
            <Route path="installningar" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="mx-auto max-w-lg px-4 py-24">
                <NotFoundPage actionLabel="Till startsidan" actionTo="/" />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  )
}
