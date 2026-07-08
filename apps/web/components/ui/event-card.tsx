import type { Event } from '@/lib/types/event'
import type { SourcePlatform } from '@/lib/types/platform'
import { ArrowUpRightIcon, ClockIcon, MapPinIcon } from '@/components/icons'

export type EventFormat = 'In-Person' | 'Virtual' | 'Hybrid'

export interface EventCardProps {
  event: Event
  eventFormat?: EventFormat
  disabled?: boolean
  compact?: boolean
}

const platformDisplayName: Record<SourcePlatform, string> = {
  meetup: 'Meetup',
  eventbrite: 'Eventbrite',
  luma: 'Luma',
  discord: 'Discord',
  manual: 'External',
  other: 'External',
}

function formatEventType(type: Event['eventType']): string {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function EventCard({ event, disabled = false, compact = false }: EventCardProps) {
  const registerLabel = platformDisplayName[event.sourcePlatform]
  const cardClasses = `card-elev rounded-2xl bg-card p-5${
    disabled ? ' pointer-events-none opacity-70 saturate-50' : ''
  }`

  if (compact && disabled) {
    return (
      <article aria-disabled className={cardClasses}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground theme-trans">
            Past · {formatEventType(event.eventType)}
          </span>
        </div>
        <h3 className="mt-3 font-display text-foreground font-semibold theme-trans">{event.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground theme-trans">{event.group.name}</p>
      </article>
    )
  }

  return (
    <article aria-disabled={disabled || undefined} className={cardClasses}>
      
        <h3 className="font-display text-lg font-semibold text-foreground theme-trans">{event.title}</h3>


      <div className="mt-2 flex items-center gap-2">
        <span className="text-muted-foreground theme-trans">{event.group.name}</span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground theme-trans">
          {formatEventType(event.eventType)}
        </span>
      </div>

      {event.description && (
        <p className="mt-4 text-sm text-muted-foreground theme-trans">{event.description}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground theme-trans">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon />
          {event.time}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <MapPinIcon />
          {event.location}
        </span>
      </div>

      {event.registrationUrl && !disabled && (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Register on ${registerLabel}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-glow hover:text-foreground theme-trans"
        >
          Register on {registerLabel}
          <ArrowUpRightIcon />
        </a>
      )}
    </article>
  )
}
