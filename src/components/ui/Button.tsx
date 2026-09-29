import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { buttonStyles, type ButtonSize, type ButtonVariant } from '@/components/ui/button-styles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Renders before the label, typically a Lucide icon. */
  iconLeft?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, fullWidth ? `w-full ${className ?? ''}` : className)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
