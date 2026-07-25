import type { NewEventRow } from '../../db/schema.js'
import type { MeetupRawEvent } from './types.js'

interface NormalizeInput {
    raw: MeetupRawEvent
    urlname: string
    groupId: string
    timezone?: string
}

const DEFAULT_TIMEZONE = 'America/New_York'

function formatEventDate(iso: string, timezone: string): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(iso)) // → 2026-07-16
}

function formatEventTimeRange(startIso: string, endIso: string | undefined, timezone: string): string {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
    }

    const start = new Intl.DateTimeFormat('en-US', options).format(new Date(startIso))
    if (!endIso) return start // → 7:00 PM EDT

    const end = new Intl.DateTimeFormat('en-US', options).format(new Date(endIso))
    return `${start} - ${end}` // → 7:00 PM EDT - 8:00 PM EDT
}

function formatLocation(raw: MeetupRawEvent): string {
    if (raw.isOnline) return 'Online'

    const venue = raw.venue
    if (!venue) return 'TBD'

    const parts = [venue.name, venue.address, venue.city, venue.state].filter(Boolean)
    return parts.length > 0 ? parts.join(', ') : 'TBD'
}

export function buildEventId(urlname: string, sourceEventId: string): string {
    return `meetup:${urlname}:${sourceEventId}`
}

export function normalizeMeetupEvent(input: NormalizeInput): Omit<
    NewEventRow,
    'firstSeenAt' | 'lastSeenAt' | 'updatedAt'
> {
    const { raw, urlname, groupId, timezone = DEFAULT_TIMEZONE } = input

    return {
        id: buildEventId(urlname, raw.id),
        sourcePlatform: 'meetup',
        sourceEventId: raw.id,
        sourceUrl: raw.eventUrl,
        groupId,
        title: raw.title,
        description: raw.description ?? '',
        date: formatEventDate(raw.dateTime, timezone),
        time: formatEventTimeRange(raw.dateTime, raw.endTime, timezone),
        location: formatLocation(raw),
        thumbnailUrl: raw.thumbnailUrl ?? null,
        eventType: 'meetup',
        registrationUrl: raw.eventUrl,
        tags: [],
        featured: false,
        rawPayload: raw as unknown as Record<string, unknown>,
    }
}
