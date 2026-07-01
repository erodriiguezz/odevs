# Implementation Plan: Calendar Page Shell

## Overview

Build the `/calendar` route as a server-rendered page with client-side interactivity for filtering and calendar navigation. The implementation follows a bottom-up approach: utility functions and types first, then presentational components, then the interactive shell, and finally tests.

## Tasks

- [x] 1. Set up component structure and utility foundations
  - [x] 1.1 Create calendar utility functions for grid generation and formatting
    - Create `apps/web/lib/calendar/grid.ts` with a `generateCalendarGrid(year, month, events)` function that returns an array of `DayCell` objects
    - Create `apps/web/lib/calendar/format.ts` with a `formatMonthHeading(year, month)` function returning "MonthName YYYY"
    - Create `apps/web/lib/calendar/filter.ts` with a `filterEvents(events, selectedTypes)` function that returns the filtered subset
    - Export the `DayCell` interface from `apps/web/lib/calendar/types.ts`
    - _Requirements: 5.1, 5.2, 5.5, 2.4, 2.5_

  - [x] 1.2 Install fast-check as a dev dependency
    - Run `pnpm add -D fast-check` in `apps/web`
    - _Requirements: Testing infrastructure_

- [x] 2. Implement presentational components
  - [x] 2.1 Implement the EventCard component
    - Create `apps/web/components/calendar/event-card.tsx`
    - Render a horizontal flex card with 44×44 rounded logo placeholder on the left, title and date/time stacked on the right
    - Use `bg-zinc-900/80 border border-zinc-800 rounded-xl p-4` styling
    - Conditionally skip logo image when `group.logo` is empty string
    - Omit sponsors section when `sponsors` array is empty
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.4, 7.5_

  - [x] 2.2 Implement the EventTimeline component
    - Create `apps/web/components/calendar/event-timeline.tsx`
    - Accept `events: Event[]` prop and render one EventCard per event
    - Display empty-state message when events array is empty
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 2.3 Implement the FilterBar component
    - Create `apps/web/components/calendar/filter-bar.tsx` as a client component
    - Accept `selectedTypes: Set<EventType>` and `onToggle: (type: EventType) => void` props
    - Render one toggle chip per event type (meetup, workshop, conference, hackathon, webinar, social, other)
    - Style default chips with `bg-zinc-900 border border-zinc-800 text-zinc-400` and selected chips with `bg-zinc-800 border border-zinc-600 text-white`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6_

  - [x] 2.4 Implement the MiniCalendar component
    - Create `apps/web/components/calendar/mini-calendar.tsx` as a client component
    - Use `generateCalendarGrid` utility to build the 7-column grid
    - Display month/year heading using `formatMonthHeading` utility
    - Render weekday header row (S M T W T F S)
    - Highlight today's date with `ring-2 ring-[#5B4FE9]`
    - Render event indicator dots (`w-1.5 h-1.5 rounded-full bg-[#5B4FE9]`) on days with events
    - Dim leading/trailing days with `text-zinc-700`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [x] 3. Implement the CalendarShell and page wiring
  - [x] 3.1 Implement the CalendarShell client component
    - Create `apps/web/components/calendar/calendar-shell.tsx` as a client component
    - Own `selectedTypes: Set<EventType>` state (initially empty = show all)
    - Derive `filteredEvents` using the `filterEvents` utility
    - Render a two-column grid layout (`md:grid-cols-[2fr_1fr]`) with a `gap-6` between columns
    - Pass `filteredEvents` to EventTimeline, all events to MiniCalendar
    - Render FilterBar above both columns in a full-width row
    - _Requirements: 1.1, 1.2, 1.5, 2.4, 2.5_

  - [x] 3.2 Update the CalendarPage server component
    - Rewrite `apps/web/app/calendar/page.tsx` to import `getAllEvents` and pass events to `CalendarShell`
    - Apply dark theme wrapper with `bg-zinc-950 text-white py-10 lg:py-16 min-h-screen`
    - Use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container
    - _Requirements: 1.3, 1.4, 7.1, 7.2, 7.3_

