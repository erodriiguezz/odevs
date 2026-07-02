const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Returns a heading string in the format "MonthName YYYY".
 * @param year - Four-digit year
 * @param month - 1-indexed month (1 = January, 12 = December)
 */
export function formatMonthHeading(year: number, month: number): string {
  return `${MONTH_NAMES[month - 1]} ${year}`
}

export function extractStartTime(timeStr: string): string {
  const dashIdx = timeStr.indexOf(' - ')
  const start = dashIdx > -1 ? timeStr.slice(0, dashIdx) : timeStr

  return start.replace(/\s+(?:[A-Z]{3,5})$/i, '').trim()
}

export function parseStartTimeMinutes(timeStr: string): number {
  const start = extractStartTime(timeStr)

  const match24 = start.match(/^(\d{1,2}):(\d{2})$/)
  if (match24) {
    return Number.parseInt(match24[1], 10) * 60 + Number.parseInt(match24[2], 10)
  }

  const match12 = start.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (match12) {
    let hours = Number.parseInt(match12[1], 10)
    const minutes = Number.parseInt(match12[2], 10)
    const period = match12[3].toUpperCase()

    if (period === 'PM' && hours !== 12) {
      hours += 12
    }
    if (period === 'AM' && hours === 12) {
      hours = 0
    }

    return hours * 60 + minutes
  }

  return 0
}

export function formatTimelineDateHeading(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${isoDate}T00:00:00`))
  } catch {
    return isoDate
  }
}

export function formatTimelineDateTime(isoDate: string, timeStr: string): string {
  return `${formatTimelineDateHeading(isoDate)} · ${extractStartTime(timeStr)}`
}
