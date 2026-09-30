import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

import { Logo } from '@/components/layout/Logo'
import { images } from '@/data/images'

/**
 * Shared frame for the sign-in and sign-up screens: a forest photo on wide
 * screens, a single centred card on narrow ones.
 */
export function AuthLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <div className="bg-sand-50 flex min-h-dvh flex-col lg:flex-row">
      <div className="relative hidden lg:flex lg:w-[42%] lg:shrink-0 lg:flex-col lg:justify-between lg:p-10">
        <img
          src={images.heroForest}
          alt=""
          className="absolute inset-0 size-full object-cover"
          aria-hidden="true"
        />
        <div className="from-forest-950/95 to-forest-800/70 absolute inset-0 bg-gradient-to-b" />

        <Link to="/" className="relative">
          <Logo tone="light" withTagline />
        </Link>

        <div className="relative max-w-sm">
          <p className="font-display text-sand-50 text-3xl leading-tight">
            Läs teorin, träna på frågor och följ dina framsteg.
          </p>
          <p className="text-sand-200/80 mt-3 text-sm leading-relaxed">
            Tolv ämnesområden, förklaringar till varje fråga och prov som efterliknar den riktiga
            provsituationen.
          </p>
        </div>
      </div>

      <main
        id="main"
        className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-10"
      >
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex lg:hidden">
            <Logo withTagline />
          </Link>

          <h1 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
          <p className="text-ink-500 mt-2">{description}</p>

          {children}

          <div className="text-ink-500 mt-8 text-sm">{footer}</div>
        </div>
      </main>
    </div>
  )
}
