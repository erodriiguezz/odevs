import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const events = sqliteTable('events', {
    id: text('id').primaryKey(),
    sourcePlatform: text('source_platform').notNull(),
    sourceEventId: text('source_event_id').notNull(),
    sourceUrl: text('source_url').notNull(),
    groupId: text('group_id').notNull(),

    title: text('title').notNull(),
    description: text('description').notNull().default(''),
    date: text('date').notNull(),           // ISO date: 2026-07-16
    time: text('time').notNull(),           // 7:00 PM - 8:00 PM EDT
    location: text('location').notNull().default(''),
    thumbnailUrl: text('thumbnail_url'),
    eventType: text('event_type').notNull().default('meetup'),
    registrationUrl: text('registration_url').notNull(),
    tags: text('tags', { mode: 'json' }).$type<string[]>().notNull().default([]),
    featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
    status: text('status', { enum: ['pending', 'approved', 'rejected'] }).notNull().default('pending'),

    rawPayload: text('raw_payload', { mode: 'json' }).$type<Record<string, unknown>>(),

    firstSeenAt: integer('first_seen_at', { mode: 'timestamp' }).notNull(),
    lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => [
    uniqueIndex('event_source_unique').on(table.sourcePlatform, table.sourceEventId),
])

export const syncRuns = sqliteTable('sync_runs', {
    id: text('id').primaryKey(),
    source: text('source').notNull(),
    status: text('status').notNull(), // 'success' | 'failed'
    startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
    finishedAt: integer('finished_at', { mode: 'timestamp' }),
    eventsFound: text('events_found').notNull().default('0'),
    eventsNew: text('events_new').notNull().default('0'),
    eventsUpdated: text('events_updated').notNull().default('0'),
    errorMessage: text('error_message'),
})

export type EventRow = typeof events.$inferSelect;
export type NewEventRow = typeof events.$inferInsert;
