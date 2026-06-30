# Implementation Plan: Event Card Component

## Overview

Refactor the existing minimal `EventCard` component into a full-featured, accessible, responsive card with thumbnail imagery, event format badges, sponsor attribution, registration CTA with hover-reveal animation, and property-based test coverage. Implementation uses React, TypeScript, Tailwind CSS, Next.js Image, and the existing `useIsMobile` hook.

## Tasks

- [x] 1. Define new types and utility functions
  - [x] 1.1 Add EventFormat type and EventCardProps interface
    - Create `EventFormat` type (`'In-Person' | 'Virtual' | 'Hybrid'`) in `apps/web/components/calendar/event-card.tsx`
    - Create `EventCardProps` interface with required `event: Event`, optional `eventFormat?: EventFormat`, optional `thumbnailUrl?: string`
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 1.2 Implement utility functions and platform display name mapping
    - Implement `formatEventDate(isoDate: string): string` using `Intl.DateTimeFormat` with `'en-US'` locale, options: `{ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }`, with fallback to raw string on error
    - Implement `extractStartTime(timeStr: string): string` that returns substring before first `-` separator or full string if no separator
    - Implement `platformDisplayName` record mapping all `SourcePlatform` values to display strings (`manual` and `other` map to `"External"`)
    - Place these in `apps/web/components/calendar/event-card.tsx` as module-level helpers (not exported)
    - _Requirements: 1.3, 1.4, 5.4_

  - [x] 1.3 Install fast-check as dev dependency
    - Run `pnpm add -D fast-check --filter @odevs/web`
    - _Requirements: Testing infrastructure_

- [x] 2. Implement sub-components
  - [x] 2.1 Implement EventCardThumbnail sub-component
    - Create internal `EventCardThumbnail` component accepting `{ thumbnailUrl?: string; alt: string }`
    - Use Next.js `<Image>` with `fill`, `sizes`, and `className="object-cover"` inside a 16:9 aspect-ratio container (`aspect-video`)
    - Implement `onError` handler with local `useState<boolean>` to switch to fallback placeholder
    - Fallback placeholder: a styled div with a gradient background and a generic calendar/image icon
    - When `thumbnailUrl` is undefined or empty, render fallback directly
    - Set `alt` attribute to include the event title
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 2.2 Implement EventFormatBadge sub-component
    - Create internal `EventFormatBadge` accepting `{ format: EventFormat }`
    - Render as a `<span>` with distinct background/text color classes per format value
    - Use small pill-style Tailwind classes (rounded-full, text-xs, px-2, py-0.5)
    - _Requirements: 2.1, 2.2_

  - [x] 2.3 Implement EventCardMeta sub-component
    - Create internal `EventCardMeta` accepting `{ date: string; time: string; groupName: string }`
    - Call `formatEventDate` on the date prop and `extractStartTime` on the time prop
    - Render formatted date, start time, and group name in a compact layout
    - _Requirements: 1.3, 1.4, 1.5_

  - [x] 2.4 Implement EventCardSponsors sub-component
    - Create internal `EventCardSponsors` accepting `{ sponsors: Sponsor[] }`
    - Render "Sponsored by" label followed by sponsor logos/names
    - For sponsors with logo: render `<img>` with `alt={sponsor.name}`, max-h-6, proportional width
    - For sponsors without logo: render sponsor name as text
    - For sponsors with URL: wrap in `<a target="_blank" rel="noopener noreferrer">`
    - Conditionally render nothing when sponsors array is empty
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 2.5 Implement EventCardCTA sub-component
    - Create internal `EventCardCTA` accepting `{ registrationUrl: string; platform: SourcePlatform }`
    - Render an `<a>` element with `href={registrationUrl}`, `target="_blank"`, `rel="noopener noreferrer"`
    - Set `aria-label` to `"Register on {platformDisplayName[platform]}"`
    - Display visible text "Register" and platform display name adjacent
    - Apply hover-reveal animation classes: `opacity-0 translate-y-2 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0`
    - Apply reduced-motion overrides: `motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`
    - Use `useIsMobile` hook to conditionally apply always-visible classes on mobile (`opacity-100 translate-y-0`)
    - Ensure minimum tap target size of 44x44px
    - Apply hover state styling on the CTA button itself (background/text color change)
    - _Requirements: 5.1, 5.2, 5.4, 5.5, 5.6, 5.7, 7.4, 8.2, 8.3, 8.6_

