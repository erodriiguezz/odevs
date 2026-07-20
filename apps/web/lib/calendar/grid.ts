import type { Event } from '@/lib/types/event'
import type { DayCell, EventColorShare } from './types'
import { getGroupBrandColor } from '@/lib/group-brand-color'

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

  // day -> ordered group color shares (insertion order = first appearance)
  const sharesByDay = new Map<number, Map<string, number>>()

  for (const event of events) {
    const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number)
    if (eventYear === year && eventMonth === month) {
      const brandColor = getGroupBrandColor(event.group)
      const dayShares = sharesByDay.get(eventDay) ?? new Map<string, number>()
      dayShares.set(brandColor, (dayShares.get(brandColor) ?? 0) + 1)
      sharesByDay.set(eventDay, dayShares)
    }
  }

  function sharesForDay(day: number): EventColorShare[] {
    const dayShares = sharesByDay.get(day)
    if (!dayShares) return []
    return Array.from(dayShares.entries()).map(([color, count]) => ({ color, count }))
  }

  const grid: DayCell[] = []

  function toIsoDate(y: number, m: number, d: number): string {
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }

  function emptyCell(date: number, isoDate: string): DayCell {
    return {
      date,
      isoDate,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false,
      eventCount: 0,
      eventColorShares: [],
    }
  }

  // Leading days from previous month
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  for (let i = 0; i < firstDayOfWeek; i++) {
    const date = daysInPrevMonth - firstDayOfWeek + 1 + i
    grid.push(emptyCell(date, toIsoDate(prevYear, prevMonth, date)))
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const eventColorShares = sharesForDay(day)
    const eventCount = eventColorShares.reduce((sum, share) => sum + share.count, 0)
    grid.push({
      date: day,
      isoDate: toIsoDate(year, month, day),
      isCurrentMonth: true,
      isToday: year === todayYear && month === todayMonth && day === todayDate,
      hasEvents: eventCount > 0,
      eventCount,
      eventColorShares,
    })
  }

  // Trailing days from next month
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  const remaining = 42 - grid.length
  for (let day = 1; day <= remaining; day++) {
    grid.push(emptyCell(day, toIsoDate(nextYear, nextMonth, day)))
  }

  return grid
}
