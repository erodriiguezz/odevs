export interface MeetupVenue {
    name: string
    address?: string
    city?: string
    state?: string
    country?: string
}

export interface MeetupRawEvent {
    id: string
    title: string
    eventUrl: string
    description?: string
    dateTime: string
    endTime?: string
    isOnline: boolean
    venue?: MeetupVenue
    thumbnailUrl?: string
}

export interface MeetupFetchResult {
    groupName: string
    events: MeetupRawEvent[]
}

/** Loosely-typed Apollo InMemoryCache dump embedded in a Meetup page's __NEXT_DATA__ */
export type MeetupApolloState = Record<string, Record<string, unknown>>
