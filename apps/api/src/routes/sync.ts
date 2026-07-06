import { Hono } from 'hono'
import { runLumaSync } from '../agents/sync-orchestrator.js'
import { requireSyncSecret } from './sync-auth.js'
export const syncRoute = new Hono()
syncRoute.post('/luma', requireSyncSecret, async (c) => {
    const summary = await runLumaSync()
    return c.json(summary)
})