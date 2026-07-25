import type { MeetupApolloState, MeetupFetchResult, MeetupRawEvent, MeetupVenue } from './types.js'

const NEXT_DATA_REGEX =
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/

function parseApolloState(html: string): MeetupApolloState {
    const match = html.match(NEXT_DATA_REGEX)
    if (!match?.[1]) {
        throw new Error('Could not find __NEXT_DATA__ in Meetup page HTML')
    }

    const json = JSON.parse(match[1]) as {
        props?: { pageProps?: { __APOLLO_STATE__?: MeetupApolloState } }
    }

    const state = json.props?.pageProps?.__APOLLO_STATE__
    if (!state) {
        throw new Error('Unexpected Meetup page structure: missing Apollo state')
    }

    return state
}

function resolveRef(state: MeetupApolloState, ref: unknown): Record<string, unknown> | undefined {
    if (!ref || typeof ref !== 'object' || !('__ref' in ref)) return undefined
    const key = (ref as { __ref: string }).__ref
    return state[key]
}

function findGroup(state: MeetupApolloState, urlname: string): Record<string, unknown> {
    const group = Object.entries(state).find(
        ([key, value]) =>
            key.startsWith('Group:') &&
            (value as { urlname?: string }).urlname?.toLowerCase() === urlname.toLowerCase(),
    )

    if (!group) {
        throw new Error(`Could not find group "${urlname}" in Meetup page Apollo state`)
    }

    return group[1]
}

function findEventEdges(group: Record<string, unknown>): unknown[] {
    // The group object can carry multiple `events(...)` connections keyed by
    // their GraphQL variables (drafts, past-only, etc). The upcoming-events
    // query is the one filtered by `afterDateTime`.
    const eventsKey = Object.keys(group).find(
        (key) => key.startsWith('events(') && key.includes('afterDateTime'),
    )
    if (!eventsKey) return []

    const connection = group[eventsKey] as { edges?: unknown[] } | undefined
    return connection?.edges ?? []
}

function extractVenue(state: MeetupApolloState, event: Record<string, unknown>): MeetupVenue | undefined {
    const venue = resolveRef(state, event.venue)
    if (!venue) return undefined

    return {
        name: String(venue.name ?? ''),
        address: venue.address ? String(venue.address) : undefined,
        city: venue.city ? String(venue.city) : undefined,
        state: venue.state ? String(venue.state) : undefined,
        country: venue.country ? String(venue.country) : undefined,
    }
}

function extractThumbnail(state: MeetupApolloState, event: Record<string, unknown>): string | undefined {
    const photo = resolveRef(state, event.displayPhoto)
    const highResUrl = photo?.highResUrl
    return typeof highResUrl === 'string' ? highResUrl : undefined
}

function extractEvent(state: MeetupApolloState, edge: unknown): MeetupRawEvent | undefined {
    const node = (edge as { node?: unknown })?.node
    const event = resolveRef(state, node)
    if (!event) return undefined

    const id = event.id
    const title = event.title
    const eventUrl = event.eventUrl
    const dateTime = event.dateTime
    if (typeof id !== 'string' || typeof title !== 'string' || typeof eventUrl !== 'string' || typeof dateTime !== 'string') {
        return undefined
    }

    return {
        id,
        title,
        eventUrl,
        description: typeof event.description === 'string' ? event.description : undefined,
        dateTime,
        endTime: typeof event.endTime === 'string' ? event.endTime : undefined,
        isOnline: Boolean(event.isOnline),
        venue: extractVenue(state, event),
        thumbnailUrl: extractThumbnail(state, event),
    }
}

/** Fetch upcoming events from a public Meetup group's events page */
export async function fetchMeetupEvents(urlname: string): Promise<MeetupFetchResult> {
    const url = `https://www.meetup.com/${urlname}/events/`
    const response = await fetch(url, {
        headers: {
            // Some hosts block requests with no user-agent
            'user-agent': 'ODevs-EventHub/1.0 (+https://orlandodevs.com)',
            accept: 'text/html',
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch Meetup events for ${urlname}: HTTP ${response.status}`)
    }

    const html = await response.text()
    const state = parseApolloState(html)
    const group = findGroup(state, urlname)
    const edges = findEventEdges(group)
    const events = edges
        .map((edge) => extractEvent(state, edge))
        .filter((event): event is MeetupRawEvent => Boolean(event))

    return {
        groupName: String(group.name ?? urlname),
        events,
    }
}
