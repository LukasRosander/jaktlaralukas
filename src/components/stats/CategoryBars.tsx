import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui/ProgressBar'
import { categoryTitle } from '@/data/theory'
import type { CategoryScore } from '@/types'

/** Accuracy per subject, used on the statistics and exam result screens. */
export function CategoryBars({
  scores,
  linkToTheory = false,
}: {
  scores: CategoryScore[]
  linkToTheory?: boolean
}) {
  const withAnswers = scores.filter((score) => score.total > 0)

  if (withAnswers.length === 0) {
    return <p className="text-ink-400 text-sm">Inga besvarade frågor ännu.</p>
  }

  return (
    <ul className="space-y-4">
      {withAnswers.map((score) => {
        const percent = (score.correct / score.total) * 100
        const title = categoryTitle(score.categoryId)

        return (
          <li key={score.categoryId}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              {linkToTheory ? (
                <Link
                  to={`/app/teori/${score.categoryId}`}
                  className="hover:text-forest-600 text-sm font-medium transition-colors"
                >
                  {title}
                </Link>
              ) : (
                <span className="text-sm font-medium">{title}</span>
              )}
              <span className="text-ink-500 text-sm tabular-nums">
                <span className="text-ink-900 font-semibold">{Math.round(percent)} %</span>
                <span className="ml-2 text-xs">
                  {score.correct}/{score.total}
                </span>
              </span>
            </div>
            <ProgressBar value={percent} size="sm" tone={percent >= 80 ? 'moss' : 'forest'} />
          </li>
        )
      })}
    </ul>
  )
}
