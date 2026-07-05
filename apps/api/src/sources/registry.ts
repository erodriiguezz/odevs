export interface LumaSource {
    platform: 'luma'
    slug: string
    groupId: string
    url: string
}

/** Calendars to sync. groupId must match keys in apps/web/lib/data/groups.ts */
export const lumaSources: LumaSource[] = [
    {
        platform: 'luma',
        slug: 'BuildTheFutureOrlando',
        groupId: 'build-the-future',
        url: 'https://lu.ma/BuildTheFutureOrlando',
    },
    // Later:
    // { platform: 'luma', slug: 'accelerateorlando', groupId: 'accelerate-orlando', url: '...' },
    // { platform: 'luma', slug: 'otab', groupId: 'otab', url: '...' },
]

/** Extract slug from https://lu.ma/BuildTheFutureOrlando or https://luma.com/... */
export function slugFromLumaUrl(url: string): string {
    const parsed = new URL(url)
    return parsed.pathname.replace(/^\//, '')
}