'use client'

import type { Event } from '@/lib/types/event'
import { generateCalendarGrid } from '@/lib/calendar/grid'
import { formatMonthHeading } from '@/lib/calendar/format'

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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-zinc-950 dark:text-white mb-3">{heading}</h3>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Weekday header row */}
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i} className="text-zinc-400 dark:text-zinc-500 font-medium py-1">
            {label}
          </div>
        ))}

        {/* Day cells */}
        {grid.map((cell, i) => (
          <div
            key={i}
            className={`relative flex flex-col items-center justify-center py-1 rounded-md ${
              cell.isToday ? 'ring-2 ring-[#5B4FE9]' : ''
            } ${cell.isCurrentMonth ? 'text-zinc-900 dark:text-zinc-200' : 'text-zinc-300 dark:text-zinc-700'}`}
          >
            <span className="text-xs">{cell.date}</span>
            {cell.hasEvents && <span className="w-1.5 h-1.5 rounded-full bg-[#5B4FE9] mt-0.5" />}
          </div>
        ))}
      </div>
    </div>
  )
}
