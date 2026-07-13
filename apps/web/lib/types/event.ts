export const EventTypes = [
  'meetup',
  'workshop',
  'conference',
  'hackathon',
  'webinar',
  'social',
  'other',
] as const;

export type EventType = typeof EventTypes[number];

const eventTypes = new Set<string>(EventTypes);
export function isEventType(str: string): str is EventType {
  return eventTypes.has(str);
}

import type { SourcePlatform } from './platform';
import { CommunityGroup } from './group';

export type { SourcePlatform }

export interface Sponsor {
  name: string
  url: string
  logo: string
}

export interface Event {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  sponsors: Sponsor[]
  date: string
  time: string
  location: string
  eventType: EventType
  registrationUrl: string
  sourcePlatform: SourcePlatform
  group: CommunityGroup
  tags: string[]
  featured: boolean
}
