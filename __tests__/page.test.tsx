import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '@/app/page'

describe('HomePage sections structure and accessibility', () => {
  it('renders exactly 5 section elements', () => {
    const { container } = render(<HomePage />)
    const sections = container.querySelectorAll('section')
    expect(sections).toHaveLength(5)
  })

  it('sections appear in correct DOM order', () => {
    const { container } = render(<HomePage />)
    const sections = container.querySelectorAll('section')
    const ids = Array.from(sections).map(s => s.id)
    expect(ids).toEqual(['hero', 'coming-up', 'about', 'explore-groups', 'sponsors'])
  })

  it('each section has aria-labelledby referencing its heading', () => {
    const { container } = render(<HomePage />)
    const sections = container.querySelectorAll('section')

    sections.forEach(section => {
      const labelledBy = section.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const referencedHeading = section.querySelector(`#${labelledBy}`)
      expect(referencedHeading).not.toBeNull()
    })
  })

  it('Hero contains exactly one h1', () => {
    const { container } = render(<HomePage />)
    const h1Elements = container.querySelectorAll('h1')
    expect(h1Elements).toHaveLength(1)

    // Verify it's inside the hero section
    const heroSection = container.querySelector('#hero')
    expect(heroSection?.querySelector('h1')).not.toBeNull()
  })

  it('other sections use h2 headings (4 total)', () => {
    const { container } = render(<HomePage />)
    const h2Elements = container.querySelectorAll('h2')
    expect(h2Elements).toHaveLength(4)
  })

  it('decorative elements have aria-hidden="true"', () => {
    const { container } = render(<HomePage />)
    const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]')
    expect(ariaHiddenElements.length).toBeGreaterThan(0)
  })

  it('container pattern (max-w-7xl) is present in each section', () => {
    const { container } = render(<HomePage />)
    const sections = container.querySelectorAll('section')

    sections.forEach(section => {
      const containerDiv = section.querySelector('[class*="max-w-7xl"]')
      expect(containerDiv).not.toBeNull()
    })
  })

  it('Coming Up has >= 2 event cards', () => {
    const { container } = render(<HomePage />)
    const comingUpSection = container.querySelector('#coming-up')
    const cards = comingUpSection?.querySelectorAll('[role="listitem"]')
    expect(cards!.length).toBeGreaterThanOrEqual(2)
  })

  it('About has >= 2 value cards', () => {
    const { container } = render(<HomePage />)
    const aboutSection = container.querySelector('#about')
    const cards = aboutSection?.querySelectorAll('[role="listitem"]')
    expect(cards!.length).toBeGreaterThanOrEqual(2)
  })

  it('Explore Groups has >= 2 group cards', () => {
    const { container } = render(<HomePage />)
    const groupsSection = container.querySelector('#explore-groups')
    const cards = groupsSection?.querySelectorAll('[role="listitem"]')
    expect(cards!.length).toBeGreaterThanOrEqual(2)
  })

  it('Sponsors has >= 2 logo placeholders', () => {
    const { container } = render(<HomePage />)
    const sponsorsSection = container.querySelector('#sponsors')
    const logoPlaceholders = sponsorsSection?.querySelectorAll('[class*="grid"] > div')
    expect(logoPlaceholders!.length).toBeGreaterThanOrEqual(2)
  })
})
