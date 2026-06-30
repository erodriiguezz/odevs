'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Event, Sponsor } from '@/lib/types/event'
import type { SourcePlatform } from '@/lib/types/platform'

export type EventFormat = 'In-Person' | 'Virtual' | 'Hybrid'

export interface EventCardProps {
  event: Event
  eventFormat?: EventFormat
  thumbnailUrl?: string
}

function formatEventDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(isoDate + 'T00:00:00'))
  } catch {
    return isoDate
  }
}

function extractStartTime(timeStr: string): string {
  const dashIdx = timeStr.indexOf(' - ')
  return dashIdx > -1 ? timeStr.slice(0, dashIdx) : timeStr
}

function EventCardMeta({
  date,
  time,
  groupName,
}: {
  date: string
  time: string
  groupName: string
}) {
  const formattedDate = formatEventDate(date)
  const startTime = extractStartTime(time)

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">{formattedDate}</span>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        {startTime} ·{' '}
        <span className="text-zinc-600 dark:text-zinc-300 font-medium">{groupName}</span>
      </span>
    </div>
  )
}

const platformDisplayName: Record<SourcePlatform, string> = {
  meetup: 'Meetup',
  eventbrite: 'Eventbrite',
  luma: 'Luma',
  discord: 'Discord',
  manual: 'External',
  other: 'External',
}

const formatBadgeClasses: Record<EventFormat, string> = {
  'In-Person': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Virtual: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  Hybrid: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
}

function EventFormatBadge({ format }: { format: EventFormat }) {
  return (
    <span className={`rounded-full text-sm px-2 py-0.5 font-medium ${formatBadgeClasses[format]}`}>
      {format}
    </span>
  )
}

function EventCardSponsors({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) {
    return null
  }

  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400 ">
      Sponsored by{' '}
      {sponsors.map((sponsor, i) => (
        <span key={sponsor.name}>
          {sponsor.url ? (
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:underline hover:underline-offset-2 transition-colors duration-150"
            >
              {sponsor.name}
            </a>
          ) : (
            <span className="text-zinc-600 dark:text-zinc-300">{sponsor.name}</span>
          )}
          {i < sponsors.length - 1 && ', '}
        </span>
      ))}
    </p>
  )
}

function EventCardThumbnail({ thumbnailUrl, alt }: { thumbnailUrl?: string; alt: string }) {
  const [hasError, setHasError] = useState(false)

  // No thumbnail provided or it failed to load — render nothing
  if (!thumbnailUrl || hasError) {
    return null
  }

  return (
    <div className="relative flex-shrink-0 self-start w-36 h-24 md:w-44 md:h-[7.5rem] overflow-hidden rounded-lg">
      <Image
        src={thumbnailUrl}
        alt={alt}
        fill
        sizes="176px"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

function EventCardCTA({
  registrationUrl,
  platform,
}: {
  registrationUrl: string
  platform: SourcePlatform
}) {
  return (
    <a
      href={registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Register on ${platformDisplayName[platform]}`}
      className="cursor-pointer mt-2 self-start inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-200 dark:hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-colors duration-150"
    >
      <span>Register</span>
      <span aria-hidden="true">·</span>
      <span>{platformDisplayName[platform]}</span>
    </a>
  )
}

export function EventCard({ event, eventFormat, thumbnailUrl }: EventCardProps) {
  const resolvedThumbnail = thumbnailUrl ?? event.thumbnailUrl

  return (
    <article className="group max-w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 transition-all duration-150 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 focus-within:outline focus-within:outline-2 focus-within:outline-zinc-500">
      <div className="flex flex-row gap-4 p-4">
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          {eventFormat && <EventFormatBadge format={eventFormat} />}

          <h3 className="text-base font-semibold text-zinc-950 dark:text-white line-clamp-2">
            {event.title}
          </h3>

          {event.description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
              {event.description}
            </p>
          )}

          <EventCardMeta date={event.date} time={event.time} groupName={event.group.name} />

          {event.sponsors.length > 0 && <EventCardSponsors sponsors={event.sponsors} />}

          {event.registrationUrl && (
            <EventCardCTA registrationUrl={event.registrationUrl} platform={event.sourcePlatform} />
          )}
        </div>

        <div className="hidden md:block">
          <EventCardThumbnail thumbnailUrl={resolvedThumbnail} alt={event.title} />
        </div>
      </div>
    </article>
  )
}
