'use client'

import { useState, useEffect } from 'react'
import type { Event, EventType } from '@/lib/types/event'
import { filterEvents } from '@/lib/calendar/filter'
import { FilterBar } from '@/app/calendar/_components/filter-bar'
import { EventTimeline } from '@/app/calendar/_components/event-timeline'
import { MiniCalendar } from '@/app/calendar/_components/mini-calendar'
import { splitTimelineEvents, getTodayEventIds, groupEventsByDate } from '@/lib/calendar'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

interface CalendarShellProps {
  events: Event[]
}

export interface TimelineRow {
  event: Event
  showDateHeading: boolean
  dateHeading: string
}

function buildTimelineRows(groups: ReturnType<typeof groupEventsByDate>): { rows: TimelineRow[], firstDateIndex: Map<string, number> } {
  const firstDateIndex: Map<string, number> = new Map();
  let ind = 0;
  return { rows: groups.flatMap(group =>
    group.events.map((event, index) => {
      const isFirst = index === 0;
      if (isFirst) firstDateIndex.set(event.date, ind);
      ind++;
      return ({
        event,
        showDateHeading: isFirst,
        dateHeading: group.dateHeading,
      });
    }),
  ), firstDateIndex: firstDateIndex };
}

export function CalendarShell({ events }: CalendarShellProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<EventType>>(new Set());
  const [previousLen, setPreviousLen] = useState(2);

  const filteredEvents = filterEvents(events, selectedTypes);
  
  function handleToggle(type: EventType) {
    setSelectedTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  let { upcomingEvents, archivedEvents } = splitTimelineEvents(filteredEvents);
  const todayEventIds = getTodayEventIds(upcomingEvents);
  const prevTimelineRows = buildTimelineRows(groupEventsByDate(archivedEvents, true));
  prevTimelineRows.rows = prevTimelineRows.rows.slice(0, previousLen);
  const upcomingGroups = groupEventsByDate(upcomingEvents);
  const upcomingTimelineRows = buildTimelineRows(upcomingGroups);

  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const handleHashChange = () => {
      const date = window.location.hash.slice(1);
      let ind = prevTimelineRows.firstDateIndex.get(date);
      if (ind && ++ind > previousLen) {
        setPreviousLen(ind + ind % 2);
        router.replace(`${path}?${params.toString()}#${date}`);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  });

  return (
    <div className="flex flex-col gap-6">
      <FilterBar selectedTypes={selectedTypes} onToggle={handleToggle} />
      <div className="flex min-w-0 flex-col-reverse gap-6 md:grid md:grid-cols-[2fr_1fr]">
        <div className="min-w-0 overflow-visible">
          <EventTimeline upcomingEvents={upcomingEvents} prevTimelineRows={prevTimelineRows.rows} upcomingTimelineRows={upcomingTimelineRows.rows} todayEventIds={todayEventIds} previousLen={previousLen} setPreviousLen={setPreviousLen} fullPreviousLen={archivedEvents.length} />
        </div>
        {/* On mobile: collapsible MiniCalendar; on md+: always visible */}
        <div className="md:contents">
          <details className="md:hidden" open={false}>
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground theme-trans py-2">
              Show calendar
            </summary>
            <MiniCalendar events={events} previousLen={previousLen} setPreviousLen={setPreviousLen} firstDateIndex={prevTimelineRows.firstDateIndex} />
          </details>
          <div className="hidden md:block">
            <MiniCalendar events={events} className="sticky top-110" previousLen={previousLen} setPreviousLen={setPreviousLen} firstDateIndex={prevTimelineRows.firstDateIndex} />
          </div>
        </div>
      </div>
    </div>
  )
}
