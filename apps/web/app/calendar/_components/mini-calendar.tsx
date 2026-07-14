'use client'

import type { Event } from '@/lib/types/event'
import { generateCalendarGrid } from '@/lib/functions/grid'
import { formatMonthHeading } from '@/lib/functions/format'

interface MiniCalendarProps {
  events: Event[]
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function MiniCalendar({ events }: MiniCalendarProps) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const heading = formatMonthHeading(year, month)
  const grid = generateCalendarGrid(year, month, events)

  return (
    <div className="bg-background border border-border rounded-xl p-4 theme-trans">
      <h3 className="text-sm font-semibold text-foreground mb-3 theme-trans">{heading}</h3>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Weekday header row */}
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i} className="text-muted-foreground font-medium py-1 theme-trans">
            {label}
          </div>
        ))}

        {/* Day cells */}
        {grid.map((cell, i) => (
          <div
            key={i}
            className={`relative flex flex-col items-center justify-center py-1 rounded-md theme-trans ${
              cell.isToday ? 'ring-2 ring-[#5B4FE9]' : ''
            } ${cell.isCurrentMonth ? 'text-foreground' : 'text-border-glow'}`}
          >
            <span className="text-xs">{cell.date}</span>
            {cell.hasEvents && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />}
          </div>
        ))}
      </div>
    </div>
  )
}
