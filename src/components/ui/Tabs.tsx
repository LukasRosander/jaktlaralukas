import { cn } from '@/utils/cn'

export interface TabItem<T extends string> {
  id: T
  label: string
  count?: number
}

/** Segmented tab bar. Controlled so the page owns the selection. */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  className,
  'aria-label': ariaLabel,
}: {
  items: ReadonlyArray<TabItem<T>>
  value: T
  onChange: (next: T) => void
  className?: string
  'aria-label'?: string
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'border-sand-200 scrollbar-slim inline-flex max-w-full gap-1 overflow-x-auto rounded-full border bg-white p-1',
        className,
      )}
    >
      {items.map((item) => {
        const active = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
              active ? 'bg-forest-800 text-sand-50' : 'text-ink-600 hover:bg-sand-100',
            )}
          >
            {item.label}
            {typeof item.count === 'number' ? (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[0.6875rem] tabular-nums',
                  active ? 'bg-white/20 text-sand-50' : 'bg-sand-100 text-ink-500',
                )}
              >
                {item.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
