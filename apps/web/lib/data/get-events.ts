import type { Event, EventType } from '@/lib/types/event'
import type { SourcePlatform } from '@/lib/types/platform'
import { splitTimelineEvents } from '@/lib/calendar/split-timeline-events'
import groups from './groups'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

interface ApiEvent {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  date: string
  time: string
  location: string
  eventType: string
  registrationUrl: string
  sourcePlatform: string
  groupId: string
  tags: string[]
  featured: boolean
}

function hydrate(row: ApiEvent): Event | null {
  const group = groups[row.groupId]
  if (!group) {
    console.error(`Unknown groupId "${row.groupId}" on event "${row.id}" — skipping`)
    return null
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    thumbnailUrl: row.thumbnailUrl,
    sponsors: [],
    date: row.date,
    time: row.time,
    location: row.location,
    eventType: row.eventType as EventType,
    registrationUrl: row.registrationUrl,
    sourcePlatform: row.sourcePlatform as SourcePlatform,
    group,
    tags: row.tags,
    featured: row.featured,
  }
}

export async function getAllEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
  }

  const { events }: { events: ApiEvent[] } = await res.json()
  return events
    .map(hydrate)
    .filter((event): event is Event => event !== null)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
}

export async function getNextEvents(count: number): Promise<Event[]> {
  const events = await getAllEvents()
  return splitTimelineEvents(events).upcomingEvents.slice(0, count)
}
