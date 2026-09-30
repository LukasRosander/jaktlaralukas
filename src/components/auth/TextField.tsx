import { useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  /** Shown below the field; also announced as the field's error. */
  error?: string
  hint?: string
}

export function TextField({ label, error, hint, className, ...rest }: TextFieldProps) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div>
      <label htmlFor={id} className="text-ink-700 mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'text-ink-800 placeholder:text-ink-400 focus:border-forest-500 w-full rounded-xl border bg-white px-4 py-2.5 text-base transition-colors',
          error ? 'border-berry-500' : 'border-sand-300',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="text-berry-600 mt-1.5 text-sm">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-ink-400 mt-1.5 text-sm">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
