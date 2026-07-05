import {pgTable,text, timestamp, boolean, jsonb, uniqueIndex} from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
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
    tags: jsonb('tags').$type<string[]>().notNull().default([]),
    featured: boolean('featured').notNull().default(false),

    rawPayload: jsonb('raw_payload').$type<Record<string, unknown>>(),

    firstSeenAt: timestamp('first_seen_at', { withTimezone: true }).notNull(),
    lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
}, (table) => [
    uniqueIndex('event_source_unique').on(table.sourcePlatform, table.sourceEventId),
])

export const syncRuns = pgTable('sync_runs', {
    id: text('id').primaryKey(),
    source: text('source').notNull(),
    status: text('status').notNull(), // 'success' | 'failed'
    startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
    finishedAt: timestamp('finished_at', { withTimezone: true }),
    eventsFound: text('events_found').notNull().default('0'),
    eventsNew: text('events_new').notNull().default('0'),
    eventsUpdated: text('events_updated').notNull().default('0'),
    errorMessage: text('error_message'),
})

export type EventRow = typeof events.$inferSelect; 
export type NewEventRow = typeof events.$inferInsert;