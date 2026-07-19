export interface EventColorShare {
  color: string
  count: number
}

export interface DayCell {
  date: number
  /** YYYY-MM-DD for current-month cells; undefined for leading/trailing filler days */
  isoDate?: string
  isCurrentMonth: boolean
  isToday: boolean
  hasEvents: boolean
  eventCount: number
  /** Group colors weighted by how many events each group has that day */
  eventColorShares: EventColorShare[]
}
