import type { Event } from '@/lib/types/event'
import { events } from './events'

export function getAllEvents(): Event[] {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getUpcomingEvents(): Event[] {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return getAllEvents().filter(e => new Date(e.date) >= now)
}

export function getPastEvents(): Event[] {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return getAllEvents()
    .filter(e => new Date(e.date) < now)
    .reverse()
}

export function getFeaturedEvents(): Event[] {
  return getUpcomingEvents().filter(e => e.featured)
}

export function getNextEvents(count: number): Event[] {
  return getUpcomingEvents().slice(0, count)
}

export function getEventsByMonth(year: number, month: number): Event[] {
  return getAllEvents().filter(e => {
    const d = new Date(e.date)
    return d.getFullYear() === year && d.getMonth() + 1 === month
  })
}
