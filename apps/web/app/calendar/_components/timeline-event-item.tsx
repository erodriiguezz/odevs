import type { Event } from '@/lib/types/event'
import { getGroupBrandColor } from '@/lib/group-brand-color'
import { EventCard } from '@/components/ui/event-card'

const DOT_SIZE_PX = 10
const DOT_WRAPPER_SIZE_PX = 24
const DOT_CENTER_PX = DOT_WRAPPER_SIZE_PX / 2
const ITEM_GAP_PX = 32
const DATE_HEADING_BLOCK_CLASSES = 'mb-3 min-h-6 leading-6 shrink-0'

interface TimelineEventItemProps {
  event: Event
  isHighlighted?: boolean
  isLast?: boolean
  disabled?: boolean
  showDateHeading?: boolean
  dateHeading?: string
}

function TimelineDot({
  brandColor,
  isHighlighted,
  disabled,
}: {
  brandColor: string
  isHighlighted: boolean
  disabled: boolean
}) {
  const dotColor = disabled ? `${brandColor}80` : brandColor

  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-visible"
      style={{ width: DOT_SIZE_PX, height: DOT_SIZE_PX }}
    >
      {isHighlighted && (
        <span
          aria-hidden="true"
          className="timeline-dot-live-pulse absolute rounded-full"
          style={
            {
              '--dot-brand-color': brandColor,
              width: DOT_SIZE_PX,
              height: DOT_SIZE_PX,
            } as React.CSSProperties
          }
        />
      )}
      <span
        aria-hidden="true"
        className="relative z-10 rounded-full"
        style={{
          width: DOT_SIZE_PX,
          height: DOT_SIZE_PX,
          backgroundColor: dotColor,
        }}
      />
    </div>
  )
}

export function TimelineEventItem({
  event,
  isHighlighted = false,
  isLast = false,
  disabled = false,
  showDateHeading = false,
  dateHeading,
}: TimelineEventItemProps) {
  const brandColor = getGroupBrandColor(event.group)

  return (
    <div
      className="relative flex gap-2 overflow-visible md:gap-4"
      style={{ paddingBottom: isLast ? 8 : ITEM_GAP_PX }}
    >
      <div className="relative w-7 shrink-0">
        {showDateHeading && <div aria-hidden="true" className={DATE_HEADING_BLOCK_CLASSES} />}

        <div
          className="relative z-10 flex items-center justify-center rounded-full border border-border bg-background"
          style={{ width: DOT_WRAPPER_SIZE_PX, height: DOT_WRAPPER_SIZE_PX }}
        >
          <TimelineDot
            brandColor={brandColor}
            isHighlighted={isHighlighted}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="min-w-0 flex-1 overflow-visible">
        {showDateHeading && dateHeading && (
          <h3 className={`${DATE_HEADING_BLOCK_CLASSES} font-display text-lg font-semibold text-foreground`}>{dateHeading}</h3>
        )}

        <EventCard event={event} disabled={disabled} thumbnailPosition="side" />
      </div>
    </div>
  )
}

export const TIMELINE_RAIL_CENTER_PX = DOT_CENTER_PX
