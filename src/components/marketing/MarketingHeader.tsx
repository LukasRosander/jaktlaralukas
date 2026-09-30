import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Logo } from '@/components/layout/Logo'
import { buttonStyles } from '@/components/ui/button-styles'
import { useAuth } from '@/hooks/useAuth'

const links = [
  { href: '#sa-fungerar-det', label: 'Så fungerar det' },
  { href: '#innehall', label: 'Innehåll' },
  { href: '#oppen-kallkod', label: 'Öppen källkod' },
]

export function MarketingHeader() {
  const { account } = useAuth()

  return (
    <header className="border-sand-200 bg-sand-50/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Jaktlära – startsida">
          <Logo />
        </Link>

        <nav aria-label="Sidnavigering" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink-600 hover:text-forest-800 rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {account ? null : (
            <Link
              to="/logga-in"
              // Dropped on the narrowest phones, where the header cannot fit
              // both actions. The primary button leads to the login anyway.
              className="text-ink-600 hover:text-forest-800 hidden rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white min-[380px]:inline-flex"
            >
              Logga in
            </Link>
          )}
          <Link
            to="/app"
            className={buttonStyles('primary', 'sm')}
            aria-label="Öppna studieplattformen"
          >
            {account ? 'Fortsätt plugga' : 'Börja plugga'}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
