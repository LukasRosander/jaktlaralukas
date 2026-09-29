import { CircleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

import { EmptyState } from '@/components/ui/EmptyState'
import { buttonStyles } from '@/components/ui/button-styles'

/** Shared fallback for unknown routes and missing content ids. */
export function NotFoundPage({
  title = 'Sidan hittades inte',
  description = 'Länken kan vara felaktig eller innehållet borttaget.',
  actionLabel = 'Till startsidan',
  actionTo = '/app',
}: {
  title?: string
  description?: string
  actionLabel?: string
  actionTo?: string
}) {
  return (
    <EmptyState
      icon={<CircleAlert className="size-6" />}
      title={title}
      description={description}
      action={
        <Link to={actionTo} className={buttonStyles('primary', 'md')}>
          {actionLabel}
        </Link>
      }
    />
  )
}
