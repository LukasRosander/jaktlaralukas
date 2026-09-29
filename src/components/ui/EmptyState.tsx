import type { ReactNode } from 'react'

import { Card } from '@/components/ui/Card'

/** Shared empty placeholder so every list has a designed zero state. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <Card padding="lg" className="animate-fade-in text-center">
      <div className="bg-moss-100 text-forest-600 mx-auto flex size-14 items-center justify-center rounded-full">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-ink-500 mx-auto mt-1 max-w-md text-sm">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </Card>
  )
}
