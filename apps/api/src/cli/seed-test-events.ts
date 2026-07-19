/**
 * Temporary helper: insert approved upcoming test events.
 * Run: pnpm --filter @odevs/api exec tsx src/cli/seed-test-events.ts
 */
import { eq, like } from 'drizzle-orm'
import { db } from '../db/index.js'
import { events } from '../db/schema.js'

const now = new Date()

const testEvents = [
  {
    id: 'manual:test-today-orlando-devs',
    sourceEventId: 'test-today-orlando-devs',
    groupId: 'orlando-devs',
    title: 'ODevs Office Hours (Test)',
    description: 'Temporary test event scheduled for today.',
    date: '2026-07-19',
    time: '6:00 PM - 7:30 PM EDT',
    location: 'Downtown Orlando',
    eventType: 'meetup',
  },
  {
    id: 'manual:test-same-day-js-1',
    sourceEventId: 'test-same-day-js-1',
    groupId: 'orlando-js',
    title: 'TypeScript Lunch & Learn (Test)',
    description: 'Temporary test event — first of two on the same day.',
    date: '2026-07-22',
    time: '12:00 PM - 1:00 PM EDT',
    location: 'Fattmerchant HQ',
    eventType: 'workshop',
  },
  {
    id: 'manual:test-same-day-devops-2',
    sourceEventId: 'test-same-day-devops-2',
    groupId: 'orlando-devops',
    title: 'DevOps Storytime Social (Test)',
    description: 'Temporary test event — second of two on the same day.',
    date: '2026-07-22',
    time: '7:00 PM - 9:00 PM EDT',
    location: 'Cypress Room · Downtown Orlando',
    eventType: 'social',
  },
  {
    id: 'manual:test-frontend-orlando',
    sourceEventId: 'test-frontend-orlando',
    groupId: 'front-end-orlando',
    title: 'CSS Layout Lab (Test)',
    description: 'Temporary test event for Front End Orlando.',
    date: '2026-07-24',
    time: '6:30 PM - 8:00 PM EDT',
    location: 'Canvs Coworking · Winter Park',
    eventType: 'workshop',
  },
  {
    id: 'manual:test-lady-devs',
    sourceEventId: 'test-lady-devs',
    groupId: 'lady-devs',
    title: 'Lady Devs Mentor Mixer (Test)',
    description: 'Temporary test event — Lady Devs #1 on Jul 28.',
    date: '2026-07-28',
    time: '6:00 PM - 8:00 PM EDT',
    location: 'Orlando Public Library',
    eventType: 'meetup',
  },
  {
    id: 'manual:test-lady-devs-2',
    sourceEventId: 'test-lady-devs-2',
    groupId: 'lady-devs',
    title: 'Lady Devs Coffee Chat (Test)',
    description: 'Temporary test event — second Lady Devs event on the same day.',
    date: '2026-07-28',
    time: '9:00 AM - 10:30 AM EDT',
    location: 'Foxtail Coffee · Winter Park',
    eventType: 'social',
  },
  {
    id: 'manual:test-accelerate-orlando',
    sourceEventId: 'test-accelerate-orlando',
    groupId: 'accelerate-orlando',
    title: 'Builders Night Demo Hour (Test)',
    description: 'Temporary test event for Accelerate Orlando.',
    date: '2026-08-01',
    time: '6:30 PM - 8:30 PM EDT',
    location: 'Canvs Coworking · Winter Park',
    eventType: 'meetup',
  },
] as const

async function main() {
  // Clear previous runs of this seed
  await db.delete(events).where(like(events.id, 'manual:test-%'))

  for (const event of testEvents) {
    await db.insert(events).values({
      id: event.id,
      sourcePlatform: 'manual',
      sourceEventId: event.sourceEventId,
      sourceUrl: `https://orlandodevs.com/calendar#${event.sourceEventId}`,
      groupId: event.groupId,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      eventType: event.eventType,
      registrationUrl: `https://orlandodevs.com/calendar#${event.sourceEventId}`,
      tags: ['test'],
      featured: false,
      status: 'approved',
      firstSeenAt: now,
      lastSeenAt: now,
      updatedAt: now,
    })
  }

  const inserted = await db
    .select({ id: events.id, title: events.title, date: events.date, groupId: events.groupId })
    .from(events)
    .where(eq(events.sourcePlatform, 'manual'))

  console.log(`Inserted ${testEvents.length} approved test events:`)
  for (const row of inserted.filter((r) => r.id.startsWith('manual:test-'))) {
    console.log(`  ${row.date} · ${row.groupId} · ${row.title}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
