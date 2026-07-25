export interface LumaSource {
    platform: 'luma'
    slug: string
    groupId: string
    url: string
}

export interface MeetupSource {
    platform: 'meetup'
    urlname: string
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

/** Groups to sync. groupId must match keys in apps/web/lib/data/groups.ts */
export const meetupSources: MeetupSource[] = [
    {
        platform: 'meetup',
        urlname: 'orlandoaws',
        groupId: 'orlando-aws',
        url: 'https://www.meetup.com/orlandoaws/events/',
    },
    {
        platform: 'meetup',
        urlname: 'orlando-devops',
        groupId: 'orlando-devops',
        url: 'https://www.meetup.com/orlando-devops/events/',
    },
]

/** Extract urlname from https://www.meetup.com/orlandoaws/events/ or https://www.meetup.com/orlandoaws */
export function urlnameFromMeetupUrl(url: string): string {
    const parsed = new URL(url)
    const [urlname] = parsed.pathname.split('/').filter(Boolean)
    if (!urlname) {
        throw new Error(`Could not extract urlname from Meetup URL: ${url}`)
    }
    return urlname
}