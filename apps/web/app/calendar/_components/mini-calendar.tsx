import type { Event } from "@/lib/types/event";
import { generateCalendarGrid } from "@/lib/calendar/grid";
import { formatMonthHeading } from "@/lib/calendar/format";
import { EventDayDot } from "@/app/calendar/_components/event-day-dot";

interface MiniCalendarProps {
  month: Date;
  events: Event[];
  selectedDate: string | null;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onSelectDate: (isoDate: string) => void;
}

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function MiniCalendar({
  month,
  events,
  selectedDate,
  onPrev,
  onNext,
  onToday,
  onSelectDate,
}: MiniCalendarProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth() + 1;
  const heading = formatMonthHeading(year, monthIndex);
  const grid = generateCalendarGrid(year, monthIndex, events);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div className="font-display text-xs font-semibold md:text-sm">
          {heading}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous month"
            className="grid h-6 w-6 cursor-pointer place-items-center rounded-md border border-border hover:bg-surface md:h-7 md:w-7"
          >
            <ChevronLeftIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onToday}
            className="h-6 cursor-pointer rounded-md border border-border px-2 text-[10px] font-medium text-muted-foreground hover:bg-surface hover:text-foreground md:h-7 md:text-xs"
          >
            Today
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next month"
            className="grid h-6 w-6 cursor-pointer place-items-center rounded-md border border-border hover:bg-surface md:h-7 md:w-7"
          >
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-y-0.5 text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:mt-4 md:gap-y-1 md:text-[10px]">
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i}>{label}</div>
        ))}
      </div>

      <div className="mt-0.5 grid grid-cols-7 gap-y-0.5 text-center text-xs md:mt-1 md:gap-y-1 md:text-sm">
        {grid.map((cell, i) => {
          const isSelected =
            cell.isoDate != null && cell.isoDate === selectedDate;
          const canSelect = cell.isoDate != null;

          return (
            <button
              key={i}
              type="button"
              disabled={!canSelect}
              onClick={() => {
                if (cell.isoDate) onSelectDate(cell.isoDate);
              }}
              aria-pressed={isSelected}
              aria-label={
                cell.isoDate
                  ? `Show events on ${cell.isoDate}`
                  : undefined
              }
              className={`flex flex-col items-center gap-0.5 rounded-md px-0.5 py-1 transition-colors md:py-1.5 ${
                cell.isCurrentMonth
                  ? "text-foreground"
                  : "text-muted-foreground/40"
              } ${cell.isToday ? "font-semibold text-primary-glow" : ""} ${
                isSelected
                  ? "cursor-pointer bg-primary/15 text-foreground"
                  : canSelect
                    ? "cursor-pointer hover:bg-surface"
                    : "cursor-default"
              }`}
            >
              <span className="leading-none">{cell.date}</span>
              <EventDayDot
                colorShares={cell.eventColorShares}
                eventCount={cell.eventCount}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
