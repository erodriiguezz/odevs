import type { LumaCalendarPageData, LumaFetchResult, LumaRawEvent } from './types.js'

const NEXT_DATA_REGEX =
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/

function parseNextData(html: string): LumaCalendarPageData {
    const match = html.match(NEXT_DATA_REGEX)
    if (!match?.[1]) {
        throw new Error('Could not find __NEXT_DATA__ in Luma page HTML')
    }

    const json = JSON.parse(match[1]) as {
        props?: { pageProps?: { initialData?: { data?: LumaCalendarPageData } } }
    }

    const data = json.props?.pageProps?.initialData?.data
    if (!data?.calendar) {
        throw new Error('Unexpected Luma page structure: missing calendar data')
    }

    return data
}

function extractEvents(data: LumaCalendarPageData): LumaRawEvent[] {
    return (data.featured_items ?? [])
        .map((item) => item.event)
        .filter((event): event is LumaRawEvent => Boolean(event?.api_id))
}

/** Fetch upcoming events from a public Luma calendar page */
export async function fetchLumaCalendar(slug: string): Promise<LumaFetchResult> {
    const url = `https://luma.com/${slug}`
    const response = await fetch(url, {
        headers: {
            // Some hosts block requests with no user-agent
            'user-agent': 'ODevs-EventHub/1.0 (+https://orlandodevs.com)',
            accept: 'text/html',
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch Luma calendar ${slug}: HTTP ${response.status}`)
    }

    const html = await response.text()
    const data = parseNextData(html)
    const events = extractEvents(data)

    return {
        calendar: data.calendar,
        events,
    }
}