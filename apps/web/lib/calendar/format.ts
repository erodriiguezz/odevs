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
