# Requirements Document

## Introduction

The Event Card Component is a reusable UI component that serves as the primary way users discover events throughout the application. It presents key event details (title, description, date, time, group, type, sponsors, and registration link) in a visually appealing, accessible, and responsive format. The component will be used across multiple surfaces including the Homepage Featured Events section, Calendar Timeline, and future Search Results and Group Pages.

The existing `EventCard` component at `apps/web/components/calendar/event-card.tsx` currently displays minimal information (title, date/time, sponsors). This feature significantly enhances it to include event imagery, descriptions, community group branding, event format type, and a registration call-to-action.

## Glossary

- **Event_Card**: The React component that renders a single event's details in a card layout
- **Event**: The data object representing a community event, containing title, description, date, time, location, type, group, sponsors, tags, and registration information
- **Community_Group**: An organization that hosts events, identified by name, logo, and brand color
- **Event_Format**: The venue format of an event — one of "In-Person", "Virtual", or "Hybrid" — indicating how attendees participate
- **Source_Platform**: The external registration platform where the event is hosted (Meetup, Eventbrite, Luma, Discord, or other)
- **Sponsor**: An organization that financially supports an event, represented by a name, URL, and logo
- **Registration_CTA**: The call-to-action button that links users to the external registration page for an event
- **Thumbnail**: An optional banner image displayed at the top of the Event_Card representing the event visually
- **Fallback_Placeholder**: A visual element displayed when a Thumbnail or Sponsor logo is not available

## Requirements

### Requirement 1: Display Core Event Information

**User Story:** As a user browsing events, I want to see the essential details of an event at a glance, so that I can quickly decide whether an event interests me.

#### Acceptance Criteria

1. THE Event_Card SHALL display the Event title as a semantic heading element (e.g., h3) that is the highest-level heading within the card
2. THE Event_Card SHALL display the Event description truncated to a maximum of 3 lines of visible text, with a trailing ellipsis when the full text exceeds 3 lines
3. THE Event_Card SHALL display the Event date in the format "Weekday, Month Day, Year" (e.g., "Wednesday, January 15, 2025")
4. THE Event_Card SHALL display the Event start time in 12-hour format with AM/PM indicator (e.g., "7:00 PM")
5. THE Event_Card SHALL display the Community_Group name associated with the Event
6. IF the Event description is empty or not provided, THEN THE Event_Card SHALL omit the description area without affecting the layout of other displayed fields

### Requirement 2: Display Event Format Type

**User Story:** As a user, I want to know whether an event is in-person, virtual, or hybrid, so that I can decide if the event logistics work for me.

#### Acceptance Criteria

1. THE Event_Card SHALL display the Event_Format as a visible badge or label that is visually distinct from the event title and description text
2. THE Event_Card SHALL display one of the following Event_Format values: "In-Person", "Virtual", or "Hybrid"
3. IF the Event_Format value is not provided, THEN THE Event_Card SHALL not render the format badge or label

### Requirement 3: Display Event Thumbnail

**User Story:** As a user, I want to see a visual image representing an event, so that the card is visually engaging and provides context.

#### Acceptance Criteria

1. WHEN a Thumbnail image URL is provided, THE Event_Card SHALL render the image at the top of the card spanning the full width of the card
2. WHEN a Thumbnail image URL is not provided, THE Event_Card SHALL display a Fallback_Placeholder instead of a broken image
3. IF a Thumbnail image URL is provided but the image fails to load, THEN THE Event_Card SHALL display the Fallback_Placeholder instead of a broken image
4. THE Event_Card SHALL render the Thumbnail at a fixed 16:9 aspect ratio using CSS object-fit to avoid image distortion
5. WHEN a Thumbnail image is rendered, THE Event_Card SHALL provide an accessible alt attribute that includes the Event title

### Requirement 4: Display Sponsor Information

**User Story:** As a user, I want to see which organizations sponsor an event, so that I know who supports the community.

#### Acceptance Criteria

1. WHEN one or more Sponsors are associated with the Event, THE Event_Card SHALL display a "Sponsored by" section
2. WHEN a Sponsor has a logo image available, THE Event_Card SHALL display the Sponsor logo with a maximum height of 24px and proportional width
3. WHEN a Sponsor does not have a logo image available, THE Event_Card SHALL display the Sponsor name as text
4. WHEN no Sponsors are associated with the Event, THE Event_Card SHALL omit the "Sponsored by" section entirely
5. WHEN a Sponsor has a URL, THE Sponsor logo or name SHALL be rendered as a link that opens in a new tab with rel="noopener noreferrer"
6. THE Sponsor logo images SHALL include an accessible alt attribute containing the Sponsor name

### Requirement 5: Registration Call-to-Action

**User Story:** As a user, I want to register for an event directly from the card, so that I can act immediately without extra navigation.

#### Acceptance Criteria

