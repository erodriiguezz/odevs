/**
 * Hostnames next/image is allowed to optimize (must mirror next.config.ts's
 * images.remotePatterns). Checked client-side too so a thumbnail from an
 * unlisted host degrades to "no thumbnail" instead of crashing the card.
 */
export const ALLOWED_IMAGE_HOSTS = [
  'secure.meetupstatic.com',
  'images.lumacdn.com',
  'res.cloudinary.com',
  'images.humanitix.com',
]
