/**
 * One-off: insert the first outside-of-network events (issue #61).
 * Run: pnpm --filter @odevs/api exec tsx src/cli/seed-outside-network-events.ts
 */
import { db } from '../db/index.js'
import { events } from '../db/schema.js'
import type { NewEventRow } from '../db/schema.js'

const now = new Date()

const outsideNetworkEvents: NewEventRow[] = [
  {
    id: 'manual:gdg-central-florida-cloud-functions-vision-run',
    sourcePlatform: 'manual',
    sourceEventId: 'gdg-central-florida-cloud-functions-vision-run',
    sourceUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-using-google-cloud-functions-cloud-vision-and-google-cloud-run/',
    groupId: 'community-events',
    title: 'GDG Central Florida: Using Google Cloud Functions, Cloud Vision and Google Cloud Run',
    description: 'A hands-on code lab building a computer vision pipeline with Google Cloud Functions and Cloud Storage for image labeling, plus an architecture talk on scaling multi-tenant apps with Google Cloud Run.',
    date: '2026-07-18',
    time: '2:00 PM - 3:30 PM EDT',
    location: 'Tech Hub Orlando, 36 West Pine Street, Orlando, FL 32801',
    thumbnailUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/contentbuilder/GDG_Bevy_DefaultEventBanner_g3sdRZ4.png',
    eventType: 'workshop',
    registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-using-google-cloud-functions-cloud-vision-and-google-cloud-run/',
    tags: [],
    featured: false,
    status: 'approved',
    firstSeenAt: now,
    lastSeenAt: now,
    updatedAt: now,
  },
  {
    id: 'manual:gdg-central-florida-virtual-show-and-tell',
    sourcePlatform: 'manual',
    sourceEventId: 'gdg-central-florida-virtual-show-and-tell',
    sourceUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-virtual-show-and-tell-of-projects-by-the-community-2026-07-28/',
    groupId: 'community-events',
    title: 'GDG Central Florida: Virtual "Show and Tell" of Projects by the Community',
    description: 'A monthly virtual creative exchange where community members demo projects in 7-minute lightning talks, share feedback, and discover new tools.',
    date: '2026-07-28',
    time: '7:00 PM - 8:00 PM EDT',
    location: 'Online',
    thumbnailUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_AZGpvjQ',
    eventType: 'meetup',
    registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-central-florida-presents-virtual-show-and-tell-of-projects-by-the-community-2026-07-28/',
    tags: [],
    featured: false,
    status: 'approved',
    firstSeenAt: now,
    lastSeenAt: now,
    updatedAt: now,
  },
  {
    id: 'manual:oil-innovation-stories-summer-26',
    sourcePlatform: 'manual',
    sourceEventId: 'oil-innovation-stories-summer-26',
    sourceUrl: 'https://events.humanitix.com/innovation-stories-summer-26',
    groupId: 'orlando-innovation-league',
    title: "Innovation Stories - Summer '26",
    description: 'An intimate storytelling evening featuring founders, operators, creators, and community leaders sharing 15-20 minute talks about experimentation, customer discovery, pivots, and real-world applications — followed by networking.',
    date: '2026-08-20',
    time: '6:30 PM - 8:30 PM EDT',
    location: 'Tech Hub Orlando, 36 W Pine St, Orlando, FL 32801, USA',
    thumbnailUrl: 'https://images.humanitix.com/i/401e5ca8-1ee6-4e0a-b717-7a81cf5e11df.png@responsive-1600.webp',
    eventType: 'social',
    registrationUrl: 'https://events.humanitix.com/innovation-stories-summer-26',
    tags: [],
    featured: false,
    status: 'approved',
    firstSeenAt: now,
    lastSeenAt: now,
    updatedAt: now,
  },
]

async function main() {
  for (const event of outsideNetworkEvents) {
    await db
      .insert(events)
      .values(event)
      .onConflictDoUpdate({ target: events.id, set: event })
  }

  console.log(`Inserted/updated ${outsideNetworkEvents.length} outside-of-network events:`)
  for (const event of outsideNetworkEvents) {
    console.log(`  ${event.date} · ${event.groupId} · ${event.title}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
