'use client'

import { useState } from 'react'
import type { Event, EventType } from '@/lib/types/event'
import { filterEvents } from '@/lib/calendar/filter'
import { FilterBar } from '@/app/calendar/_components/filter-bar'
import { EventTimeline } from '@/app/calendar/_components/event-timeline'
import { MiniCalendar } from '@/app/calendar/_components/mini-calendar'

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
    <div className="flex flex-col gap-6">
      <FilterBar selectedTypes={selectedTypes} onToggle={handleToggle} />
      <div className="flex min-w-0 flex-col-reverse gap-6 md:grid md:grid-cols-[2fr_1fr]">
        <div className="min-w-0 overflow-visible">
          <EventTimeline events={filteredEvents} />
        </div>
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
