import type { EventColorShare } from "@/lib/calendar/types";

/** Base width of a single-event indicator, as % of the day cell. */
const BASE_WIDTH_PERCENT = 22;
/** Cap so the busy bar never hugs the day cell edges. */
const MAX_WIDTH_PERCENT = 72;

function buildProportionalGradient(shares: EventColorShare[]): string {
  const total = shares.reduce((sum, share) => sum + share.count, 0);
  if (total === 0) return "transparent";
  if (shares.length === 1) return shares[0].color;

  let cursor = 0;
  return `linear-gradient(to right, ${shares
    .map(({ color, count }) => {
      const start = (cursor / total) * 100;
      cursor += count;
      const end = (cursor / total) * 100;
      return `${color} ${start}%, ${color} ${end}%`;
    })
    .join(", ")})`;
}

/**
 * Busy-day indicator: bar width scales with total events; color segments
 * are proportional to each group's share of that day's events.
 */
export function EventDayDot({
  colorShares,
  eventCount,
}: {
  colorShares: EventColorShare[];
  eventCount: number;
}) {
  if (eventCount <= 0 || colorShares.length === 0) {
    return <span className="block h-1.5 w-full" aria-hidden="true" />;
  }

  // Single event: perfect circle
  if (eventCount === 1) {
    return (
      <span
        className="flex h-1.5 w-full items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: colorShares[0].color }}
        />
      </span>
    );
  }

  const widthPercent = Math.min(
    MAX_WIDTH_PERCENT,
    BASE_WIDTH_PERCENT * eventCount,
  );

  return (
    <span
      className="flex h-1.5 w-full items-center justify-center"
      aria-hidden="true"
    >
      <span
        className="h-1.5 rounded-full"
        style={{
          width: `${widthPercent}%`,
          background: buildProportionalGradient(colorShares),
        }}
      />
    </span>
  );
}
