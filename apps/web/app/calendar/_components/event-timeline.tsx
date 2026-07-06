import type { Event } from '@/lib/types/event'
import { getTodayEventIds, groupEventsByDate } from '@/lib/calendar/group-events'
import { formatTimelineDateHeading } from '@/lib/calendar/format'
import { splitTimelineEvents } from '@/lib/calendar/split-timeline-events'
import { EventCard } from '@/components/ui/event-card'
import {
  TIMELINE_RAIL_CENTER_PX,
  TimelineEventItem,
} from '@/app/calendar/_components/timeline-event-item'
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
        className="absolute top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800"
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
      className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800"
    >
      <h2 className="mb-6 text-base font-semibold text-zinc-600 dark:text-zinc-300">
        Here is what you missed
      </h2>
      <div className="flex flex-col gap-6">
        {events.map(event => (
          <div key={event.id}>
            <h3 className="mb-2 text-base font-semibold text-zinc-400 dark:text-zinc-500">
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

  if (upcomingEvents.length === 0 && archivedEvents.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-dashed border-zinc-200 px-6 py-12 text-center dark:border-zinc-800"
      >
        <p className="text-sm text-zinc-500 dark:text-zinc-400">No events to show</p>
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">Try adjusting your filters</p>
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
          <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">No upcoming events to show.</p>
        )}

        {/* {archivedEvents.length > 0 && <MissedEventsSection events={archivedEvents} />} */}
      </div>
    </div>
  )
}
