# Requirements Document

## Introduction

The Calendar Page Shell provides the Orlando Devs community website with a dedicated page for browsing upcoming and past events. The page displays an event timeline alongside a mini calendar for month-based navigation. A filter bar allows users to narrow events by type or group. The layout follows the site's existing dark theme (zinc palette) and adapts responsively for mobile devices.

## Glossary

- **Calendar_Page**: The Next.js page component rendered at the `/calendar` route that composes the filter bar, event timeline, and mini calendar into a cohesive layout.
- **Filter_Bar**: A horizontal bar at the top of the Calendar_Page that contains controls for filtering events by event type or community group.
- **Event_Timeline**: A vertically stacked list of Event_Cards displayed on the left side of the Calendar_Page (or full-width on mobile), ordered chronologically.
- **Event_Card**: A discrete visual card within the Event_Timeline that displays an event's group logo, title, and date/time.
- **Mini_Calendar**: A compact month-view calendar displayed on the right side of the Calendar_Page (or hidden/collapsed on mobile) that shows day-level event indicators.
- **Event_Indicator**: A small visual dot rendered on a Mini_Calendar day cell to denote that one or more events occur on that date.
- **Event**: A data object containing id, title, description, date, time, location, eventType, group, tags, and featured fields as defined in the existing Event type.
- **Placeholder_Data**: The static event dataset defined in `apps/web/lib/data/events.ts` used to render the page before a live data source is connected.

## Requirements

### Requirement 1: Page Layout Structure

**User Story:** As a community member, I want the calendar page to display events in an organized two-column layout, so that I can quickly scan upcoming events and navigate by date.

#### Acceptance Criteria

1. WHILE the viewport width is 768px or wider, THE Calendar_Page SHALL render a two-column layout with the Event_Timeline occupying approximately two-thirds of the row width in the left column and the Mini_Calendar occupying approximately one-third in the right column.
2. THE Calendar_Page SHALL render the Filter_Bar in a full-width row above both the Event_Timeline and Mini_Calendar columns.
3. THE Calendar_Page SHALL apply the site-wide dark theme by using the existing CSS custom properties (--background, --foreground) and the zinc color palette for surface and border colors.
4. THE Calendar_Page SHALL use the Geist font family via the existing --font-geist-sans CSS variable consistent with the rest of the site.
5. WHILE the viewport width is 768px or wider, THE Calendar_Page SHALL render a visible gap of at least 16px between the Event_Timeline column and the Mini_Calendar column.

### Requirement 2: Filter Bar

**User Story:** As a community member, I want a filter bar at the top of the calendar page, so that I can narrow the displayed events by criteria such as event type.

#### Acceptance Criteria

1. THE Filter_Bar SHALL be displayed at the top of the Calendar_Page above the event content area.
2. THE Filter_Bar SHALL contain one filter control for each event type category (meetup, workshop, conference, hackathon, webinar, social, other).
3. THE Filter_Bar SHALL render all filter controls in the unselected state by default so that events of all types are displayed.
4. WHEN the user activates a filter control, THE Filter_Bar SHALL toggle that control between selected and unselected states, and the Event_Timeline SHALL display only events whose eventType matches at least one selected filter.
5. IF no filter control is in the selected state, THEN THE Event_Timeline SHALL display events of all types.
6. THE Filter_Bar SHALL style each filter control using zinc borders, dark backgrounds, and light text consistent with the site's dark theme.

### Requirement 3: Event Timeline

**User Story:** As a community member, I want to see an event timeline listing event cards, so that I can browse events in chronological order.

#### Acceptance Criteria

1. THE Event_Timeline SHALL display Event_Cards in chronological order sorted by date ascending, and by time ascending for Events sharing the same date.
2. WHEN Placeholder_Data is loaded, THE Event_Timeline SHALL render one Event_Card for each Event in the dataset.
3. WHILE the viewport width is 768px or wider, THE Event_Timeline SHALL occupy the left column of the two-column layout.
4. IF the dataset contains zero Events, THEN THE Event_Timeline SHALL display an empty-state message indicating that no events are available.

