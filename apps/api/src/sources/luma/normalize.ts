import type { NewEventRow } from '../../db/schema.js'
import type { LumaRawEvent } from './types.js'

interface NormalizeInput {
    raw: LumaRawEvent
    calendarSlug: string
    groupId: string
}

function formatEventDate(iso: string, timezone: string): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(iso)) // → 2026-07-16
}

function formatEventTimeRange(
    startIso: string,
    endIso: string,
    timezone: string,
): string {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
    }

    const start = new Intl.DateTimeFormat('en-US', options).format(new Date(startIso))
    const end = new Intl.DateTimeFormat('en-US', options).format(new Date(endIso))

    return `${start} - ${end}` // → 7:00 PM EDT - 8:00 PM EDT
}

function formatLocation(raw: LumaRawEvent): string {
    const geo = raw.geo_address_info
    if (geo?.full_address) return geo.full_address
    if (geo?.address) return geo.address
    if (raw.location_type === 'online') return 'Online'
    return 'TBD'
}

export function buildEventId(calendarSlug: string, sourceEventId: string): string {
    return `luma:${calendarSlug}:${sourceEventId}`
}

export function normalizeLumaEvent(input: NormalizeInput): Omit<
    NewEventRow,
    'firstSeenAt' | 'lastSeenAt' | 'updatedAt'
> {
    const { raw, calendarSlug, groupId } = input
    const timezone = raw.timezone || 'America/New_York'

    return {
        id: buildEventId(calendarSlug, raw.api_id),
        sourcePlatform: 'luma',
        sourceEventId: raw.api_id,
        sourceUrl: `https://luma.com/${raw.url}`,
        groupId,
        title: raw.name,
        description: raw.description ?? '',
        date: formatEventDate(raw.start_at, timezone),
        time: formatEventTimeRange(raw.start_at, raw.end_at, timezone),
        location: formatLocation(raw),
        thumbnailUrl: raw.cover_url ?? null,
        eventType: 'meetup',
        registrationUrl: `https://luma.com/${raw.url}`,
        tags: [],
        featured: false,
        rawPayload: raw as unknown as Record<string, unknown>,
    }
}