'use client';

import type { Event, EventType, } from '@/lib/types/event';
import { isEventType, EventTypes } from '@/lib/types/event';
import { filterEvents } from '@/lib/calendar/filter';
import { FilterBar } from '@/app/calendar/_components/filter-bar';
import { EventTimeline } from '@/app/calendar/_components/event-timeline';
import { MiniCalendar } from '@/app/calendar/_components/mini-calendar';
import { useSearchParams } from 'next/navigation';

interface CalendarShellProps {
  events: Event[]
}

export function CalendarShell({ events }: CalendarShellProps) {
  const searchParams = useSearchParams();

  const eventTypes = new Set<EventType>(
    searchParams.getAll("types").filter(isEventType)
  );

  const filteredEvents = filterEvents(events, eventTypes);

  return (
    <div className="flex flex-col gap-6">
      <FilterBar selectedTypes={eventTypes} paramName="types" types={EventTypes} />
      <div className="flex min-w-0 flex-col-reverse gap-6 md:grid md:grid-cols-[2fr_1fr]">
        <div className="min-w-0 overflow-visible">
          <EventTimeline events={filteredEvents} />
        </div>
        {/* On mobile: collapsible MiniCalendar; on md+: always visible */}
        <div className="md:contents">
          <details className="md:hidden" open={false}>
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground theme-trans py-2">
              Show calendar
            </summary>
            <MiniCalendar events={events} />
          </details>
          <div className="hidden md:block">
            <MiniCalendar events={events} />
          </div>
        </div>
      </div>
    </div>
  )
}
