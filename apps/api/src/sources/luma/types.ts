export interface LumaGeoAddress {
    full_address?: string
    city_state?: string
    address?: string
}

export interface LumaRawEvent {
    api_id: string
    name: string
    start_at: string
    end_at: string
    timezone: string
    url: string
    cover_url?: string
    location_type?: string
    geo_address_info?: LumaGeoAddress
    description?: string
}

export interface LumaFeaturedItem {
    event: LumaRawEvent
}

export interface LumaCalendarPageData {
    calendar: {
        api_id: string
        name: string
        slug: string
        timezone?: string
    }
    featured_items: LumaFeaturedItem[]
    has_upcoming_events?: boolean
}

export interface LumaFetchResult {
    calendar: LumaCalendarPageData['calendar']
    events: LumaRawEvent[]
}