### Requirement 4: Event Card Display

**User Story:** As a community member, I want each event card to show the group logo, event title, and date/time, so that I can identify events at a glance.

#### Acceptance Criteria

1. THE Event_Card SHALL display a square placeholder element (approximately 44x44 pixels) with a rounded shape and a subtle background color representing the group logo area.
2. THE Event_Card SHALL display the event title as the primary text on a single line.
3. THE Event_Card SHALL display the event date and time as secondary text below the title.
4. THE Event_Card SHALL use a dark card style with a 1px border using the zinc-800 color and a zinc-900/zinc-950 background, consistent with the hero placeholder cards on the homepage.
5. THE Event_Card SHALL arrange the logo placeholder on the left and the title/date text stacked vertically on the right within a horizontal flex layout.

### Requirement 5: Mini Calendar

**User Story:** As a community member, I want a mini calendar showing the current month with event indicators, so that I can see which days have scheduled events.

#### Acceptance Criteria

1. THE Mini_Calendar SHALL display a month grid for the current month with day numbers arranged in a 7-column week layout starting with Sunday as the first column.
2. THE Mini_Calendar SHALL display the current month and year as a heading in full month name and numeric year format (e.g., "June 2026").
3. WHEN one or more Events exist on a given date, THE Mini_Calendar SHALL render an Event_Indicator on that day cell.
4. THE Mini_Calendar SHALL visually distinguish today's date from other day cells using a highlight style distinct from the Event_Indicator.
5. THE Mini_Calendar SHALL display leading and trailing days from adjacent months as disabled cells that are visually dimmed relative to current-month day cells.
6. THE Mini_Calendar SHALL occupy the right column of the two-column layout on viewports 768px and wider.
7. THE Mini_Calendar SHALL use styling consistent with the site's dark theme (zinc backgrounds, light text, subtle borders).

### Requirement 6: Responsive Mobile Layout

**User Story:** As a mobile user, I want the calendar page to adapt to smaller screens, so that I can browse events comfortably on my phone.

#### Acceptance Criteria

1. WHEN the viewport width is below 768px, THE Calendar_Page SHALL stack content vertically in a single-column layout in the following order from top to bottom: Filter_Bar, Event_Timeline, Mini_Calendar.
2. WHEN the viewport width is below 768px, THE Filter_Bar SHALL be rendered above the Event_Timeline and Mini_Calendar without being hidden or obscured by other page elements.
3. WHEN the viewport width is below 768px, THE Mini_Calendar SHALL be rendered below the Event_Timeline as a collapsible or scrollable section that does not push the Event_Timeline out of the initial viewport.
4. WHEN the viewport width is below 768px, THE Calendar_Page SHALL render all content within the viewport width without requiring horizontal scrolling.

### Requirement 7: Placeholder Data Rendering

**User Story:** As a developer, I want the calendar page to render using the existing static event data, so that I can validate the layout before connecting a live data source.

#### Acceptance Criteria

1. THE Calendar_Page SHALL import events using the data access functions from `apps/web/lib/data/get-events.ts` and render one Event_Card per event returned.
2. THE Calendar_Page SHALL render without runtime errors when the Placeholder_Data contains events with empty string values for `group.logo` and `group.discordUrl`, and empty arrays for `sponsors`.
3. WHEN the Placeholder_Data is loaded, THE Event_Timeline SHALL display a number of Event_Cards equal to the number of events returned by the data access function used.
4. WHEN an event's `group.logo` field is an empty string, THE Calendar_Page SHALL render the Event_Card without displaying a logo image element for that group.
5. WHEN an event's `sponsors` array is empty, THE Calendar_Page SHALL render the Event_Card without displaying a sponsors section for that event.
