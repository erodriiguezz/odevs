import type { Sponsor } from '@/lib/types/event';

export default ((
    sponsor: Record<string, Omit<Sponsor, keyof {name: string}>>
  ) => {
    const result = {} as Record<string, Sponsor>;
    for (const key in sponsor) result[key] = { ...sponsor[key], name: key };
    return result;
  }) ({
  "Bluewave": { url: "https://bluewave.com", logo: "/images/bluewave-logo.svg"},
  "Informulate": { url: "https://informulate.com", logo: "/images/informulate-logo.svg"},
  "Envy Labs": { url: "https://envylabs.com", logo: "/images/envy-logo.svg"},
  "Worth": { url: "https://worthai.com", logo: "/images/worth-logo.svg"},
});