- [x] 4. Checkpoint - Verify base rendering
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Add responsive mobile layout
  - [x] 5.1 Add mobile-responsive styles to CalendarShell
    - Ensure single-column stacking on viewports below 768px: FilterBar, then EventTimeline, then MiniCalendar
    - MiniCalendar should be collapsible or in a scrollable section below EventTimeline on mobile
    - Ensure no horizontal overflow on mobile
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 6. Write property-based tests
  - [ ]\* 6.1 Write property test for filter logic
    - **Property 1: Filter produces correct subset**
    - Test that for any list of events and any non-empty subset of EventType values, the filtered result contains exactly events whose eventType is in the selected set; when selected set is empty, all events pass
    - **Validates: Requirements 2.4, 2.5**

  - [ ]\* 6.2 Write property test for chronological sorting
    - **Property 2: Events are sorted chronologically**
    - Test that for any list of events returned by getAllEvents, each event's date is ≤ the next event's date
    - **Validates: Requirements 3.1**

  - [ ]\* 6.3 Write property test for EventCard rendering
    - **Property 3: Event card renders title and date/time for any event**
    - Test that for any valid Event object (including empty logo, empty discordUrl, empty sponsors), rendering EventCard produces output containing title and date/time text without throwing
    - **Validates: Requirements 4.2, 4.3, 7.2**

  - [ ]\* 6.4 Write property test for calendar grid structure
    - **Property 4: Calendar grid structure and boundary correctness**
    - Test that for any valid year/month, the grid has 7 columns, contains every day 1..lastDay exactly once as current-month cells, and marks all other cells as non-current-month
    - **Validates: Requirements 5.1, 5.5**

  - [ ]\* 6.5 Write property test for calendar heading format
    - **Property 5: Calendar heading format**
    - Test that for any valid year/month, the heading is the full English month name followed by a space and four-digit year
    - **Validates: Requirements 5.2**

  - [ ]\* 6.6 Write property test for event indicator correctness
    - **Property 6: Event indicators match event dates**
    - Test that for any set of events and any month grid, a day cell has hasEvents=true iff at least one event falls on that date
    - **Validates: Requirements 5.3**

- [ ] 7. Write unit tests
  - [ ]\* 7.1 Write unit tests for FilterBar component
    - Test that 7 event-type chips are rendered
    - Test all chips are unselected by default
    - Test chip toggle changes visual state
    - Test chip styling matches dark theme
    - _Requirements: 2.2, 2.3, 2.6_

  - [ ]\* 7.2 Write unit tests for EventCard component
    - Test logo placeholder is 44×44 with rounded shape
    - Test horizontal flex layout
    - Test title and date/time text rendering
    - Test empty logo renders no img element
    - Test empty sponsors renders no sponsors section
    - _Requirements: 4.1, 4.5, 7.4, 7.5_

  - [ ]\* 7.3 Write unit tests for EventTimeline component
    - Test card count matches dataset length
    - Test empty-state message when no events
    - _Requirements: 3.2, 3.4, 7.3_

  - [ ]\* 7.4 Write unit tests for MiniCalendar component
    - Test today's date has highlight class
    - Test event indicator dots on correct days
    - Test leading/trailing days are dimmed
    - _Requirements: 5.3, 5.4, 5.5_

  - [ ]\* 7.5 Write unit tests for CalendarShell layout
    - Test two-column layout on md+ viewport
    - Test FilterBar rendered above columns
    - Test mobile single-column stacking order
    - _Requirements: 1.1, 1.2, 6.1, 6.2_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Pure logic is extracted into `lib/calendar/` utilities so property tests can run without mounting React components
- fast-check is the property-based testing library, integrated with Vitest

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "2.3", "2.4"] },
    { "id": 2, "tasks": ["2.2"] },
    { "id": 3, "tasks": ["3.1"] },
    { "id": 4, "tasks": ["3.2"] },
    { "id": 5, "tasks": ["5.1"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.4", "6.5", "6.6"] },
    { "id": 7, "tasks": ["6.3", "7.1", "7.2", "7.3", "7.4", "7.5"] }
  ]
}
```
