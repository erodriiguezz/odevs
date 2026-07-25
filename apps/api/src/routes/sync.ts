import { Hono } from 'hono'
import { runLumaSync, runMeetupSync } from '../agents/sync-orchestrator.js'
import { requireSyncSecret } from './sync-auth.js'
export const syncRoute = new Hono()
syncRoute.post('/luma', requireSyncSecret, async (c) => {
    const summary = await runLumaSync()
    return c.json(summary)
})
syncRoute.post('/meetup', requireSyncSecret, async (c) => {
    const summary = await runMeetupSync()
    return c.json(summary)
})