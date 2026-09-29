import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'moss' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ' +
  'disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] whitespace-nowrap'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-forest-800 text-sand-50 shadow-soft hover:bg-forest-700 hover:shadow-lift focus-visible:outline-forest-800',
  secondary:
    'bg-white text-forest-800 border border-sand-300 hover:border-forest-300 hover:bg-sand-50 shadow-soft',
  ghost: 'text-forest-800 hover:bg-forest-50',
  moss: 'bg-moss-300 text-forest-900 hover:bg-moss-400 shadow-soft',
  danger: 'bg-berry-500 text-white hover:bg-berry-600 shadow-soft',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
}

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className)
}
