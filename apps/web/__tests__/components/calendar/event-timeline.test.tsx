import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EventTimeline } from '@/app/calendar/_components/event-timeline'
import type { Event } from '@/lib/types/event'
import groupCategories from '@/lib/data/groupCategories'

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function makeEvent(overrides: Partial<Event> = {}): Event {
  return {
    id: '1',
    title: 'Test Event',
    description: 'A test event',
    sponsors: [],
    date: daysFromNow(7),
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
      icon: 'people',
      logo: '',
      websiteUrl: 'https://example.com',
      brandColor: '#5B4FE9',
      eventSources: [],
      category: groupCategories.General,
      background: 'bg-[#5B4FE9]',
    },
    tags: [],
    featured: false,
    ...overrides,
  }
}

describe('EventTimeline', () => {
  it('renders one EventCard per event', () => {
    const events: Event[] = [
      makeEvent({ id: '1', title: 'Event One', date: daysFromNow(1) }),
      makeEvent({ id: '2', title: 'Event Two', date: daysFromNow(2) }),
      makeEvent({ id: '3', title: 'Event Three', date: daysFromNow(3) }),
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

  it('renders timeline wrapper for upcoming events', () => {
    const events: Event[] = [makeEvent({ id: '1', title: 'Event' })]

    const { container } = render(<EventTimeline events={events} />)

    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('relative')
    expect(wrapper?.className).toContain('overflow-visible')
  })
})
