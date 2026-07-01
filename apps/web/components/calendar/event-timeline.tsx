import type { Event } from '@/lib/types/event'
import { EventCard } from '@/components/calendar/event-card'

interface EventTimelineProps {
  events: Event[]
}

export function EventTimeline({ events }: EventTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-zinc-400 text-sm">No events to show</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
