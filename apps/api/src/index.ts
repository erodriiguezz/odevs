import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from './config.js'
import { eventsRoute } from './routes/events.js'
import { syncRoute } from './routes/sync.js'

const app = new Hono()

app.get('/health', (c) => c.json({ status: 'ok' }))
app.route('/events', eventsRoute)
app.route('/sync', syncRoute)

serve({ fetch: app.fetch, port: config.port })
console.log(`Event Hub listening on http://localhost:${config.port}`)