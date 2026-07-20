import { createHmac, timingSafeEqual } from 'node:crypto'
import { Hono } from 'hono'
import type { Context, Next } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { config } from '../config.js'

const COOKIE_NAME = 'admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function sign(expiresAt: number): string {
    const payload = String(expiresAt)
    const signature = createHmac('sha256', config.adminSessionSecret).update(payload).digest('hex')
    return `${payload}.${signature}`
}

function verify(token: string): boolean {
    const [payload, signature] = token.split('.')
    if (!payload || !signature) return false

    const expected = createHmac('sha256', config.adminSessionSecret).update(payload).digest('hex')
    const expectedBuf = Buffer.from(expected)
    const actualBuf = Buffer.from(signature)
    if (expectedBuf.length !== actualBuf.length || !timingSafeEqual(expectedBuf, actualBuf)) {
        return false
    }

    return Number(payload) > Date.now()
}

function safeEqual(a: string, b: string): boolean {
    const aBuf = Buffer.from(a)
    const bBuf = Buffer.from(b)
    if (aBuf.length !== bBuf.length) return false
    return timingSafeEqual(aBuf, bBuf)
}

export async function requireAdminSession(c: Context, next: Next) {
    const token = getCookie(c, COOKIE_NAME)
    if (!token || !verify(token)) {
        return c.json({ error: 'Unauthorized' }, 401)
    }
    await next()
}

export const adminAuthRoute = new Hono()

adminAuthRoute.post('/login', async (c) => {
    const body = await c.req.json<{ password?: string }>().catch(() => ({ password: undefined }))
    const password = body.password ?? ''

    if (!safeEqual(password, config.adminPassword)) {
        return c.json({ error: 'Invalid password' }, 401)
    }

    const expiresAt = Date.now() + SESSION_TTL_MS
    setCookie(c, COOKIE_NAME, sign(expiresAt), {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: SESSION_TTL_MS / 1000,
    })

    return c.json({ ok: true })
})

adminAuthRoute.post('/logout', (c) => {
    deleteCookie(c, COOKIE_NAME, { path: '/' })
    return c.json({ ok: true })
})

adminAuthRoute.get('/session', requireAdminSession, (c) => {
    return c.json({ ok: true })
})
