import type { Event } from "@/lib/types/event";
import {
  getTodayEventIds,
  groupEventsByDate,
  sortEventsByDateTime,
} from "@/lib/calendar/group-events";
import { formatTimelineDateHeading } from "@/lib/calendar/format";
import {
  isPastDate,
  splitTimelineEvents,
} from "@/lib/calendar/split-timeline-events";
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

function PillActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
    >
      {label}
    </button>
  );
}

function SeeAllUpcomingEventsButton({ onClick }: { onClick: () => void }) {
  return <PillActionButton label="See all upcoming events" onClick={onClick} />;
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
  disabled = false,
}: {
  rows: TimelineRow[];
  todayEventIds: Set<string>;
  disabled?: boolean;
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
          disabled={disabled}
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
  const isPastSelectedDate = selectedDate !== null && isPastDate(selectedDate);

  return (
    <>
      <UpcomingSection
        events={events}
        selectedDate={selectedDate}
        onClearDateFilter={onClearDateFilter}
        hasCategoryFilters={hasCategoryFilters}
        onResetFilters={onResetFilters}
        isPastSelectedDate={isPastSelectedDate}
      />
      {pastEvents.length > 0 && !isPastSelectedDate && (
        <PastEventsSection events={pastEvents} disabled />
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
  isPastSelectedDate,
}: Omit<EventTimelineProps, "pastEvents"> & { isPastSelectedDate: boolean }) {
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
            action={<PillActionButton label="Reset" onClick={onResetFilters} />}
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
            action={<SeeAllUpcomingEventsButton onClick={onClearDateFilter} />}
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
        <UpcomingTimeline
          rows={timelineRows}
          todayEventIds={todayEventIds}
          disabled={isPastSelectedDate}
        />
      </div>

      {isDateFiltered && selectedDate && onClearDateFilter && (
        <DateFilterBanner
          selectedDate={selectedDate}
          onClear={onClearDateFilter}
          isPastSelectedDate={isPastSelectedDate}
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
        Recent events
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
  isPastSelectedDate,
}: {
  selectedDate: string;
  onClear: () => void;
  isPastSelectedDate: boolean;
}) {
  return (
    <div className="mt-6 flex flex-col gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {isPastSelectedDate ? "Showing past events on" : "Showing events for"}{" "}
        <span className="text-foreground">
          {formatTimelineDateHeading(selectedDate)}
        </span>
        .
      </p>
      <div className="self-start sm:self-auto">
        <SeeAllUpcomingEventsButton onClick={onClear} />
      </div>
    </div>
  );
}
