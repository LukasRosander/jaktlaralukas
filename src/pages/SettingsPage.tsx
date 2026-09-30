import { Database, LogOut, RotateCcw, Trash2, TriangleAlert } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Switch } from '@/components/ui/Switch'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { cn } from '@/utils/cn'
import type { UserSettings } from '@/types'

const questionCounts: Array<UserSettings['defaultQuestionCount']> = [25, 50, 70]
const fontScales: Array<{ id: UserSettings['fontScale']; label: string }> = [
  { id: 'liten', label: 'Liten' },
  { id: 'normal', label: 'Normal' },
  { id: 'stor', label: 'Stor' },
]
const dailyGoals = [5, 10, 20, 30]

export function SettingsPage() {
  const { progress, updateSettings, resetProgress, restoreDemoData } = useProgress()
  const { account, signOut } = useAuth()
  const settings = progress.settings
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div>
      <PageHeader
        eyebrow="Inställningar"
        title="Inställningar"
        description="Alla inställningar sparas lokalt i din webbläsare i den här versionen."
      />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* ── Exam defaults ────────────────────────────────────────────── */}
        <Card padding="lg">
          <CardHeader
            title="Prov"
            description="Standardvalen som föreslås när du startar ett nytt prov."
          />

          <fieldset>
            <legend className="text-ink-900 mb-2.5 text-sm font-medium">Antal frågor</legend>
            <div className="flex gap-2">
              {questionCounts.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => updateSettings({ defaultQuestionCount: count })}
                  aria-pressed={settings.defaultQuestionCount === count}
                  className={cn(
                    'flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                    settings.defaultQuestionCount === count
                      ? 'border-forest-700 bg-forest-800 text-sand-50'
                      : 'border-sand-300 text-ink-600 hover:border-forest-300 bg-white',
                  )}
                >
                  {count}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 space-y-5">
            <Switch
              label="Visa rätt svar direkt"
              description="Förvalt läge för nya prov. Provläget visar aldrig facit under provet."
              checked={settings.instantFeedback}
              onChange={(value) => updateSettings({ instantFeedback: value })}
            />
            <Switch
              label="Timer påslagen"
              description="Räknar ner tiden under provet."
              checked={settings.timerEnabled}
              onChange={(value) => updateSettings({ timerEnabled: value })}
            />
          </div>
        </Card>

        {/* ── Practice ─────────────────────────────────────────────────── */}
        <Card padding="lg">
          <CardHeader title="Träning" description="Hur övningsfrågorna presenteras." />

          <Switch
            label="Blanda frågorna"
            description="Slumpa ordningen i stället för att följa kursens ordning."
            checked={settings.shuffleQuestions}
            onChange={(value) => updateSettings({ shuffleQuestions: value })}
          />

          <fieldset className="mt-6">
            <legend className="text-ink-900 mb-2.5 text-sm font-medium">
              Dagligt mål (frågor per dag)
            </legend>
            <div className="flex gap-2">
              {dailyGoals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => updateSettings({ dailyGoal: goal })}
                  aria-pressed={settings.dailyGoal === goal}
                  className={cn(
                    'flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    settings.dailyGoal === goal
                      ? 'border-forest-700 bg-forest-800 text-sand-50'
                      : 'border-sand-300 text-ink-600 hover:border-forest-300 bg-white',
                  )}
                >
                  {goal}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <Switch
              label="Påminnelse på startsidan"
              description="Visa dagens träningsmål på dashboarden."
              checked={settings.dailyReminder}
              onChange={(value) => updateSettings({ dailyReminder: value })}
            />
          </div>
        </Card>

        {/* ── Accessibility ────────────────────────────────────────────── */}
        <Card padding="lg">
          <CardHeader
            title="Utseende och tillgänglighet"
            description="Anpassa läsupplevelsen efter dig."
          />

          <fieldset>
            <legend className="text-ink-900 mb-2.5 text-sm font-medium">Textstorlek</legend>
            <div className="flex gap-2">
              {fontScales.map((scale) => (
                <button
                  key={scale.id}
                  type="button"
                  onClick={() => updateSettings({ fontScale: scale.id })}
                  aria-pressed={settings.fontScale === scale.id}
                  className={cn(
                    'flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    settings.fontScale === scale.id
                      ? 'border-forest-700 bg-forest-800 text-sand-50'
                      : 'border-sand-300 text-ink-600 hover:border-forest-300 bg-white',
                  )}
                >
                  {scale.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <Switch
              label="Reducera animationer"
              description="Stänger av rörelse i övergångar och diagram."
              checked={settings.reduceMotion}
              onChange={(value) => updateSettings({ reduceMotion: value })}
            />
          </div>
        </Card>

        {/* ── Data ─────────────────────────────────────────────────────── */}
        <Card padding="lg">
          <CardHeader
            title="Dina data"
            description="Framstegen sparas i webbläsarens localStorage. Ingenting skickas till en server i den här versionen."
          />

          <p className="text-ink-500 mb-3 text-sm">
            Vill du se hur appen ser ut med historik kan du fylla på med exempeldata. Den ersätter
            dina egna framsteg.
          </p>

          <div className="space-y-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={restoreDemoData}
              iconLeft={<Database className="size-4" />}
            >
              Fyll på med demodata
            </Button>

            {confirmReset ? (
              <div className="border-berry-500/25 bg-berry-50 rounded-2xl border p-4">
                <p className="text-berry-600 flex items-center gap-2 text-sm font-semibold">
                  <TriangleAlert className="size-4.5 shrink-0" />
                  Nollställ alla framsteg?
                </p>
                <p className="text-ink-600 mt-1.5 text-sm">
                  Kapitel, svar, prov, sparat innehåll och märken tas bort. Det går inte att ångra.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button variant="danger" onClick={resetProgress} iconLeft={<Trash2 className="size-4" />}>
                    Ja, nollställ
                  </Button>
                  <Button variant="secondary" onClick={() => setConfirmReset(false)}>
                    Avbryt
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setConfirmReset(true)}
                iconLeft={<RotateCcw className="size-4" />}
                className="text-berry-600 hover:bg-berry-50"
              >
                Nollställ framsteg
              </Button>
            )}
          </div>
        </Card>

        {/* ── Account ──────────────────────────────────────────────────── */}
        <Card padding="lg">
          <CardHeader
            title="Konto"
            description={`Inloggad som ${account?.username ?? 'okänd'}.`}
          />
          <p className="text-ink-500 mb-3 text-sm">
            Framstegen hör till det här kontot. Loggar du in med ett annat konto får du dess egna
            kapitel, prov och märken.
          </p>
          <Button
            variant="secondary"
            fullWidth
            onClick={signOut}
            iconLeft={<LogOut className="size-4" />}
          >
            Logga ut
          </Button>
        </Card>
      </div>

      <p className="text-ink-400 mt-6 text-xs leading-relaxed">
        Frågorna i appen är egna exempelfrågor skrivna i utbildningssyfte. De är inte hämtade från
        det officiella provet för jägarexamen. Kontrollera alltid gällande regler hos
        Naturvårdsverket och din länsstyrelse inför jakt.
      </p>
    </div>
  )
}
