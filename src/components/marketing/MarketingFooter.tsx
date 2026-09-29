import { Link } from 'react-router-dom'

import { Logo } from '@/components/layout/Logo'
import { currentYear } from '@/utils/date'

export function MarketingFooter() {
  return (
    <footer className="bg-forest-900 text-sand-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo tone="light" withTagline />
            <p className="text-sand-300/80 mt-4 max-w-sm text-sm leading-relaxed">
              En öppen studieplattform för alla som förbereder sig inför jägarexamen. Byggd för att
              vara tydlig, saklig och lätt att använda – på mobilen såväl som vid skrivbordet.
            </p>
          </div>

          <div>
            <h2 className="text-sand-50 mb-3 text-sm font-semibold">Plattformen</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/app" className="hover:text-moss-300 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/app/teori" className="hover:text-moss-300 transition-colors">
                  Teori
                </Link>
              </li>
              <li>
                <Link to="/app/fragor" className="hover:text-moss-300 transition-colors">
                  Övningsfrågor
                </Link>
              </li>
              <li>
                <Link to="/app/prov" className="hover:text-moss-300 transition-colors">
                  Provsimulator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sand-50 mb-3 text-sm font-semibold">Om projektet</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#oppen-kallkod" className="hover:text-moss-300 transition-colors">
                  Öppen källkod
                </a>
              </li>
              <li>
                <a
                  href="https://www.naturvardsverket.se/amnesomraden/jakt-och-vilt/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-moss-300 transition-colors"
                >
                  Naturvårdsverket
                </a>
              </li>
              <li>
                <a
                  href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/jaktlag-1987259_sfs-1987-259/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-moss-300 transition-colors"
                >
                  Jaktlagen
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-forest-700 mt-10 border-t pt-6 text-xs leading-relaxed text-sand-300/70">
          <p>
            Jägarexamen är ett fristående studieverktyg. Frågorna är egna exempelfrågor och är
            varken hämtade från eller godkända som officiella provfrågor. Kontrollera alltid
            gällande regler hos Naturvårdsverket och länsstyrelsen inför jakt.
          </p>
          <p className="mt-3">© {currentYear()} Jägarexamen · MIT-licens</p>
        </div>
      </div>
    </footer>
  )
}
