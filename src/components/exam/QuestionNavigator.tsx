import { cn } from '@/utils/cn'

/** Grid of every question slot so learners can jump back to unanswered ones. */
export function QuestionNavigator({
  total,
  currentIndex,
  answeredIndexes,
  onJump,
}: {
  total: number
  currentIndex: number
  answeredIndexes: ReadonlySet<number>
  onJump: (index: number) => void
}) {
  return (
    <div>
      <div className="text-ink-500 mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="bg-forest-700 size-2.5 rounded-full" /> Besvarad
        </span>
        <span className="flex items-center gap-1.5">
          <span className="border-sand-300 size-2.5 rounded-full border bg-white" /> Obesvarad
        </span>
      </div>
      <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10 lg:grid-cols-12">
        {Array.from({ length: total }, (_, index) => {
          const answered = answeredIndexes.has(index)
          const active = index === currentIndex
          return (
            <button
              key={index}
              type="button"
              onClick={() => onJump(index)}
              aria-label={`Gå till fråga ${index + 1}${answered ? ', besvarad' : ', obesvarad'}`}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'flex h-9 items-center justify-center rounded-lg border text-xs font-semibold tabular-nums transition-all duration-150',
                answered
                  ? 'border-forest-700 bg-forest-700 text-sand-50'
                  : 'border-sand-300 text-ink-500 bg-white hover:border-forest-300',
                active && 'ring-forest-600 ring-offset-sand-50 ring-2 ring-offset-2',
              )}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
