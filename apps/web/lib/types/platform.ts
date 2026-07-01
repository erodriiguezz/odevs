export type SourcePlatform = 'meetup' | 'eventbrite' | 'luma' | 'discord' | 'manual' | 'other'

export const platforms: Record<SourcePlatform, { logo?: { path: string, containsName: boolean } }> = {
  'meetup': {
    logo: { path: '/images/platform-logos/meetup.svg', containsName: true }
  },
  'eventbrite': {
    logo: { path: '/images/platform-logos/eventbrite.svg', containsName: true }
  },
  'luma': {
    logo: { path: '/images/platform-logos/luma.svg', containsName: true }
  },
  'discord': {
    logo: { path: '/images/platform-logos/discord.svg', containsName: false }
  },
  'manual': {},
  'other': {},
};