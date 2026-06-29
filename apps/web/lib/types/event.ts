export type EventType =
  | 'meetup'
  | 'workshop'
  | 'conference'
  | 'hackathon'
  | 'webinar'
  | 'social'
  | 'other'

import type { SourcePlatform } from './platform'
import { CommunityGroup } from './group'

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
