import { BookOpen, Lock, MessageSquare, Send, ShieldCheck, Target } from 'lucide-react'

import { Card, CardHeader } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pill } from '@/components/ui/Pill'
import { SourceList } from '@/components/ui/SourceList'
import { sources } from '@/data/sources'

const planned = [
  {
    icon: BookOpen,
    title: 'Svar grundade i kursens teori',
    text: 'Coachen ska svara utifrån kapitlen i plattformen och visa vilket kapitel svaret bygger på, i stället för att formulera egna regler.',
  },
  {
    icon: Target,
    title: 'Råd om studieteknik',
    text: 'Utifrån din statistik ska den kunna föreslå vad du bör repetera och hur du lägger upp veckan inför provet.',
  },
  {
    icon: ShieldCheck,
    title: 'Avgränsad till jakt och studier',
    text: 'Frågor utanför ämnet avvisas, och lagar och regler hänvisas alltid vidare till Naturvårdsverket och gällande lagtext.',
  },
]

/**
 * Placeholder for the planned study assistant.
 *
 * The chat is deliberately inert: it needs a server to hold an API key, which
 * the prototype does not have. Everything here is presentation only, so nobody
 * can mistake it for a working assistant.
 */
export function AiCoachPage() {
  return (
    <div>
      <PageHeader
        eyebrow="AI-coach"
        title="Din studiecoach – inte aktiv ännu"
        description="Här kommer du att kunna ställa frågor om jakt och få råd om studieteknik. Funktionen är förberedd men avstängd tills vidare."
      />

      <Card padding="none" className="overflow-hidden">
        <div className="border-sand-200 flex items-center justify-between gap-3 border-b px-5 py-4">
          <span className="flex items-center gap-2.5">
            <span className="bg-moss-100 text-forest-700 flex size-9 items-center justify-center rounded-xl">
              <MessageSquare className="size-4.5" />
            </span>
            <span className="font-semibold">Studiecoachen</span>
          </span>
          <Pill tone="warning" icon={<Lock className="size-3.5" />}>
            Inte aktiv
          </Pill>
        </div>

        {/* Inert mock conversation, dimmed so it reads as an illustration. */}
        <div aria-hidden="true" className="space-y-3 px-5 py-6 opacity-50 select-none">
          <p className="bg-forest-800 text-sand-50 ml-auto w-fit max-w-xs rounded-2xl rounded-br-md px-4 py-2.5 text-sm sm:max-w-sm">
            Hur skiljer jag dovhjort från kronhjort på håll?
          </p>
          <p className="bg-sand-100 text-ink-700 mr-auto w-fit max-w-sm rounded-2xl rounded-bl-md px-4 py-2.5 text-sm sm:max-w-md">
            Titta på spegeln och svansen: dovhjorten har en tydlig svart ram runt spegeln och en
            längre svans …
          </p>
        </div>

        <div className="border-sand-200 border-t p-4">
          <div className="border-sand-300 bg-sand-50 flex items-center gap-3 rounded-xl border px-4 py-3">
            <input
              type="text"
              disabled
              placeholder="Chatten är avstängd i den här versionen"
              aria-label="Fråga studiecoachen (inte aktiv)"
              className="text-ink-400 placeholder:text-ink-400 min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <span className="text-ink-300" aria-hidden="true">
              <Send className="size-4.5" />
            </span>
          </div>
          <p className="text-ink-400 mt-3 text-xs leading-relaxed">
            Att svara kräver en språkmodell bakom en server som håller API-nyckeln. Prototypen körs
            helt i webbläsaren och har ingen sådan server, så fältet är avstängt i stället för att ge
            sken av att fungera.
          </p>
        </div>
      </Card>

      <section className="mt-6">
        <Card padding="lg">
          <CardHeader
            title="Så är funktionen tänkt att fungera"
            description="Planen för när coachen slås på."
          />
          <ul className="grid gap-5 sm:grid-cols-3">
            {planned.map((item) => (
              <li key={item.title}>
                <span className="bg-moss-100 text-forest-700 mb-3 flex size-10 items-center justify-center rounded-xl">
                  <item.icon className="size-5" />
                </span>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-ink-500 mt-1.5 text-sm leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-6">
        <Card padding="lg" tone="sand">
          <h2 className="text-lg font-semibold">Varför den inte bara sätts på</h2>
          <p className="text-ink-600 mt-2 text-sm leading-relaxed">
            Jakt rör vapenhantering, jakttider och eftersök – områden där ett påhittat svar kan bli
            både farligt och olagligt, och där den som pluggar inte kan upptäcka felet. Coachen
            släpps därför inte på förrän svaren kan beläggas mot kursens kapitel och mot gällande
            regler.
          </p>
          <SourceList sources={[sources.naturvardsverketJakt, sources.jaktlagen]} />
        </Card>
      </section>
    </div>
  )
}
