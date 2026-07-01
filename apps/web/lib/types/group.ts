import type { SourcePlatform } from './platform'

export interface EventSource {
  platform: SourcePlatform
  url: string
  title?: string
  description?: string
  members?: number
  image?: string
}

export interface CommunityGroup {
  id: string
  name: string
  description: string
  longDescription?: string
  topic: string
  icon: string
  logo?: string
  websiteUrl?: string
  brandColor?: string
  eventSources: EventSource[]
  category: GroupCategory
  background: string
}

// categories from previous website, potentially change to something different in the future
export interface GroupCategory {
  name: string
  background: string
  darkBackground: string
}