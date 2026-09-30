import { cn } from '@/utils/cn'

const sizes = {
  sm: 'size-9 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-20 text-xl sm:size-24 sm:text-2xl',
}

/** Up to two initials, so "Lukas Rosander" becomes "LR" and "lukas" becomes "L". */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Profile picture with an initials fallback, used because accounts created in
 * the app have no image to show.
 */
export function Avatar({
  name,
  src,
  size = 'md',
  className,
}: {
  name: string
  src?: string
  size?: keyof typeof sizes
  className?: string
}) {
  const shared = cn('ring-moss-200 shrink-0 rounded-full ring-2', sizes[size], className)

  if (src) {
    return <img src={src} alt="" className={cn(shared, 'object-cover')} />
  }

  return (
    <span
      className={cn(shared, 'bg-forest-800 text-sand-50 flex items-center justify-center font-semibold')}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
