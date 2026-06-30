'use client'

import { useState } from 'react'
import type { Event, EventType } from '@/lib/types/event'
import { filterEvents } from '@/lib/calendar/filter'
import { FilterBar } from '@/components/calendar/filter-bar'
import { EventTimeline } from '@/components/calendar/event-timeline'
import { MiniCalendar } from '@/components/calendar/mini-calendar'

interface CalendarShellProps {
  events: Event[]
}

export function CalendarShell({ events }: CalendarShellProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<EventType>>(new Set())

  const filteredEvents = filterEvents(events, selectedTypes)

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

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden">
      <FilterBar selectedTypes={selectedTypes} onToggle={handleToggle} />
      <div className="flex flex-col-reverse md:grid md:grid-cols-[2fr_1fr] gap-6">
        <EventTimeline events={filteredEvents} />
        {/* On mobile: collapsible MiniCalendar; on md+: always visible */}
        <div className="md:contents">
          <details className="md:hidden" open={false}>
            <summary className="cursor-pointer text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors py-2">
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
