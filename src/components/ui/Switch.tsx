import { useId } from 'react'

import { cn } from '@/utils/cn'

/** Accessible toggle used across the settings and exam setup screens. */
export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  description?: string
  disabled?: boolean
}) {
  const id = useId()

  return (
    <div className={cn('flex items-start justify-between gap-4', disabled && 'opacity-50')}>
      <div className="min-w-0">
        <label htmlFor={id} className="text-ink-900 block text-sm font-medium">
          {label}
        </label>
        {description ? <p className="text-ink-500 mt-0.5 text-sm">{description}</p> : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
          checked ? 'bg-forest-600' : 'bg-sand-300',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </div>
  )
}
