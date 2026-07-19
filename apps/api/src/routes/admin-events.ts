import { Hono } from 'hono'
import { asc, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { events } from '../db/schema.js'
import { requireAdminSession } from './admin-auth.js'

export const adminEventsRoute = new Hono()

adminEventsRoute.use('*', requireAdminSession)

const EDITABLE_FIELDS = [
    'title',
    'description',
    'date',
    'time',
    'location',
    'thumbnailUrl',
    'eventType',
    'registrationUrl',
    'tags',
    'featured',
] as const

type EditableField = (typeof EDITABLE_FIELDS)[number]
type EventPatch = Partial<Pick<typeof events.$inferInsert, EditableField>>

adminEventsRoute.get('/', async (c) => {
    const status = c.req.query('status') ?? 'pending'

    const rows = await db.query.events.findMany({
        where: eq(events.status, status as 'pending' | 'approved' | 'rejected'),
        orderBy: [asc(events.date)],
    })

    return c.json({ events: rows })
})

adminEventsRoute.patch('/:id', async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json<Record<string, unknown>>().catch(() => ({}) as Record<string, unknown>)

    const patch: Record<string, unknown> = {}
    for (const field of EDITABLE_FIELDS) {
        if (field in body) {
            patch[field] = body[field]
        }
    }

    if (Object.keys(patch).length === 0) {
        return c.json({ error: 'No editable fields provided' }, 400)
    }

    const [updated] = await db
        .update(events)
        .set({ ...(patch as EventPatch), updatedAt: new Date() })
        .where(eq(events.id, id))
        .returning()

    if (!updated) {
        return c.json({ error: 'Event not found' }, 404)
    }

    return c.json({ event: updated })
})

async function setStatus(id: string, status: 'approved' | 'rejected') {
    const [updated] = await db
        .update(events)
        .set({ status, updatedAt: new Date() })
        .where(eq(events.id, id))
        .returning()
    return updated
}

adminEventsRoute.post('/:id/approve', async (c) => {
    const updated = await setStatus(c.req.param('id'), 'approved')
    if (!updated) return c.json({ error: 'Event not found' }, 404)
    return c.json({ event: updated })
})

adminEventsRoute.post('/:id/reject', async (c) => {
    const updated = await setStatus(c.req.param('id'), 'rejected')
    if (!updated) return c.json({ error: 'Event not found' }, 404)
    return c.json({ event: updated })
})
