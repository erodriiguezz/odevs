import type { Context, Next } from 'hono'
import { config } from '../config.js'

export async function requireSyncSecret(c: Context, next: Next) {
    const auth = c.req.header('authorization')
    const expected = `Bearer ${config.syncSecret}`

    if (auth !== expected) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    await next()
}