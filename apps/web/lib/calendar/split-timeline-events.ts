import type { Event } from '@/lib/types/event'
import { sortEventsByDateTime, sortEventsByEndDateTime } from './group-events'

function startOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function isUpcoming(event: Event, today: Date): boolean {
  return new Date(`${event.date}T00:00:00`) >= today
}

export function isPastDate(isoDate: string): boolean {
  return new Date(`${isoDate}T00:00:00`) < startOfToday()
}

export function splitTimelineEvents(events: Event[], recentPastCount = 3) {
  const today = startOfToday()
  const upcomingEvents = sortEventsByDateTime(events.filter(event => isUpcoming(event, today)))
  const archivedEvents = sortEventsByEndDateTime(events.filter(event => !isUpcoming(event, today)))
    .reverse()
    .slice(0, recentPastCount)

  return { upcomingEvents, archivedEvents }
}
