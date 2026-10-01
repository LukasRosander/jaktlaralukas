import {
  ArrowRight,
  BookOpen,
  ChartColumnBig,
  CircleCheck,
  Code,
  HeartHandshake,
  Info,
  ListChecks,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Target,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { buttonStyles } from '@/components/ui/button-styles'
import { images } from '@/data/images'
import { questions } from '@/data/questions'
import { theoryCategories, totalChapterCount } from '@/data/theory'
import { useScrollToHash } from '@/hooks/useScrollToHash'

const steps = [
  {
    icon: BookOpen,
    title: 'Läs teorin kapitel för kapitel',
    text: 'Tolv områden från artkännedom till lagstiftning, med faktarutor, tabeller och sammanfattningar av det du måste kunna.',
  },
  {
    icon: ListChecks,
    title: 'Träna på frågor direkt efteråt',
    text: 'Varje fråga har en förklaring som lär ut resonemanget, inte bara rätt bokstav. Du ser direkt om du svarade rätt.',
  },
  {
    icon: Target,
    title: 'Gör prov under tidspress',
    text: 'Välj 25, 50 eller 70 frågor – eller kör provläget som efterliknar en riktig provsituation med timer.',
  },
  {
    icon: ChartColumnBig,
    title: 'Följ utvecklingen och täpp till luckorna',
    text: 'Statistiken visar vilka ämnen som sitter och vilka som behöver mer tid, vecka för vecka.',
  },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Sakligt innehåll med källor',
    text: 'Varje kapitel och fråga kan kopplas till sina källor, så att innehållet går att granska och hålla uppdaterat.',
  },
  {
    icon: Smartphone,
    title: 'Byggd för mobilen först',
    text: 'Läs ett kapitel i kön till bussen och gör ett prov vid skrivbordet. Samma framsteg, samma upplevelse.',
  },
  {
    icon: Trophy,
    title: 'Märken som håller igång dig',
    text: 'Streaks, delmål och märken gör det lättare att plugga regelbundet i stället för allt på en kväll.',
  },
]

