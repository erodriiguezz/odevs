import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import HomePage from '@/app/page'

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const mockApiEvents = [
  {
    id: 'mock-1',
    title: 'Mock Meetup One',
    description: 'A mock event',
    date: daysFromNow(3),
    time: '6:00 PM - 8:00 PM EDT',
    location: 'Orlando, FL',
    eventType: 'meetup',
    registrationUrl: 'https://example.com/1',
    sourcePlatform: 'luma',
    groupId: 'orlando-devs',
    tags: [],
    featured: false,
  },
  {
    id: 'mock-2',
    title: 'Mock Meetup Two',
    description: 'Another mock event',
    date: daysFromNow(5),
    time: '6:00 PM - 8:00 PM EDT',
    location: 'Orlando, FL',
    eventType: 'meetup',
    registrationUrl: 'https://example.com/2',
    sourcePlatform: 'luma',
    groupId: 'orlando-devs',
    tags: [],
    featured: false,
  },
]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () =>
    new Response(JSON.stringify({ events: mockApiEvents }), { status: 200 }),
  ))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('HomePage sections structure and accessibility', () => {
  it('renders exactly 5 section elements', async () => {
    const { container } = render(await HomePage())
    const sections = container.querySelectorAll('section')
    expect(sections).toHaveLength(5)
  })

  it('sections appear in correct DOM order', async () => {
    const { container } = render(await HomePage())
    const sections = container.querySelectorAll('section')
    const ids = Array.from(sections).map(s => s.id)
    expect(ids).toEqual(['hero', 'coming-up', 'about', 'explore-groups', 'sponsors'])
  })

  it('each section has aria-labelledby referencing its heading', async () => {
    const { container } = render(await HomePage())
    const sections = container.querySelectorAll('section')

    sections.forEach(section => {
      const labelledBy = section.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const referencedHeading = section.querySelector(`#${labelledBy}`)
      expect(referencedHeading).not.toBeNull()
    })
  })

  it('Hero contains exactly one h1', async () => {
    const { container } = render(await HomePage())
    const h1Elements = container.querySelectorAll('h1')
    expect(h1Elements).toHaveLength(1)

    // Verify it's inside the hero section
    const heroSection = container.querySelector('#hero')
    expect(heroSection?.querySelector('h1')).not.toBeNull()
  })

  it('other sections use h2 headings (4 total)', async () => {
    const { container } = render(await HomePage())
    const h2Elements = container.querySelectorAll('h2')
    expect(h2Elements).toHaveLength(4)
  })

  it('decorative elements have aria-hidden="true"', async () => {
    const { container } = render(await HomePage())
    const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]')
    expect(ariaHiddenElements.length).toBeGreaterThan(0)
  })

  it('container pattern (max-w-*) is present in each section', async () => {
    const { container } = render(await HomePage())
    const sections = container.querySelectorAll('section')

    sections.forEach(section => {
      const containerDiv = section.querySelector('[class*="max-w-"]')
      expect(containerDiv).not.toBeNull()
    })
  })

  it('Coming Up has >= 2 event cards', async () => {
    const { container } = render(await HomePage())
    const comingUpSection = container.querySelector('#coming-up')
    const cards = comingUpSection?.querySelectorAll('[role="listitem"]')
    expect(cards!.length).toBeGreaterThanOrEqual(2)
  })

  it('About has >= 2 value cards', async () => {
    const { container } = render(await HomePage())
    const aboutSection = container.querySelector('#about')
    const cards = aboutSection?.querySelectorAll('[role="listitem"]')
    expect(cards!.length).toBeGreaterThanOrEqual(2)
  })

  it('Explore Groups has >= 2 group cards', async () => {
    const { container } = render(await HomePage())
    const groupsSection = container.querySelector('#explore-groups')
    const cards = groupsSection?.querySelectorAll('[role="listitem"]')
    expect(cards!.length).toBeGreaterThanOrEqual(2)
  })

  it('Sponsors has >= 2 logo placeholders', async () => {
    const { container } = render(await HomePage())
    const sponsorsSection = container.querySelector('#sponsors')
    const logoPlaceholders = sponsorsSection?.querySelectorAll('a img')
    expect(logoPlaceholders!.length).toBeGreaterThanOrEqual(2)
  })
})
