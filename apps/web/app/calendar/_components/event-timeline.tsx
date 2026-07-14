import type { Event } from '@/lib/types/event'
import { getTodayEventIds, groupEventsByDate } from '@/lib/functions/group-events'
import { formatTimelineDateHeading } from '@/lib/functions/format'
import { splitTimelineEvents } from '@/lib/functions/split-timeline-events'
import { EventCard } from '@/components/ui/event-card'
import {
  TIMELINE_RAIL_CENTER_PX,
  TimelineEventItem,
} from '@/app/calendar/_components/timeline-event-item'
import Logo from '@/components/logo'
interface EventTimelineProps {
  events: Event[]
}

interface TimelineRow {
  event: Event
  showDateHeading: boolean
  dateHeading: string
}

function buildTimelineRows(groups: ReturnType<typeof groupEventsByDate>): TimelineRow[] {
  return groups.flatMap(group =>
    group.events.map((event, index) => ({
      event,
      showDateHeading: index === 0,
      dateHeading: group.dateHeading,
    })),
  )
}

function UpcomingTimeline({
  rows,
  todayEventIds,
}: {
  rows: TimelineRow[]
  todayEventIds: Set<string>
}) {
  const lastIndex = rows.length - 1

  return (
    <div className="relative overflow-visible">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-border theme-trans"
        style={{ left: TIMELINE_RAIL_CENTER_PX }}
      />

      {rows.map((row, index) => (
        <TimelineEventItem
          key={row.event.id}
          event={row.event}
          isHighlighted={todayEventIds.has(row.event.id)}
          isLast={index === lastIndex}
          showDateHeading={row.showDateHeading}
          dateHeading={row.dateHeading}
        />
      ))}
    </div>
  )
}

function MissedEventsSection({ events }: { events: Event[] }) {
  return (
    <section
      aria-label="Here is what you missed"
      className="mt-12 border-t border-border pt-8 theme-trans"
    >
      <h2 className="mb-6 text-base font-semibold text-soft-foreground theme-trans">
        Here is what you missed
      </h2>
      <div className="flex flex-col gap-6">
        {events.map(event => (
          <div key={event.id}>
            <h3 className="mb-2 text-base font-semibold text-light-foreground font-display theme-trans">
              {formatTimelineDateHeading(event.date)}
            </h3>
            <EventCard event={event} disabled />
          </div>
        ))}
      </div>
    </section>
  )
}

export function EventTimeline({ events }: EventTimelineProps) {
  const { upcomingEvents, archivedEvents } = splitTimelineEvents(events)

  if (upcomingEvents.length === 0 /*&& archivedEvents.length === 0*/) {
    return (
      <div
        role="status"
        className="rounded-xl border border-dashed border-border px-6 py-12 flex flex-col items-center theme-trans"
      >
        <Logo sad={true} className="w-36 h-36 mb-5"/>
        <p className="text-sm text-muted-foreground theme-trans">No events to show</p>
        <p className="mt-1 text-xs text-light-foreground theme-trans">Try adjusting your filters</p>
      </div>
    )
  }

  const upcomingGroups = groupEventsByDate(upcomingEvents)
  const todayEventIds = getTodayEventIds(upcomingEvents)
  const timelineRows = buildTimelineRows(upcomingGroups)

  return (
    <div className="relative max-w-full overflow-visible pb-8">
      <div className="flex flex-col overflow-visible">
        {timelineRows.length > 0 ? (
          <UpcomingTimeline rows={timelineRows} todayEventIds={todayEventIds} />
        ) : (
          <p className="mb-8 text-sm text-muted-foreground theme-trans">No upcoming events to show.</p>
        )}

        {/* {archivedEvents.length > 0 && <MissedEventsSection events={archivedEvents} />} */}
      </div>
    </div>
  )
}
