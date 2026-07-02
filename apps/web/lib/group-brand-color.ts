import type { CommunityGroup } from '@/lib/types/group'

const DEFAULT_BRAND_COLOR = '#5B4FE9'

export function brandColorFromBackground(background: string): string | undefined {
  const match = background.match(/#([0-9A-Fa-f]{6})/)
  return match ? `#${match[1]}` : undefined
}

export function getGroupBrandColor(
  group: Pick<CommunityGroup, 'brandColor' | 'background'>,
): string {
  if (group.brandColor && group.brandColor !== '#000000') {
    return group.brandColor
  }

  return brandColorFromBackground(group.background) ?? DEFAULT_BRAND_COLOR
}
