import type { Event, EventType } from '@/lib/types/event'

/**
 * Filters events by selected event types.
 * When selectedTypes is empty, all events pass through unfiltered.
 */
export function filterEvents(events: Event[], selectedTypes: Set<EventType>): Event[] {
  if (selectedTypes.size === 0) {
    return events
  }
  return events.filter(e => selectedTypes.has(e.eventType))
}
