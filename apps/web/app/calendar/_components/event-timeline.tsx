import type { Event } from '@/lib/types/event'
import { getTodayEventIds, groupEventsByDate } from '@/lib/calendar/group-events'
import {
  formatTimelineDateHeading,
} from '@/lib/calendar/format'
import { splitTimelineEvents } from '@/lib/calendar/split-timeline-events'
import { EventCard } from '@/app/calendar/_components/event-card'
import { TimelineEventItem } from '@/app/calendar/_components/timeline-event-item'

interface EventTimelineProps {
  events: Event[]
}

function renderTimelineGroups(
  groups: ReturnType<typeof groupEventsByDate>,
  options: {
    todayEventIds: Set<string>
    lastEventId: string | undefined
  },
) {
  return groups.map(group => (
    <section
      key={`upcoming-${group.date}`}
      aria-label={group.dateHeading}
      className="flex flex-col overflow-visible"
    >
      {group.events.map((event, index) => {
        const hasMultipleEvents = group.events.length > 1
        const showDateHeading = hasMultipleEvents && index === 0
        const timeLabel = hasMultipleEvents ? '' : formatTimelineDateHeading(event.date)

        return (
          <TimelineEventItem
            key={event.id}
            event={event}
            isHighlighted={options.todayEventIds.has(event.id)}
            isLast={event.id === options.lastEventId}
            showDateHeading={showDateHeading}
            dateHeading={group.dateHeading}
            timeLabel={timeLabel}
            isDateHeading={!hasMultipleEvents}
          />
        )
      })}
    </section>
  ))
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
            <time
              dateTime={`${event.date}T00:00:00`}
              className="mb-2 block text-sm font-medium text-zinc-400 dark:text-zinc-500"
            >
              {formatTimelineDateHeading(event.date)}
            </time>
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
  const lastEventId = upcomingGroups.at(-1)?.events.at(-1)?.id

  return (
    <div className="relative max-w-full overflow-visible pb-8">
      <div className="flex flex-col overflow-visible">
        {upcomingGroups.length > 0 ? (
          renderTimelineGroups(upcomingGroups, {
            todayEventIds,
            lastEventId,
          })
        ) : (
          <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">No upcoming events to show.</p>
        )}

        {archivedEvents.length > 0 && <MissedEventsSection events={archivedEvents} />}
      </div>
    </div>
  )
}
