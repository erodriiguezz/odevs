import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EventTimeline } from '@/components/calendar/event-timeline'
import type { Event } from '@/lib/types/event'

function makeEvent(overrides: Partial<Event> = {}): Event {
  return {
    id: '1',
    title: 'Test Event',
    description: 'A test event',
    sponsors: [],
    date: '2026-06-15',
    time: '18:00',
    location: 'Orlando, FL',
    eventType: 'meetup',
    registrationUrl: 'https://example.com',
    sourcePlatform: 'meetup',
    group: {
      id: 'group-1',
      name: 'Test Group',
      description: 'A test group',
      topic: 'Tech',
      logo: '',
      websiteUrl: 'https://example.com',
      discordUrl: '',
      brandColor: '#000',
      eventSources: [],
    },
    tags: [],
    featured: false,
    ...overrides,
  }
}

describe('EventTimeline', () => {
  it('renders one EventCard per event', () => {
    const events: Event[] = [
      makeEvent({ id: '1', title: 'Event One' }),
      makeEvent({ id: '2', title: 'Event Two' }),
      makeEvent({ id: '3', title: 'Event Three' }),
    ]

    render(<EventTimeline events={events} />)

    expect(screen.getByText('Event One')).toBeInTheDocument()
    expect(screen.getByText('Event Two')).toBeInTheDocument()
    expect(screen.getByText('Event Three')).toBeInTheDocument()
  })

  it('displays empty-state message when events array is empty', () => {
    render(<EventTimeline events={[]} />)

    expect(screen.getByText('No events to show')).toBeInTheDocument()
  })

  it('does not display empty-state message when events exist', () => {
    const events: Event[] = [makeEvent({ id: '1', title: 'Some Event' })]

    render(<EventTimeline events={events} />)

    expect(screen.queryByText('No events to show')).not.toBeInTheDocument()
  })

  it('uses vertical flex layout with gap', () => {
    const events: Event[] = [makeEvent({ id: '1', title: 'Event' })]

    const { container } = render(<EventTimeline events={events} />)

    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('flex')
    expect(wrapper?.className).toContain('flex-col')
    expect(wrapper?.className).toContain('gap-4')
  })
})
