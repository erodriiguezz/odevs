'use client'

import { useState } from 'react'
import type { Event, EventType } from '@/lib/types/event'
import { filterEvents } from '@/lib/calendar/filter'
import { FilterBar } from '@/app/calendar/_components/filter-bar'
import { EventTimeline } from '@/app/calendar/_components/event-timeline'
import { MiniCalendar } from '@/app/calendar/_components/mini-calendar'
import { splitTimelineEvents, groupEventsByDate } from '@/lib/calendar'

interface CalendarShellProps {
  events: Event[]
}

export interface TimelineRow {
  event: Event
  showDateHeading: boolean
  dateHeading: string
}

export function buildTimelineRows<T extends boolean>(
  groups: ReturnType<typeof groupEventsByDate>,
  makeDateIndex: T
): T extends true ? { rows: TimelineRow[]; firstDateIndex: Map<string, number> } : TimelineRow[] {
  let firstDateIndex: Map<string, number>;
  if (makeDateIndex) firstDateIndex = new Map();
  let ind = 0;

  const rows = groups.flatMap(group =>
    group.events.map((event, index) => {
      const isFirst = index === 0;
      if (isFirst && makeDateIndex) firstDateIndex.set(event.date, ++ind);
      return {
        event,
        showDateHeading: isFirst,
        dateHeading: group.dateHeading,
      };
    }),
  );

  return (makeDateIndex ? { rows, firstDateIndex: firstDateIndex! } : rows) as any;
}

export function CalendarShell({ events }: CalendarShellProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<EventType>>(new Set());
  
  const filteredEvents = filterEvents(events, selectedTypes);
  
  function handleToggle(type: EventType) {
    setSelectedTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  const { upcomingEvents, archivedEvents } = splitTimelineEvents(filteredEvents);
  const prevTimelineRows = buildTimelineRows(groupEventsByDate(archivedEvents, true), true);

  return (
    <div className="flex flex-col gap-6">
      <FilterBar selectedTypes={selectedTypes} onToggle={handleToggle} />
      <div className="flex min-w-0 flex-col-reverse gap-6 md:grid md:grid-cols-[2fr_1fr]">
        <div className="min-w-0 overflow-visible">
          <EventTimeline upcomingEvents={upcomingEvents} prevTimelineRows={prevTimelineRows.rows} />
        </div>
        {/* On mobile: collapsible MiniCalendar; on md+: always visible */}
        <div className="md:contents">
          <details className="md:hidden" open={false}>
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground theme-trans py-2">
              Show calendar
            </summary>
            <MiniCalendar events={events} firstDateIndex={prevTimelineRows.firstDateIndex} />
          </details>
          <div className="hidden md:block">
            <MiniCalendar events={events} className="sticky top-110" firstDateIndex={prevTimelineRows.firstDateIndex} />
          </div>
        </div>
      </div>
    </div>
  )
}
