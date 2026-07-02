import type { Event } from '@/lib/types/event'
import { extractStartTime } from '@/lib/calendar/format'
import { getGroupBrandColor } from '@/lib/group-brand-color'
import { EventCard } from '@/app/calendar/_components/event-card'

const dateHeadingClasses =
  'text-base font-semibold text-zinc-600 dark:text-zinc-300'
const timeLabelClasses = 'text-sm font-medium text-zinc-500 dark:text-zinc-400'
const archivedDateHeadingClasses =
  'text-base font-semibold text-zinc-400 dark:text-zinc-500'
const archivedTimeLabelClasses = 'text-sm font-medium text-zinc-400 dark:text-zinc-500'

const DOT_SIZE_PX = 10
const DOT_WRAPPER_SIZE_PX = 24
const DOT_CENTER_PX = DOT_WRAPPER_SIZE_PX / 2
const ITEM_GAP_PX = 32

interface TimelineEventItemProps {
  event: Event
  isHighlighted?: boolean
  isLast?: boolean
  disabled?: boolean
  compact?: boolean
  showDateHeading?: boolean
  dateHeading?: string
  timeLabel: string
  isDateHeading?: boolean
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
      style={{ width: DOT_WRAPPER_SIZE_PX, height: DOT_WRAPPER_SIZE_PX }}
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
  compact = false,
  showDateHeading = false,
  dateHeading,
  timeLabel,
  isDateHeading = false,
}: TimelineEventItemProps) {
  const brandColor = getGroupBrandColor(event.group)
  const headingClasses = disabled ? archivedDateHeadingClasses : dateHeadingClasses
  const labelClasses = disabled
    ? archivedTimeLabelClasses
    : isDateHeading
      ? dateHeadingClasses
      : timeLabelClasses
  const itemGap = compact ? 20 : ITEM_GAP_PX

  return (
    <div className="relative flex gap-4 overflow-visible">
      <div className="relative w-7 shrink-0 self-stretch overflow-visible">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 overflow-visible">
          <TimelineDot
            brandColor={brandColor}
            isHighlighted={isHighlighted}
            disabled={disabled}
          />
        </div>

        {!isLast && (
          <div
            aria-hidden="true"
            className={`absolute left-1/2 w-px -translate-x-1/2 ${
              disabled ? 'bg-zinc-200/70 dark:bg-zinc-800/70' : 'bg-zinc-200 dark:bg-zinc-800'
            }`}
            style={{
              top: DOT_CENTER_PX,
              bottom: -DOT_CENTER_PX,
            }}
          />
        )}
      </div>

      <div
        className="min-w-0 flex-1 overflow-visible"
        style={{ paddingBottom: isLast ? 8 : itemGap }}
      >
        {showDateHeading && dateHeading && (
          <h3 className={`mb-3 min-h-6 leading-6 ${headingClasses}`}>{dateHeading}</h3>
        )}

        {timeLabel && (
          <time
            dateTime={`${event.date}T${extractStartTime(event.time)}`}
            className={`mb-2 block ${compact ? 'min-h-5 text-xs leading-5' : 'min-h-6 leading-6'} ${labelClasses}`}
          >
            {timeLabel}
          </time>
        )}

        <EventCard event={event} disabled={disabled} compact={compact} />
      </div>
    </div>
  )
}
