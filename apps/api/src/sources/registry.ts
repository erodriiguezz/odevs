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
        slug: 'buildthefutureorlando',
        groupId: 'build-the-future',
        url: 'https://lu.ma/buildthefutureorlando',
    },
    {
        platform: 'luma',
        slug: 'accelerateorlando',
        groupId: 'accelerate-orlando',
        url: 'https://lu.ma/accelerateorlando',
    },
    {
        platform: 'luma',
        slug: 'otab',
        groupId: 'otab',
        url: 'https://lu.ma/otab',
    },
]

/** Extract slug from https://lu.ma/BuildTheFutureOrlando or https://luma.com/... */
export function slugFromLumaUrl(url: string): string {
    const parsed = new URL(url)
    return parsed.pathname.replace(/^\//, '')
}