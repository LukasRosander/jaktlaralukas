import { Clock, ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'

import { buttonStyles, type ButtonSize, type ButtonVariant } from '@/components/ui/button-styles'
import { repoLink } from '@/config/site'
import { cn } from '@/utils/cn'

/**
 * A button-styled link into the GitHub repository. Until `repoUrl` is set in
 * `src/config/site.ts` it renders as an inert, clearly labelled placeholder so
 * visitors are never sent to a dead link.
 */
export function RepoLink({
  path,
  children,
  icon,
  variant = 'primary',
  size = 'md',
  className,
}: {
  path?: string
  children: ReactNode
  icon?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  const href = repoLink(path)

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Länken till GitHub läggs in när repot är publikt"
        className={cn(buttonStyles(variant, size, className), 'cursor-not-allowed opacity-60')}
      >
        {icon}
        {children}
        <span className="inline-flex items-center gap-1 rounded-full bg-black/10 px-2 py-0.5 text-[0.6875rem] font-semibold">
          <Clock className="size-3" />
          Snart
        </span>
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={buttonStyles(variant, size, className)}
    >
      {icon}
      {children}
      <ExternalLink className="size-4 opacity-70" />
    </a>
  )
}
