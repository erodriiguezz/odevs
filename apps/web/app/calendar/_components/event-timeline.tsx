import type { ReactNode } from "react";
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

interface EventTimelineProps {
  events: Event[];
  selectedDate?: string | null;
  onClearDateFilter?: () => void;
  hasCategoryFilters?: boolean;
  onResetFilters?: () => void;
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
}: EventTimelineProps) {
  const isDateFiltered = Boolean(selectedDate);

  const visibleEvents = isDateFiltered
    ? sortEventsByDateTime(events)
    : splitTimelineEvents(events).upcomingEvents;

  if (visibleEvents.length === 0) {
    if (hasCategoryFilters && onResetFilters) {
      return (
        <div className="relative max-w-full overflow-visible pb-8">
          <EmptyFilterCard
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
            onReset={onResetFilters}
          />
        </div>
      );
    }

    if (isDateFiltered && selectedDate && onClearDateFilter) {
      return (
        <div className="relative max-w-full overflow-visible pb-8">
          <EmptyFilterCard
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
            onReset={onClearDateFilter}
          />
        </div>
      );
    }

    return (
      <div className="relative max-w-full overflow-visible pb-8">
        <div
          role="status"
          className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-12"
        >
          <p className="text-sm text-muted-foreground">No events to show</p>
          <p className="mt-1 text-xs text-light-foreground">
            Check back later for upcoming events
          </p>
        </div>
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

function EmptyFilterCard({
  title,
  description,
  onReset,
}: {
  title: string;
  description: ReactNode;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      className="card-elev flex flex-col items-start gap-4 rounded-2xl px-5 py-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="font-display text-base font-semibold text-foreground">
          {title}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
      >
        Reset
      </button>
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
