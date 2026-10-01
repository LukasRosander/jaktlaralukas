import {
  ArrowRight,
  BookOpenCheck,
  Bug,
  ChevronDown,
  Code,
  Eye,
  FileText,
  GitPullRequest,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  MessageSquarePlus,
  Scale,
  ShieldAlert,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { RepoLink } from '@/components/marketing/RepoLink'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { buttonStyles } from '@/components/ui/button-styles'
import { repoUrl } from '@/config/site'
import { images } from '@/data/images'
import { useScrollToHash } from '@/hooks/useScrollToHash'

const principles = [
  {
    icon: Eye,
    title: 'Insyn',
    text: 'All kod och allt innehåll är offentligt. Vem som helst kan läsa hur plattformen fungerar och granska varje fråga och varje kapitel.',
  },
  {
    icon: Scale,
    title: 'Frihet',
    text: 'Licensen ger dig rätt att använda, ändra och dela vidare projektet – även i egna sammanhang, så länge licenstexten följer med.',
  },
  {
    icon: Users,
    title: 'Gemenskap',
    text: 'Förbättringar kommer från dem som använder verktyget. En jägare som hittar ett fel kan rätta det, så att nästa person slipper lära sig fel.',
  },
]

const reasons = [
  'Den som pluggar inför jägarexamen ska kunna lita på innehållet. När allt är öppet går det att kontrollera mot källorna i stället för att tas på tro.',
  'Regler och rekommendationer ändras. Ett öppet projekt kan hållas aktuellt av många, i stället för att hänga på att en enda person hinner.',
  'Studiematerial inför ett prov borde vara tillgängligt för alla, oavsett plånbok.',
]

const ways = [
  {
    icon: Bug,
    title: 'Rapportera fel',
    text: 'Ett felaktigt svar, en otydlig förklaring, ett stavfel eller något som inte fungerar på din telefon.',
  },
  {
    icon: MessageSquarePlus,
    title: 'Föreslå frågor',
    text: 'Skriv egna övningsfrågor med förklaring och källa. Det är det enskilt mest värdefulla bidraget.',
  },
  {
    icon: BookOpenCheck,
    title: 'Förbättra teorin',
    text: 'Komplettera ett kapitel, lägg till en källa eller uppdatera något som har ändrats i regelverket.',
  },
  {
    icon: Code,
    title: 'Bidra med kod och design',
    text: 'Nya funktioner, bättre tillgänglighet, snabbare sidor eller en tydligare layout.',
  },
  {
    icon: Lightbulb,
    title: 'Dela idéer',
    text: 'Saknar du något när du pluggar? Berätta – många av de bästa förbättringarna börjar som ett önskemål.',
  },
  {
    icon: Megaphone,
    title: 'Sprid ordet',
    text: 'Tipsa en jaktkamrat, en kursledare eller ditt jaktlag. Fler användare ger fler som hittar och rättar fel.',
  },
]

const issueSteps = [
  {
    title: 'Skapa ett gratis konto på GitHub',
    text: 'GitHub är tjänsten där projektet ligger. Ett konto tar ett par minuter att skapa.',
  },
  {
    title: 'Gå till projektets sida',
    text: 'Under fliken Issues samlas alla felrapporter och förslag. Sök gärna först, ifall någon redan tagit upp samma sak.',
  },
  {
    title: 'Klicka på "New issue" och beskriv vad du hittat',
    text: 'Skriv vilken fråga eller vilket kapitel det gäller, vad som är fel och gärna en källa som visar vad som gäller.',
  },
  {
    title: 'Följ diskussionen',
    text: 'Du får besked när någon svarar. Ibland behövs en följdfråga innan rättelsen kan göras.',
  },
]

const pullRequestSteps = [
  {
    title: 'Läs bidragsguiden',
    text: 'CONTRIBUTING.md beskriver kodstil, hur frågor och kapitel är uppbyggda och vad som granskas.',
  },
  {
    title: 'Gör en egen kopia (fork) av projektet',
    text: 'Med knappen "Fork" på GitHub får du en kopia under ditt eget konto där du fritt kan göra ändringar.',
  },
  {
    title: 'Gör din ändring i en egen gren',
    text: 'Kör projektet lokalt enligt README:n och kontrollera att allt fungerar med npm run lint och npm run build.',
  },
  {
    title: 'Öppna en pull request',
    text: 'Beskriv vad du ändrat och varför, och bifoga källor för faktainnehåll. Någon granskar och återkopplar.',
  },
]

const faq = [
  {
    question: 'Måste jag kunna programmera för att hjälpa till?',
    answer:
      'Nej. De flesta förbättringarna handlar om innehållet: rättelser, frågor och källor. Det räcker att du kan skriva en issue och beskriva vad som behöver ändras – resten kan någon annan ta hand om.',
  },
  {
    question: 'Kostar det något?',
    answer:
      'Nej, varken att använda Jaktlära eller att bidra. Ett konto på GitHub är också gratis.',
  },
  {
    question: 'Vad betyder MIT-licensen?',
    answer:
      'Det är en av de mest tillåtande licenserna för öppen källkod. Du får använda, kopiera, ändra och sprida projektet, även kommersiellt, så länge den ursprungliga licenstexten följer med. Projektet lämnas utan garantier.',
  },
  {
    question: 'Vem bestämmer vad som kommer med?',
    answer:
      'Förslag granskas innan de läggs in, framför allt för att säkerställa att fakta stämmer mot källorna. Ett nej handlar nästan alltid om att något behöver justeras, inte om att bidraget är ovälkommet.',
  },
]

// The step cards are narrow on small phones, where a label plus its "Snart"
// tag does not fit on one line.
const wrappingButton = 'h-auto min-h-11 flex-wrap py-2 text-center whitespace-normal'

function StepList({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="mt-5 space-y-5">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span className="bg-moss-100 text-forest-700 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums">
            {index + 1}
          </span>
          <div className="min-w-0 pt-1">
            <p className="leading-snug font-semibold">{step.title}</p>
            <p className="text-ink-500 mt-1 text-sm leading-relaxed">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-forest-600 text-xs font-semibold tracking-[0.12em] uppercase">{eyebrow}</p>
      <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">{title}</h2>
      {children ? <div className="text-ink-500 mt-4 leading-relaxed">{children}</div> : null}
    </div>
  )
}

export function OpenSourcePage() {
  useScrollToHash()

  return (
    <div className="bg-sand-50 min-h-dvh">
      <MarketingHeader />

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <img
            src={images.textureForestDark}
            alt=""
            className="absolute inset-0 size-full object-cover"
            aria-hidden="true"
          />
          <div className="from-forest-950/95 via-forest-900/90 to-forest-800/75 absolute inset-0 bg-gradient-to-br" />

          <div className="relative mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="animate-rise flex flex-col items-center">
              <Pill tone="sand" icon={<Code className="size-3.5" />}>
                Öppen källkod · MIT-licens
              </Pill>
              <h1 className="font-display mt-5 text-4xl leading-[1.08] text-sand-50 sm:text-5xl">
                Jaktlära byggs öppet – tillsammans
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-200/90 sm:text-lg">
                All kod och allt innehåll är fritt att läsa, granska och förbättra. Vi är tacksamma
                för varje bidrag, stort som litet.
              </p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
                <a href="#bidra" className={buttonStyles('moss', 'lg')}>
                  Så hjälper du till
                  <ArrowRight className="size-4.5" />
                </a>
                <RepoLink
                  variant="secondary"
                  size="lg"
                  className="border-white/25 bg-white/10 text-sand-50 hover:border-white/40 hover:bg-white/15"
                >
                  Projektet på GitHub
                </RepoLink>
              </div>
            </div>
          </div>
        </section>

        {/* ── What open source is ────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionIntro eyebrow="Vad är öppen källkod?" title="Ett recept som alla får läsa">
              <p>
                Källkod är instruktionerna som ett program är byggt av. I vanliga appar är de
                hemliga – du ser bara resultatet. Öppen källkod betyder att instruktionerna är
                offentliga och att en licens uttryckligen ger alla rätt att använda, ändra och dela
                dem.
              </p>
              <p className="mt-3">
                Tänk dig en kokbok där receptet står tryckt, där du får laga rätten hemma, justera
                kryddningen och skicka tillbaka din förbättring till författaren. Många av de
                program du använder varje dag – webbläsare, operativsystem, Wikipedia – är byggda på
                det sättet.
              </p>
            </SectionIntro>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map((item) => (
                <li key={item.title}>
                  <Card padding="lg" className="h-full">
                    <span className="bg-forest-800 text-moss-300 flex size-11 items-center justify-center rounded-xl">
                      <item.icon className="size-5.5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="text-ink-500 mt-2 text-sm leading-relaxed">{item.text}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why Jaktlära is open ───────────────────────────────────────── */}
        <section className="bg-sand-100 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
            <SectionIntro eyebrow="Varför öppet?" title="Innehåll man ska kunna lita på">
              <p>
                Jaktlära hjälper människor inför ett prov som i förlängningen leder till jakt med
                skarpt vapen. Då räcker det inte att innehållet ser rätt ut – det måste gå att
                kontrollera.
              </p>
            </SectionIntro>

            <ul className="space-y-3">
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="rounded-card border-sand-200 flex gap-3 border bg-white p-5 text-sm leading-relaxed"
                >
                  <ShieldAlert className="text-forest-600 mt-0.5 size-5 shrink-0" />
                  <span className="text-ink-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Thanks ─────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <span className="bg-moss-100 text-forest-700 mx-auto flex size-14 items-center justify-center rounded-2xl">
              <HeartHandshake className="size-7" />
            </span>
            <h2 className="font-display mt-5 text-3xl leading-tight sm:text-4xl">
              Tack för att du vill hjälpa till
            </h2>
            <p className="text-ink-500 mt-4 leading-relaxed">
              Jaktlära blir bättre för varje person som lägger lite tid på det. En rättad siffra i
              en tabell eller en ny fråga om viltvård kan vara skillnaden för någon som pluggar
              inför provet. Du behöver inte vara programmerare och du behöver inte ha mycket tid –
              allt räknas, och vi är genuint tacksamma för varje bidrag.
            </p>
          </div>
        </section>

        {/* ── Ways to help ───────────────────────────────────────────────── */}
        <section id="bidra" className="bg-sand-100 scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionIntro eyebrow="Bidra" title="Så kan du hjälpa till">
              <p>Välj det som passar dig. Inget bidrag är för litet.</p>
            </SectionIntro>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ways.map((way) => (
                <li key={way.title}>
                  <Card className="h-full">
                    <span className="bg-moss-100 text-forest-700 flex size-10 items-center justify-center rounded-xl">
                      <way.icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{way.title}</h3>
                    <p className="text-ink-500 mt-1.5 text-sm leading-relaxed">{way.text}</p>
                  </Card>
                </li>
              ))}
            </ul>

            <div className="border-amber-ochre/30 bg-amber-ochre-light rounded-card mt-8 flex gap-3 border p-5 text-sm leading-relaxed">
              <ShieldAlert className="text-amber-ochre mt-0.5 size-5 shrink-0" />
              <p className="text-ink-700">
                <span className="font-semibold">En regel gäller alltid:</span> skicka aldrig in
                frågor från det officiella provet för jägarexamen. Alla frågor i Jaktlära ska vara
                egenskrivna i utbildningssyfte och bygga på verifierbara källor, till exempel
                Naturvårdsverket och gällande lagstiftning.
              </p>
            </div>
          </div>
        </section>

        {/* ── Step by step ───────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionIntro eyebrow="Steg för steg" title="Så går du till väga på GitHub">
              <p>
                Projektet ligger på GitHub, en tjänst där öppna projekt samlar kod, diskussioner och
                förslag. Det finns två vägar in beroende på hur du vill bidra.
              </p>
            </SectionIntro>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <Card padding="md" className="h-full min-w-0 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-forest-800 text-moss-300 flex size-10 items-center justify-center rounded-xl">
                    <MessageSquarePlus className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">Rapportera eller föreslå</h3>
                    <p className="text-ink-500 text-sm">Ingen kod behövs</p>
                  </div>
                </div>
                <StepList steps={issueSteps} />
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <a
                    href="https://github.com/signup"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyles('secondary', 'md', wrappingButton)}
                  >
                    Skapa GitHub-konto
                  </a>
                  <RepoLink
                    path="issues/new"
                    icon={<Bug className="size-4" />}
                    className={wrappingButton}
                  >
                    Rapportera ett fel
                  </RepoLink>
                </div>
              </Card>

              <Card padding="md" className="h-full min-w-0 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-forest-800 text-moss-300 flex size-10 items-center justify-center rounded-xl">
                    <GitPullRequest className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">Gör ändringen själv</h3>
                    <p className="text-ink-500 text-sm">För dig som vill skriva kod eller text</p>
                  </div>
                </div>
                <StepList steps={pullRequestSteps} />
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <RepoLink
                    path="blob/main/CONTRIBUTING.md"
                    variant="secondary"
                    icon={<FileText className="size-4" />}
                    className={wrappingButton}
                  >
                    Läs bidragsguiden
                  </RepoLink>
                  <RepoLink icon={<GitPullRequest className="size-4" />} className={wrappingButton}>
                    Öppna projektet
                  </RepoLink>
                </div>
              </Card>
            </div>

            {repoUrl ? null : (
              <p className="text-ink-500 mt-6 text-center text-sm">
                Länken till projektet på GitHub läggs in så snart det är publicerat. Knapparna
                märkta "Snart" fungerar från och med då.
              </p>
            )}
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="bg-sand-100 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionIntro eyebrow="Vanliga frågor" title="Bra att veta" />
            <div className="mt-8 space-y-3">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-card border-sand-200 shadow-soft border bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown className="text-ink-400 size-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="text-ink-500 -mt-1 px-5 pb-5 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-card bg-forest-800 flex flex-col items-start gap-6 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl leading-tight text-sand-50">
                  Redo att göra Jaktlära lite bättre?
                </h2>
                <p className="mt-3 text-sand-200/90">
                  Börja med att plugga som vanligt. Hittar du något som kan bli bättre vet du nu var
                  du ska höra av dig.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link to="/app" className={buttonStyles('moss', 'lg')}>
                  Börja plugga
                  <ArrowRight className="size-4.5" />
                </Link>
                <RepoLink
                  variant="secondary"
                  size="lg"
                  className="border-white/25 bg-white/10 text-sand-50 hover:border-white/40 hover:bg-white/15"
                >
                  GitHub
                </RepoLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
