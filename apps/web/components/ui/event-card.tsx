import Markdown, { type Components } from "react-markdown";
import type { Event } from "@/lib/types/event";
import type { SourcePlatform } from "@/lib/types/platform";
import { ArrowUpRightIcon, ClockIcon, MapPinIcon } from "@/components/icons";
import { formatEventCardDate } from "@/lib/calendar/format";
import { formatEventTypeLabel } from "@/lib/data/eventTypes";
import { EventThumbnail } from "@/components/ui/event-thumbnail";

const descriptionMarkdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  a: ({ children, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noreferrer"
      className="text-foreground underline underline-offset-2"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
  h1: ({ children }) => <p className="font-semibold">{children}</p>,
  h2: ({ children }) => <p className="font-semibold">{children}</p>,
  h3: ({ children }) => <p className="font-semibold">{children}</p>,
  h4: ({ children }) => <p className="font-semibold">{children}</p>,
  h5: ({ children }) => <p className="font-semibold">{children}</p>,
  h6: ({ children }) => <p className="font-semibold">{children}</p>,
  blockquote: ({ children }) => <p>{children}</p>,
  img: () => null,
};

export interface EventCardProps {
  event: Event;
  disabled?: boolean;
  thumbnailPosition?: "top" | "side";
}

const platformDisplayName: Record<SourcePlatform, string> = {
  meetup: "Meetup",
  eventbrite: "Eventbrite",
  luma: "Luma",
  discord: "Discord",
  manual: "External",
  other: "External",
};

function CalendarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function EventCard({
  event,
  disabled = false,
  thumbnailPosition = "top",
}: EventCardProps) {
  const registerLabel = platformDisplayName[event.sourcePlatform];
  const isSideThumbnail = thumbnailPosition === "side";
  // "side" cards hide the thumbnail on mobile entirely; it only appears
  // alongside the content, on the right, at sm+.
  const cardClasses = `card-elev flex flex-col overflow-hidden rounded-2xl${
    isSideThumbnail ? " p-5 sm:flex-row sm:items-start sm:gap-4" : ""
  }${disabled ? " pointer-events-none opacity-70 saturate-50" : ""}`;

  const thumbnail = event.thumbnailUrl && (
    <EventThumbnail src={event.thumbnailUrl} isSideThumbnail={isSideThumbnail} />
  );

  return (
    <article aria-disabled={disabled || undefined} className={cardClasses}>
      {!isSideThumbnail && thumbnail}
      <div
        className={
          isSideThumbnail
            ? "flex min-w-0 flex-1 flex-col"
            : "flex flex-1 flex-col p-5"
        }
      >
        <h3 className="font-display text-lg font-semibold text-foreground">
          {event.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {event.group.name}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
            {formatEventTypeLabel(event.eventType)}
          </span>
        </div>

        {event.description && (
          <div className="mt-4 line-clamp-3 text-sm text-muted-foreground">
            <Markdown components={descriptionMarkdownComponents}>
              {event.description}
            </Markdown>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
            {formatEventCardDate(event.date)}
          </span>
          <div className="flex gap-5">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-3.5 w-3.5 shrink-0" />
              {event.time}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
            {event.location}
          </span>
        </div>

        {event.registrationUrl && !disabled && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Register on ${registerLabel}`}
            className="mt-auto inline-flex w-fit items-center gap-1 pt-4 text-sm font-medium text-primary-glow hover:text-foreground"
          >
            Register on {registerLabel}
            <ArrowUpRightIcon />
          </a>
        )}
      </div>
      {isSideThumbnail && thumbnail}
    </article>
  );
}