- [x] 3. Assemble the main EventCard component
  - [x] 3.1 Rewrite EventCard with full composition
    - Replace existing `EventCard` in `apps/web/components/calendar/event-card.tsx`
    - Use `<article>` as root element with `group` class for Tailwind group-hover
    - Compose: `EventCardThumbnail` → card body containing `EventFormatBadge` (conditional on `eventFormat`), `<h3>` title with `line-clamp-2`, `<p>` description with `line-clamp-3` (conditional on non-empty description), `EventCardMeta`, `EventCardSponsors` (conditional on sponsors.length > 0), `EventCardCTA` (conditional on non-empty registrationUrl)
    - Apply card hover state: `hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700` or similar visual distinction
    - Apply focus-within visible indicator with 2px outline
    - Ensure all transitions complete within 200ms (`duration-150` or `duration-200`)
    - _Requirements: 1.1, 1.2, 1.5, 1.6, 2.3, 5.3, 7.1, 7.2, 7.3, 8.1, 8.4, 8.7, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 3.2 Implement responsive layout
    - Ensure single-column vertical layout on viewports below 768px
    - Support viewport range 320px–1440px without horizontal scrolling
    - Set minimum font size 14px for body text on mobile
    - Set minimum 44x44px tap targets for interactive elements on mobile
    - Prevent horizontal overflow on parent container
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 4. Checkpoint
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Write property-based tests
  - [ ]\* 5.1 Write property test for date formatting (Property 1)
    - **Property 1: Date formatting produces valid locale string**
    - Generate random valid ISO date strings (YYYY-MM-DD, 2000–2099) using fast-check
    - Assert output matches pattern `"{Weekday}, {Month} {Day}, {Year}"`
    - Place in `apps/web/__tests__/components/calendar/event-card.test.tsx`
    - **Validates: Requirement 1.3**

  - [ ]\* 5.2 Write property test for start time extraction (Property 2)
    - **Property 2: Start time extraction returns prefix before range separator**
    - Generate random time strings with and without `-` separator
    - Assert correct substring extraction behavior
    - **Validates: Requirement 1.4**

  - [ ]\* 5.3 Write property test for platform display name mapping (Property 3)
    - **Property 3: Platform display name mapping is total**
    - Enumerate all valid `SourcePlatform` values
    - Assert each returns a non-empty string; `manual` and `other` return `"External"`
    - **Validates: Requirements 5.4, 7.4**

  - [ ]\* 5.4 Write property test for semantic structure (Property 4)
    - **Property 4: Semantic structure with title and group name**
    - Generate arbitrary valid Event objects
    - Render EventCard and assert: root is `<article>`, contains `<h3>` with event title text, contains group name text
    - **Validates: Requirements 1.1, 1.5, 7.3**

  - [ ]\* 5.5 Write property test for text truncation DOM preservation (Property 5)
    - **Property 5: Text truncation preserves full content in DOM**
    - Generate Events with arbitrary-length titles and descriptions
    - Assert `<h3>` `textContent` equals full title; description element `textContent` equals full description
    - **Validates: Requirements 1.2, 9.1, 9.2, 9.4**

  - [ ]\* 5.6 Write property test for sponsor rendering (Property 6)
    - **Property 6: Sponsor rendering integrity**
    - Generate Events with varied sponsor configurations (with/without logo, with/without URL)
    - Assert correct rendering of img/alt, text fallback, and anchor attributes
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.5, 4.6**

  - [ ]\* 5.7 Write property test for CTA rendering (Property 7)
    - **Property 7: Registration CTA rendering with accessible name**
    - Generate Events with non-empty registrationUrl and various platforms
    - Assert `<a>` href, accessible name pattern, target, and rel attributes
    - **Validates: Requirements 5.1, 5.2, 5.5, 7.4**

  - [ ]\* 5.8 Write property test for thumbnail rendering (Property 8)
    - **Property 8: Thumbnail rendering with accessible alt**
    - Generate non-empty thumbnailUrl strings and event titles
    - Assert rendered image element has alt text including the event title
    - **Validates: Requirements 3.1, 3.5**

- [ ] 6. Write unit tests for conditional rendering and visual states
  - [ ]\* 6.1 Write unit tests for conditional rendering paths
    - Test: renders without errors with only required `event` prop (no optional props)
    - Test: hides description when `event.description` is empty
    - Test: hides CTA when `registrationUrl` is empty
    - Test: hides sponsors section when sponsors array is empty
    - Test: hides format badge when `eventFormat` not provided
    - Test: displays fallback placeholder when no `thumbnailUrl`
    - Test: displays fallback on image load error
    - Test: displays each format badge value correctly ("In-Person", "Virtual", "Hybrid")
    - Place in `apps/web/__tests__/components/calendar/event-card.test.tsx`
    - _Requirements: 1.6, 2.3, 3.2, 3.3, 4.4, 5.3, 10.4_

  - [ ]\* 6.2 Write unit tests for hover, focus, and responsive behavior
    - Test: CTA has animation/transition classes for desktop hover reveal
    - Test: CTA is always visible on mobile (mock `useIsMobile` returning true)
    - Test: motion-reduce classes applied to animated elements
    - Test: interactive elements have focus ring classes (2px outline)
    - Test: card has hover state classes (shadow/border change)
    - Test: transition durations are ≤ 200ms
    - _Requirements: 5.6, 5.7, 7.2, 8.1, 8.2, 8.4, 8.6, 8.7_

- [ ] 7. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The `useIsMobile` hook is used for mobile CTA visibility; CSS handles desktop animation via Tailwind `group`/`group-hover`
- Community group branding is out of scope — no group logo or brand color rendering needed
- `fast-check` must be installed before property tests can run (task 1.3)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["3.2"] },
    { "id": 4, "tasks": ["5.1", "5.2", "5.3"] },
    { "id": 5, "tasks": ["5.4", "5.5", "5.6", "5.7", "5.8", "6.1", "6.2"] }
  ]
}
```
