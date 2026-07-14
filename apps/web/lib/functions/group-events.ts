import type { Event } from '@/lib/types/event'
import { formatTimelineDateHeading, parseStartTimeMinutes } from './format'

export interface EventDateGroup {
  date: string
  dateHeading: string
  events: Event[]
}

export function sortEventsByDateTime(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date)
    if (dateCompare !== 0) {
      return dateCompare
    }

    return parseStartTimeMinutes(a.time) - parseStartTimeMinutes(b.time)
  })
}

export function groupEventsByDate(events: Event[]): EventDateGroup[] {
  const sorted = sortEventsByDateTime(events)
  const groups: EventDateGroup[] = []

  for (const event of sorted) {
    const lastGroup = groups[groups.length - 1]

    if (lastGroup?.date === event.date) {
      lastGroup.events.push(event)
      continue
    }

    groups.push({
      date: event.date,
      dateHeading: formatTimelineDateHeading(event.date),
      events: [event],
    })
  }

  return groups
}

export function getTodayEventIds(events: Event[]): Set<string> {
  const today = new Date()
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  return new Set(events.filter(event => event.date === todayKey).map(event => event.id))
}
