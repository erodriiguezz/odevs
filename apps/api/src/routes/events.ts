import { Hono } from 'hono'
import { and, asc, eq, gte } from 'drizzle-orm'
import { db } from '../db/index.js'
import { events } from '../db/schema.js'

export const eventsRoute = new Hono()

eventsRoute.get('/', async (c) => {
    const upcoming = c.req.query('upcoming') === 'true'
    const groupId = c.req.query('groupId')

    const conditions = [eq(events.status, 'approved')]

    if (upcoming) {
        const today = new Intl.DateTimeFormat('en-CA').format(new Date())
        conditions.push(gte(events.date, today))
    }

    if (groupId) {
        conditions.push(eq(events.groupId, groupId))
    }

    const rows = await db.query.events.findMany({
        where: and(...conditions),
        orderBy: [asc(events.date)],
    })

    // Shape for web consumption (group hydrated later on frontend)
    return c.json({
        events: rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            thumbnailUrl: row.thumbnailUrl ?? undefined,
            date: row.date,
            time: row.time,
            location: row.location,
            eventType: row.eventType,
            registrationUrl: row.registrationUrl,
            sourcePlatform: row.sourcePlatform,
            groupId: row.groupId,
            tags: row.tags,
            featured: row.featured,
            sponsors: [],
        })),
    })
})