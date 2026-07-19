import type { Event, EventType } from '@/lib/types/event'

export type CalendarFilters = {
  eventType: EventType | 'All'
  groupName: string | 'All'
}

/**
 * Filters events by category and/or group.
 * "All" (or empty) means that dimension is unfiltered.
 */
export function filterEvents(
  events: Event[],
  { eventType, groupName }: CalendarFilters,
): Event[] {
  return events.filter((event) => {
    if (eventType !== 'All' && event.eventType !== eventType) {
      return false
    }
    if (groupName !== 'All' && event.group.name !== groupName) {
      return false
    }
    return true
  })
}
