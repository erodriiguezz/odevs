import { eq, and } from 'drizzle-orm'
import { db } from '../db/index.js'
import { events, syncRuns } from '../db/schema.js'
import type { NewEventRow } from '../db/schema.js'
import { lumaSources, meetupSources } from '../sources/registry.js'
import { fetchLumaCalendar } from '../sources/luma/fetch-calendar.js'
import { normalizeLumaEvent } from '../sources/luma/normalize.js'
import { fetchMeetupEvents } from '../sources/meetup/fetch-events.js'
import { normalizeMeetupEvent } from '../sources/meetup/normalize.js'

type NormalizedEvent = Omit<NewEventRow, 'firstSeenAt' | 'lastSeenAt' | 'updatedAt'>

export interface SyncSourceResult {
    source: string
    eventsFound: number
    eventsNew: number
    eventsUpdated: number
    errors: string[]
}

export interface SyncSummary {
    startedAt: string
    finishedAt: string
    results: SyncSourceResult[]
}

function newSyncRunId(): string {
    return `sync-${Date.now()}`
}

async function upsertEvent(normalized: NormalizedEvent): Promise<'new' | 'updated'> {
    const now = new Date()

    const existing = await db.query.events.findFirst({
        where: and(
            eq(events.sourcePlatform, normalized.sourcePlatform),
            eq(events.sourceEventId, normalized.sourceEventId),
        ),
    })

    if (!existing) {
        await db.insert(events).values({
            ...normalized,
            status: 'pending',
            firstSeenAt: now,
            lastSeenAt: now,
            updatedAt: now,
        })
        return 'new'
    }

    await db
        .update(events)
        .set({
            ...normalized,
            lastSeenAt: now,
            updatedAt: now,
        })
        .where(eq(events.id, existing.id))

    return 'updated'
}

async function runSourceSync<Raw>(
    sourceKey: string,
    fetchRaw: () => Promise<Raw[]>,
    normalize: (raw: Raw) => NormalizedEvent,
): Promise<SyncSourceResult> {
    const runId = newSyncRunId()
    const startedAt = new Date()
    const errors: string[] = []

    let eventsFound = 0
    let eventsNew = 0
    let eventsUpdated = 0

    try {
        const rawEvents = await fetchRaw()
        eventsFound = rawEvents.length

        for (const raw of rawEvents) {
            try {
                const normalized = normalize(raw)
                const outcome = await upsertEvent(normalized)
                if (outcome === 'new') eventsNew++
                else eventsUpdated++
            } catch (err) {
                errors.push(err instanceof Error ? err.message : String(err))
            }
        }

        await db.insert(syncRuns).values({
            id: runId,
            source: sourceKey,
            status: errors.length ? 'failed' : 'success',
            startedAt,
            finishedAt: new Date(),
            eventsFound: String(eventsFound),
            eventsNew: String(eventsNew),
            eventsUpdated: String(eventsUpdated),
            errorMessage: errors.length ? errors.join('; ') : null,
        })
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        errors.push(message)

        await db.insert(syncRuns).values({
            id: runId,
            source: sourceKey,
            status: 'failed',
            startedAt,
            finishedAt: new Date(),
            eventsFound: '0',
            eventsNew: '0',
            eventsUpdated: '0',
            errorMessage: message,
        })
    }

    return { source: sourceKey, eventsFound, eventsNew, eventsUpdated, errors }
}

function syncOneLumaSource(source: (typeof lumaSources)[number]): Promise<SyncSourceResult> {
    return runSourceSync(
        `luma:${source.slug}`,
        async () => (await fetchLumaCalendar(source.slug)).events,
        (raw) => normalizeLumaEvent({ raw, calendarSlug: source.slug, groupId: source.groupId }),
    )
}

function syncOneMeetupSource(source: (typeof meetupSources)[number]): Promise<SyncSourceResult> {
    return runSourceSync(
        `meetup:${source.urlname}`,
        async () => (await fetchMeetupEvents(source.urlname)).events,
        (raw) => normalizeMeetupEvent({ raw, urlname: source.urlname, groupId: source.groupId }),
    )
}

export async function runLumaSync(): Promise<SyncSummary> {
    const startedAt = new Date()
    const results: SyncSourceResult[] = []

    for (const source of lumaSources) {
        results.push(await syncOneLumaSource(source))
    }

    return {
        startedAt: startedAt.toISOString(),
        finishedAt: new Date().toISOString(),
        results,
    }
}

export async function runMeetupSync(): Promise<SyncSummary> {
    const startedAt = new Date()
    const results: SyncSourceResult[] = []

    for (const source of meetupSources) {
        results.push(await syncOneMeetupSource(source))
    }

    return {
        startedAt: startedAt.toISOString(),
        finishedAt: new Date().toISOString(),
        results,
    }
}