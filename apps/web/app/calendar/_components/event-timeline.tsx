import type { Event } from "@/lib/types/event";
import {
  getTodayEventIds,
  groupEventsByDate,
  sortEventsByDateTime,
} from "@/lib/calendar/group-events";
import { formatTimelineDateHeading } from "@/lib/calendar/format";
import { splitTimelineEvents } from "@/lib/calendar/split-timeline-events";
import {
  TIMELINE_RAIL_CENTER_PX,
  TimelineEventItem,
} from "@/app/calendar/_components/timeline-event-item";
import { EmptyState } from "@/components/ui/empty-state";

interface EventTimelineProps {
  events: Event[];
  selectedDate?: string | null;
  onClearDateFilter?: () => void;
  hasCategoryFilters?: boolean;
  onResetFilters?: () => void;
  pastEvents?: Event[];
}

interface TimelineRow {
  event: Event;
  showDateHeading: boolean;
  dateHeading: string;
}

function buildTimelineRows(
  groups: ReturnType<typeof groupEventsByDate>,
): TimelineRow[] {
  return groups.flatMap((group) =>
    group.events.map((event, index) => ({
      event,
      showDateHeading: index === 0,
      dateHeading: group.dateHeading,
    })),
  );
}

function UpcomingTimeline({
  rows,
  todayEventIds,
}: {
  rows: TimelineRow[];
  todayEventIds: Set<string>;
}) {
  const lastIndex = rows.length - 1;

  return (
    <div className="relative overflow-visible">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-border"
        style={{ left: TIMELINE_RAIL_CENTER_PX }}
      />

      {rows.map((row, index) => (
        <TimelineEventItem
          key={row.event.id}
          event={row.event}
          isHighlighted={todayEventIds.has(row.event.id)}
          isLast={index === lastIndex}
          showDateHeading={row.showDateHeading}
          dateHeading={row.dateHeading}
        />
      ))}
    </div>
  );
}

export function EventTimeline({
  events,
  selectedDate = null,
  onClearDateFilter,
  hasCategoryFilters = false,
  onResetFilters,
  pastEvents = [],
}: EventTimelineProps) {
  return (
    <>
      <UpcomingSection
        events={events}
        selectedDate={selectedDate}
        onClearDateFilter={onClearDateFilter}
        hasCategoryFilters={hasCategoryFilters}
        onResetFilters={onResetFilters}
      />
      {pastEvents.length > 0 && (
        <PastEventsSection
          events={pastEvents}
          disabled={Boolean(selectedDate)}
        />
      )}
    </>
  );
}

function UpcomingSection({
  events,
  selectedDate = null,
  onClearDateFilter,
  hasCategoryFilters = false,
  onResetFilters,
}: Omit<EventTimelineProps, "pastEvents">) {
  const isDateFiltered = Boolean(selectedDate);

  const visibleEvents = isDateFiltered
    ? sortEventsByDateTime(events)
    : splitTimelineEvents(events).upcomingEvents;

  if (visibleEvents.length === 0) {
    if (hasCategoryFilters && onResetFilters) {
      return (
        <div className="relative max-w-full overflow-visible pb-8">
          <EmptyState
            title="No matches"
            description={
              isDateFiltered && selectedDate ? (
                <>
                  No events on{" "}
                  <span className="text-foreground">
                    {formatTimelineDateHeading(selectedDate)}
                  </span>{" "}
                  match your filters.
                </>
              ) : (
                "No upcoming events match your filters."
              )
            }
            action={{ label: "Reset", onClick: onResetFilters }}
          />
        </div>
      );
    }

    if (isDateFiltered && selectedDate && onClearDateFilter) {
      return (
        <div className="relative max-w-full overflow-visible pb-8">
          <EmptyState
            title="Nothing scheduled"
            description={
              <>
                No community events on{" "}
                <span className="text-foreground">
                  {formatTimelineDateHeading(selectedDate)}
                </span>
                .
              </>
            }
            action={{ label: "See all upcoming events", onClick: onClearDateFilter }}
          />
        </div>
      );
    }

    return (
      <div className="relative max-w-full overflow-visible pb-8">
        <EmptyState
          title="No events to show"
          description="Check back later for upcoming events."
        />
      </div>
    );
  }

  const groups = groupEventsByDate(visibleEvents);
  const todayEventIds = getTodayEventIds(visibleEvents);
  const timelineRows = buildTimelineRows(groups);

  return (
    <div className="relative max-w-full overflow-visible pb-8">
      <div className="flex flex-col overflow-visible">
        <UpcomingTimeline rows={timelineRows} todayEventIds={todayEventIds} />
      </div>

      {isDateFiltered && selectedDate && onClearDateFilter && (
        <DateFilterBanner
          selectedDate={selectedDate}
          onClear={onClearDateFilter}
        />
      )}
    </div>
  );
}

function PastEventsSection({
  events,
  disabled,
}: {
  events: Event[];
  disabled: boolean;
}) {
  const lastIndex = events.length - 1;

  return (
    <div className="mt-10 max-w-full">
      <h3 className="font-display text-lg font-semibold text-muted-foreground">
        Past events
      </h3>
      <div className="relative mt-4 overflow-visible">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-px bg-border"
          style={{ left: TIMELINE_RAIL_CENTER_PX }}
        />

        {events.map((event, index) => (
          <TimelineEventItem
            key={event.id}
            event={event}
            isLast={index === lastIndex}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

function DateFilterBanner({
  selectedDate,
  onClear,
}: {
  selectedDate: string;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-foreground">
        Showing events for{" "}
        <span className="font-medium">
          {formatTimelineDateHeading(selectedDate)}
        </span>
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex cursor-pointer items-center self-start text-sm font-medium text-primary-glow hover:text-foreground sm:self-auto"
      >
        See all upcoming events
      </button>
    </div>
  );
}
