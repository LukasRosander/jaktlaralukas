import { cn } from '@/utils/cn'

/** Wordmark with the pine-and-crosshair mark. */
export function Logo({
  tone = 'dark',
  withTagline = false,
  className,
}: {
  tone?: 'dark' | 'light'
  withTagline?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-xl',
          tone === 'dark' ? 'bg-forest-800' : 'bg-moss-300',
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path
            d="M12 3 17 12h-3l3.5 7H6.5L10 12H7l5-9Z"
            className={tone === 'dark' ? 'fill-moss-300' : 'fill-forest-800'}
          />
          <rect
            x="10.9"
            y="18.5"
            width="2.2"
            height="3.5"
            rx="1.1"
            className={tone === 'dark' ? 'fill-sand-200' : 'fill-forest-700'}
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-xl tracking-tight',
            tone === 'dark' ? 'text-forest-900' : 'text-sand-50',
          )}
        >
          Jaktlära
        </span>
        {withTagline ? (
          <span
            className={cn(
              'mt-0.5 text-[0.6875rem] font-medium tracking-wide',
              tone === 'dark' ? 'text-ink-400' : 'text-moss-200',
            )}
          >
            Din väg till jägarexamen
          </span>
        ) : null}
      </span>
    </span>
  )
}
