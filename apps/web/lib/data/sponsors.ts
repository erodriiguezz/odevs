import type { Sponsor } from '@/lib/types/event';
import propFromKeys from './propFromKeys';

const sponsors: Record<string, Sponsor> = propFromKeys("name", {
  "Bluewave": { url: "https://bluewave.com", logo: "/images/sponsor-logos/bluewave-logo.svg"},
  "Informulate": { url: "https://informulate.com", logo: "/images/sponsor-logos/informulate-logo.svg"},
  "Envy Labs": { url: "https://envylabs.com", logo: "/images/sponsor-logos/envy-logo.svg"},
  "Worth": { url: "https://worthai.com", logo: "/images/sponsor-logos/worth-logo.svg" },
});

export default sponsors;