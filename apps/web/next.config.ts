import type { NextConfig } from 'next'
import { ALLOWED_IMAGE_HOSTS } from './lib/data/allowed-image-hosts'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: ALLOWED_IMAGE_HOSTS.map((hostname) => ({
      protocol: 'https' as const,
      hostname,
    })),
  },
}

export default nextConfig
