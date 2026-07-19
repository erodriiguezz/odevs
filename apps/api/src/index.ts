import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { config } from './config.js'
import { eventsRoute } from './routes/events.js'
import { syncRoute } from './routes/sync.js'
import { adminAuthRoute } from './routes/admin-auth.js'
import { adminEventsRoute } from './routes/admin-events.js'

const app = new Hono()

app.use(
    '/admin/*',
    cors({
        origin: config.corsOrigin,
        credentials: true,
    }),
)

app.get('/health', (c) => c.json({ status: 'ok' }))
app.route('/events', eventsRoute)
app.route('/sync', syncRoute)
app.route('/admin', adminAuthRoute)
app.route('/admin/events', adminEventsRoute)

serve({ fetch: app.fetch, port: config.port })
console.log(`Event Hub listening on http://localhost:${config.port}`)