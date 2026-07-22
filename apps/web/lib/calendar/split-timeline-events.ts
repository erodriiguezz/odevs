import type { Event } from '@/lib/types/event'

function startOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function isUpcoming(event: Event, today: Date): boolean {
  return new Date(`${event.date}T00:00:00`) >= today
}

export function splitTimelineEvents(events: Event[], recentPastCount = 2) {
  const today = startOfToday();
  return events.reduce((acc: { upcomingEvents: Event[], archivedEvents: Event[] }, event: Event) => {
    (isUpcoming(event, today) ? acc.upcomingEvents : acc.archivedEvents).push(event);
    return acc;
  }, { upcomingEvents: [], archivedEvents: [] });
}
