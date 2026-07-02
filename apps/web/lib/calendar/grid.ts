import type { Event } from '@/lib/types/event'
import type { DayCell } from './types'

/**
 * Generates a fixed 6×7 (42 cells) calendar grid for a given month.
 * Leading cells are filled from the previous month, trailing cells from the next month.
 *
 * @param year - Four-digit year
 * @param month - 1-indexed month (1 = January, 12 = December)
 * @param events - Array of events to check for day indicators
 * @returns Array of 42 DayCell objects representing the grid
 */
export function generateCalendarGrid(year: number, month: number, events: Event[]): DayCell[] {
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDate = today.getDate()

  // Days in the target month
  const daysInMonth = new Date(year, month, 0).getDate()

  // Day of week for the 1st of the month (0 = Sunday)
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay()

  // Days in the previous month (for leading cells)
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate()

  // Build a set of day numbers that have events in this month
  const eventDays = new Set<number>()
  for (const event of events) {
    const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number)
    if (eventYear === year && eventMonth === month) {
      eventDays.add(eventDay)
    }
  }

  const grid: DayCell[] = []

  // Leading days from previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const date = daysInPrevMonth - firstDayOfWeek + 1 + i
    grid.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false,
    })
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    grid.push({
      date: day,
      isCurrentMonth: true,
      isToday: year === todayYear && month === todayMonth && day === todayDate,
      hasEvents: eventDays.has(day),
    })
  }

  // Trailing days from next month
  const remaining = 42 - grid.length
  for (let day = 1; day <= remaining; day++) {
    grid.push({
      date: day,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false,
    })
  }

  return grid
}
