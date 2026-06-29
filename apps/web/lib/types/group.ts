import type { SourcePlatform } from './platform'

export interface EventSource {
  platform: SourcePlatform
  url: string
}

export interface CommunityGroup {
  id: string
  name: string
  description: string
  topic: string
  logo: string
  websiteUrl: string
  discordUrl: string
  brandColor: string
  eventSources: EventSource[]
}