1. WHEN the Event has a non-empty registrationUrl, THE Event_Card SHALL display a Registration_CTA button with a visible label that includes the text "Register"
2. WHEN a user activates the Registration_CTA, THE Event_Card SHALL open the external registration URL in a new browser tab
3. IF the Event does not have a registrationUrl or the registrationUrl is empty, THEN THE Event_Card SHALL omit the Registration_CTA button entirely
4. WHEN the Event has a non-empty registrationUrl, THE Event_Card SHALL display the Source_Platform name adjacent to the Registration_CTA to indicate where registration occurs, using the platform display name (e.g., "Meetup", "Eventbrite", "Luma", "Discord") or "External" for platform values of "manual" or "other"
5. THE Registration_CTA link element SHALL include rel="noopener noreferrer" for security
6. WHILE the viewport width is at or above 768px, THE Registration_CTA SHALL be hidden by default and SHALL animate into view when the user hovers over the Event_Card, using a slide-up or fade-in transition to create visual movement
7. WHILE the viewport width is below 768px, THE Registration_CTA SHALL always be visible without requiring hover interaction

### Requirement 6: Responsive Layout

**User Story:** As a user on any device, I want the event card to display correctly, so that I have a consistent experience on desktop and mobile.

#### Acceptance Criteria

1. THE Event_Card SHALL adapt its layout to viewport widths ranging from 320px to 1440px without horizontal scrolling
2. WHILE the viewport width is below 768px, THE Event_Card SHALL use a single-column vertical layout with content stacked top to bottom
3. THE Event_Card SHALL maintain a minimum font size of 14px for body text and a minimum tap target size of 44x44 CSS pixels for all interactive elements on viewports below 768px
4. THE Event_Card SHALL not cause horizontal overflow on its parent container at any supported viewport width

### Requirement 7: Keyboard Accessibility and Focus Management

**User Story:** As a user navigating with a keyboard or assistive technology, I want to interact with the event card, so that I can access all functionality without a mouse.

#### Acceptance Criteria

1. THE Event_Card SHALL allow navigation using the Tab key to reach all interactive elements (Registration_CTA, Sponsor links) in a logical reading order (top to bottom, left to right)
2. WHEN an interactive element within the Event_Card receives focus, THE Event_Card SHALL display a visible focus indicator with a minimum outline or border of 2px
3. THE Event_Card SHALL use semantic HTML elements — an article element as the card container, a heading element (h3) for the title, and anchor elements for links — to convey card structure to assistive technologies
4. THE Registration_CTA link SHALL include an accessible name in the format "Register on {Source_Platform}" (e.g., "Register on Meetup") so screen readers announce the destination

### Requirement 8: Hover and Focus Visual States

**User Story:** As a user, I want clear visual feedback when I hover over or focus on the event card, so that I understand which elements are interactive.

#### Acceptance Criteria

1. WHEN a user hovers over the Event_Card, THE Event_Card SHALL display a hover state that is visually distinguishable from the resting state through a change in at least one of the following properties: box-shadow, border color, or background color
2. WHEN a user hovers over the Event_Card on desktop (viewport at or above 768px), THE Event_Card SHALL animate the Registration_CTA into view using a transition (e.g., slide-up, fade-in, or scale) to create visual movement on the page
3. WHEN a user hovers over the Registration_CTA, THE Registration_CTA SHALL display a hover state that is visually distinguishable from its resting state through a change in at least one of the following properties: background color, text color, or border color
4. WHEN an interactive element within the Event_Card receives keyboard focus, THE Event_Card SHALL display a focus indicator with a minimum outline or border of 2px that meets WCAG 2.1 AA Success Criterion 2.4.7 (Focus Visible)
5. WHEN a user hovers over a Sponsor link, THE Sponsor link SHALL display a hover state that is visually distinguishable from its resting state
6. WHILE the user has enabled a reduced-motion preference, THE Event_Card SHALL apply hover and focus state changes without animated transitions and SHALL show the Registration_CTA statically
7. THE Event_Card SHALL complete all hover and focus visual transitions within 200ms

### Requirement 9: Text Truncation and Overflow Handling

**User Story:** As a user, I want long event titles and descriptions to be handled gracefully, so that the card layout remains consistent regardless of content length.

#### Acceptance Criteria

1. WHEN the Event title exceeds the available width, THE Event_Card SHALL truncate the title with an ellipsis after a maximum of 2 lines
2. WHEN the Event description exceeds 3 lines of visible text, THE Event_Card SHALL truncate the description with an ellipsis
3. THE Event_Card SHALL constrain all text content within the card boundaries such that no text extends beyond the card edges or causes horizontal scrolling of the card or its parent container
4. WHEN the Event title or Event description is truncated, THE Event_Card SHALL preserve the full text in the underlying DOM so that assistive technologies can access the complete content
5. THE Event_Card SHALL maintain a consistent card height per row regardless of the length of the title or description content

### Requirement 10: Reusable Component Interface

**User Story:** As a developer, I want the event card to accept event data through props, so that I can reuse the component across multiple pages without modification.

#### Acceptance Criteria

1. THE Event_Card SHALL accept an Event data object as a required prop
2. THE Event_Card SHALL accept an optional Event_Format value as a prop with allowed values "In-Person", "Virtual", or "Hybrid"
3. THE Event_Card SHALL accept an optional Thumbnail URL as a prop of type string
4. WHEN only the required Event prop is provided and optional props are absent, THE Event_Card SHALL render without runtime errors, display all Event information as specified in Requirements 1, 4, and 5, omit the Event_Format badge, and display the Fallback_Placeholder in place of the Thumbnail
5. IF an optional prop is provided, THEN THE Event_Card SHALL use the provided value to render the corresponding visual element as specified in Requirement 2 or 3
