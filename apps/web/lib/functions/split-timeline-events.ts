import type { Event } from '@/lib/types/event'
import { sortEventsByDateTime } from './group-events'

function startOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function isUpcoming(event: Event, today: Date): boolean {
  return new Date(`${event.date}T00:00:00`) >= today
}

export function splitTimelineEvents(events: Event[], recentPastCount = 2) {
  const today = startOfToday()
  const upcomingEvents = sortEventsByDateTime(events.filter(event => isUpcoming(event, today)))
  const archivedEvents = sortEventsByDateTime(events.filter(event => !isUpcoming(event, today)))
    .reverse()
    .slice(0, recentPastCount)

  return { upcomingEvents, archivedEvents }
}
