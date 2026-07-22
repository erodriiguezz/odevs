import type { Event } from '@/lib/types/event'
import {
  TIMELINE_RAIL_CENTER_PX,
  TimelineEventItem,
} from '@/app/calendar/_components/timeline-event-item'
import Logo from '@/components/logo'
import { TimelineRow } from './calendar-shell'

interface EventTimelineProps {
  previousLen: number
  fullPreviousLen: number
  setPreviousLen: (len: number) => void
  upcomingEvents: Event[]
  prevTimelineRows: TimelineRow[]
  upcomingTimelineRows: TimelineRow[]
  todayEventIds: Set<string>
}

function Timeline({
  rows,
  todayEventIds,
  upcoming = true,
}: {
  rows: TimelineRow[]
  todayEventIds?: Set<string>
  upcoming?: boolean
}) {
  const lastIndex = rows.length - 1

  return (
    <div className="relative overflow-visible">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-border theme-trans"
        style={{ left: TIMELINE_RAIL_CENTER_PX }}
      />

      {rows.map((row, index) => {
        const timelineEventItem = <TimelineEventItem
            key={row.event.id}
            event={row.event}
            isHighlighted={todayEventIds && todayEventIds.has(row.event.id)}
            isLast={index === lastIndex}
            showDateHeading={row.showDateHeading}
            dateHeading={row.dateHeading}
            disabled={!upcoming}
          />;
        return row.showDateHeading ?
            <section key={row.event.id} id={row.event.date} className="scroll-mt-20">
              {timelineEventItem}
            </section>
          : 
            timelineEventItem;
        }
      )}
    </div>
  )
}

export function EventTimeline({ upcomingEvents, prevTimelineRows, upcomingTimelineRows, todayEventIds, previousLen, setPreviousLen, fullPreviousLen }: EventTimelineProps) {
  if (upcomingEvents.length === 0 && prevTimelineRows.length === 0) {
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

  return (
    <div className="relative max-w-full overflow-visible pb-8">
      <div className="flex flex-col overflow-visible">
        {upcomingTimelineRows.length > 0 ? (
          <Timeline rows={upcomingTimelineRows} todayEventIds={todayEventIds} />
        ) : (
          <div
            role="status"
            className="rounded-xl border border-dashed border-border px-6 py-12 flex flex-col items-center theme-trans"
          >
            <Logo sad={true} className="w-36 h-36 mb-5"/>
            <p className="mb-8 text-sm text-muted-foreground theme-trans">No upcoming events to show.</p>
          </div>
        )}

        {prevTimelineRows.length > 0 && 
          <section
            aria-label="Previous events"
            className="mt-12 border-t border-border pt-8 theme-trans"
          >
            <h2 className="mb-6 text-base font-semibold text-soft-foreground theme-trans">
              Previous events
            </h2>
            <Timeline rows={prevTimelineRows} upcoming={false} />
            {previousLen < fullPreviousLen &&
              <button onClick={() => {
                setPreviousLen(Math.min(previousLen + 2, fullPreviousLen));
              }}>
                See more
              </button>}
          </section>
        }
      </div>
    </div>
  )
}
