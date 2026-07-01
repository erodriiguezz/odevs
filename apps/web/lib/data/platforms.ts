import { SourcePlatform } from "../types/platform";
import discordLogo from '@/public/images/platform-logos/discord.svg';
import lumaLogo from '@/public/images/platform-logos/luma.svg';
import eventbriteLogo from '@/public/images/platform-logos/eventbrite.svg';
import meetupLogo from '@/public/images/platform-logos/meetup.svg';

export const platforms: Record<SourcePlatform, { logo?: { image: { src: string, width: number, height: number }, containsName: boolean } }> = {
  'meetup': {
    logo: { image: meetupLogo, containsName: true }
  },
  'eventbrite': {
    logo: { image: eventbriteLogo, containsName: true }
  },
  'luma': {
    logo: { image: lumaLogo, containsName: true }
  },
  'discord': {
    logo: { image: discordLogo, containsName: false }
  },
  'manual': {},
  'other': {},
};