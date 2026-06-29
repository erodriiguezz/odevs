export type EventType =
  | 'meetup'
  | 'workshop'
  | 'conference'
  | 'hackathon'
  | 'webinar'
  | 'social'
  | 'other'

export type SourcePlatform = 'meetup' | 'eventbrite' | 'luma' | 'discord' | 'manual' | 'other'

export interface Sponsor {
  name: string
  url?: string
  logo?: string
}

export interface OdevsEvent {
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
  group: string
  tags: string[]
  featured: boolean
}
