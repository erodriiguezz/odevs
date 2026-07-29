/**
 * One-off: insert upcoming GDG Central Florida events as pending, for admin review.
 * Run: pnpm --filter @odevs/api exec tsx src/cli/seed-gdg-pending-events.ts
 */
import { db } from '../db/index.js'
import { events } from '../db/schema.js'
import type { NewEventRow } from '../db/schema.js'

const now = new Date()

const THUMBNAIL_URL =
  'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_AZGpvjQ'

const DESCRIPTION =
  'A monthly virtual creative exchange where community members demo projects in 7-minute lightning talks, share feedback, and discover new tools.'

interface PendingGdgEvent {
  date: string
  time: string
  sourceUrl: string
}

const pendingEvents: PendingGdgEvent[] = [
  {
    date: '2026-08-25',
    time: '7:00 PM - 8:00 PM EDT',
    sourceUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-virtual-show-and-tell-of-projects-by-the-community-2026-08-25/',
  },
  {
    date: '2026-09-22',
    time: '7:00 PM - 8:00 PM EDT',
    sourceUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-virtual-show-and-tell-of-projects-by-the-community-2026-09-22/',
  },
  {
    date: '2026-10-27',
    time: '7:00 PM - 8:00 PM EDT',
    sourceUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-virtual-show-and-tell-of-projects-by-the-community-2026-10-27/',
  },
  {
    date: '2026-11-24',
    time: '7:00 PM - 8:00 PM EST',
    sourceUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-virtual-show-and-tell-of-projects-by-the-community-2026-11-24/',
  },
]

const outsideNetworkEvents: NewEventRow[] = pendingEvents.map(({ date, time, sourceUrl }) => ({
  id: `manual:gdg-central-florida-virtual-show-and-tell-${date}`,
  sourcePlatform: 'manual',
  sourceEventId: `gdg-central-florida-virtual-show-and-tell-${date}`,
  sourceUrl,
  groupId: 'community-events',
  title: 'GDG Central Florida: Virtual "Show and Tell" of Projects by the Community',
  description: DESCRIPTION,
  date,
  time,
  location: 'Online',
  thumbnailUrl: THUMBNAIL_URL,
  eventType: 'meetup',
  registrationUrl: sourceUrl,
  tags: [],
  featured: false,
  status: 'pending',
  firstSeenAt: now,
  lastSeenAt: now,
  updatedAt: now,
}))

async function main() {
  for (const event of outsideNetworkEvents) {
    await db
      .insert(events)
      .values(event)
      .onConflictDoUpdate({ target: events.id, set: event })
  }

  console.log(`Inserted/updated ${outsideNetworkEvents.length} pending GDG events:`)
  for (const event of outsideNetworkEvents) {
    console.log(`  ${event.date} · ${event.status} · ${event.title}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
