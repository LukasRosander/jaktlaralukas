import { ExternalLink } from 'lucide-react'

import type { ContentSource } from '@/types'

/**
 * Renders the references attached to a question or theory chapter. Keeping this
 * visible from day one is what lets the content be fact-checked later.
 */
export function SourceList({ sources, title = 'Källor' }: { sources?: ContentSource[]; title?: string }) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="border-sand-200 mt-6 border-t pt-4">
      <p className="text-ink-400 mb-2 text-xs font-semibold tracking-wide uppercase">{title}</p>
      <ul className="space-y-1.5">
        {sources.map((source) => (
          <li key={source.label} className="text-ink-500 text-sm">
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-forest-700 inline-flex items-center gap-1.5 underline decoration-sand-300 underline-offset-2 transition-colors"
              >
                {source.label}
                <ExternalLink className="size-3.5 shrink-0" />
              </a>
            ) : (
              source.label
            )}
            {source.retrievedAt ? (
              <span className="text-ink-400"> · hämtad {source.retrievedAt}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
