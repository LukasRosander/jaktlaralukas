import type { ReactNode } from 'react'

/** Consistent page title block for every app screen. */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <header className="animate-rise mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-forest-600 mb-1.5 text-xs font-semibold tracking-[0.12em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
        {description ? (
          <p className="text-ink-500 mt-2 max-w-2xl text-sm sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}