export function LandingPage() {
  useScrollToHash()

  const stats = [
    { value: `${questions.length}`, label: 'exempelfrågor' },
    { value: `${totalChapterCount}`, label: 'teorikapitel' },
    { value: `${theoryCategories.length}`, label: 'ämnesområden' },
  ]

  return (
    <div className="bg-sand-50 min-h-dvh">
      <MarketingHeader />

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <img
            src={images.heroForest}
            alt=""
            className="absolute inset-0 size-full object-cover"
            aria-hidden="true"
          />
          <div className="from-forest-950/95 via-forest-900/85 to-forest-800/70 absolute inset-0 bg-gradient-to-br" />

          <div className="relative mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="animate-rise flex flex-col items-center text-center">
              <Pill tone="sand" icon={<CircleCheck className="size-3.5" />}>
                Öppen studieplattform · gratis att använda
              </Pill>

              <h1 className="font-display mt-5 text-4xl leading-[1.05] text-sand-50 sm:text-5xl lg:text-6xl">
                Jaktlära
              </h1>
              <p className="text-moss-300 mt-3 text-xl font-medium sm:text-2xl">
                Din väg till jägarexamen
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-200/90 sm:text-lg">
                Förbered dig smartare inför jägarexamen. Lär dig teorin, träna på frågor och följ
                dina framsteg.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
                <Link to="/app" className={buttonStyles('moss', 'lg')}>
                  Börja plugga
                  <ArrowRight className="size-4.5" />
                </Link>
                <a
                  href="#sa-fungerar-det"
                  className={buttonStyles(
                    'secondary',
                    'lg',
                    'border-white/25 bg-white/10 text-sand-50 hover:border-white/40 hover:bg-white/15',
                  )}
                >
                  <PlayCircle className="size-4.5" />
                  Se hur det fungerar
                </a>
              </div>

              <dl className="border-forest-700/60 mt-10 grid w-full max-w-md grid-cols-3 gap-4 border-t pt-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="text-sand-50 block text-2xl font-semibold tabular-nums">
                        {stat.value}
                      </span>
                      <span className="text-sand-300/70 text-xs">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section id="sa-fungerar-det" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-forest-600 text-xs font-semibold tracking-[0.12em] uppercase">
                Så fungerar det
              </p>
              <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">
                Fyra steg från första kapitlet till godkänt prov
              </h2>
              <p className="text-ink-500 mt-4">
                Plattformen är byggd kring en enkel rytm: läs, träna, prova, justera. Allt du gör
                sparas så att du alltid kan fortsätta där du slutade.
              </p>
            </div>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <Card className="h-full" interactive>
                    <span className="bg-moss-100 text-forest-700 flex size-11 items-center justify-center rounded-xl">
                      <step.icon className="size-5.5" />
                    </span>
                    <p className="text-ink-400 mt-4 text-xs font-semibold tracking-wider">
                      STEG {index + 1}
                    </p>
                    <h3 className="mt-1 text-lg leading-snug font-semibold">{step.title}</h3>
                    <p className="text-ink-500 mt-2 text-sm leading-relaxed">{step.text}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Content overview ───────────────────────────────────────────── */}
        <section id="innehall" className="bg-sand-100 scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-forest-600 text-xs font-semibold tracking-[0.12em] uppercase">
                  Innehåll
                </p>
                <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">
                  Tolv ämnesområden, {totalChapterCount} kapitel
                </h2>
                <p className="text-ink-500 mt-4">
                  Från jaktens grunder till artkännedom i fält. Varje område har egna kapitel,
                  frågor och statistik så att du ser precis var du står.
                </p>
              </div>
              <Link to="/app/teori" className={buttonStyles('secondary', 'md', 'shrink-0')}>
                Utforska teorin
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {theoryCategories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/app/teori/${category.id}`}
                    className="group rounded-card shadow-soft hover:shadow-lift relative flex h-44 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="from-forest-950/90 absolute inset-0 bg-gradient-to-t via-forest-950/30 to-transparent" />
                    <div className="relative mt-auto p-4">
                      <h3 className="text-sand-50 text-base font-semibold">{category.title}</h3>
                      <p className="text-sand-200/80 mt-1 line-clamp-2 text-xs">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} padding="lg" className="h-full">
                  <span className="bg-forest-800 text-moss-300 flex size-11 items-center justify-center rounded-xl">
                    <feature.icon className="size-5.5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-ink-500 mt-2 text-sm leading-relaxed">{feature.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open source & disclaimer ───────────────────────────────────── */}
        <section id="oppen-kallkod" className="scroll-mt-20 pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-card bg-forest-800 relative overflow-hidden p-6 sm:p-10 lg:p-14">
              <img
                src={images.textureForestDark}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-30"
                aria-hidden="true"
              />
              <div className="from-forest-900 via-forest-900/80 absolute inset-0 bg-gradient-to-r to-transparent" />

              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
                <div>
                  <Pill tone="sand" icon={<Code className="size-3.5" />}>
                    Öppen källkod · MIT
                  </Pill>
                  <h2 className="font-display mt-4 text-3xl leading-tight text-sand-50 sm:text-4xl">
                    Byggd för att granskas, förbättras och delas
                  </h2>
                  <p className="mt-4 max-w-xl text-sand-200/90">
                    Innehållet ska vara möjligt att kontrollera. Varje kapitel och fråga bär sina
                    källor, och hela projektet är tänkt att utvecklas öppet – bidra med frågor,
                    rättelser eller ny teori.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link to="/app" className={buttonStyles('moss', 'lg')}>
                      Börja plugga nu
                      <ArrowRight className="size-4.5" />
                    </Link>
                    <Link
                      to="/oppen-kallkod"
                      className={buttonStyles(
                        'secondary',
                        'lg',
                        'border-white/25 bg-white/10 text-sand-50 hover:border-white/40 hover:bg-white/15',
                      )}
                    >
                      <HeartHandshake className="size-4.5" />
                      Så hjälper du till
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-sm">
                  <p className="flex items-center gap-2 text-sm font-semibold text-sand-50">
                    <Info className="size-4.5 shrink-0" />
                    Om frågorna
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-sand-200/85">
                    Alla frågor i plattformen är egna exempelfrågor skrivna för utbildningssyfte. De
                    är inte hämtade från det officiella provet och ska inte uppfattas som officiella
                    provfrågor. Kontrollera alltid gällande regler hos Naturvårdsverket och din
                    länsstyrelse inför jakt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
