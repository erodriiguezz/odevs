'use client';

import type { Event, EventType, } from '@/lib/types/event';
import { isEventType, EventTypes } from '@/lib/types/event';
import { isGroupID, GroupID, GroupIDs, Groups } from '@/lib/data/groups';
import { FilterBar, filterIfAny } from '@/components/ui/filter-bar';
import { EventTimeline } from '@/app/calendar/_components/event-timeline';
import { MiniCalendar } from '@/app/calendar/_components/mini-calendar';
import { useSearchParams } from 'next/navigation';

interface CalendarShellProps {
  events: Event[]
}

export function CalendarShell({ events }: CalendarShellProps) {
  const searchParams = useSearchParams();

  const eventTypes = new Set<EventType>(searchParams.getAll("types").filter(isEventType));
  const groups = new Set<GroupID>(searchParams.getAll("groups").filter(isGroupID));
  
  const filteredEvents = filterIfAny(filterIfAny(events, event => event.eventType, eventTypes), event => event.group.id, groups);

  return (
    <div className="flex flex-col gap-6">
      <FilterBar selectedValues={eventTypes} paramName="types" values={EventTypes} display={(eventType: string) => eventType.charAt(0).toUpperCase() + eventType.substring(1)} />
      <FilterBar selectedValues={groups} paramName="groups" values={GroupIDs} display={(group: string) => Groups[group].name} />
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
