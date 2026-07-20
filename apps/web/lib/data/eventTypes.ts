import type { EventType } from "@/lib/types/event";
import propFromKeys from "./propFromKeys";

const eventTypes: Record<EventType, { name: EventType; color: string }> =
  propFromKeys("name", {
    meetup: { color: "#0085ca" },
    workshop: { color: "#009b53" },
    conference: { color: "#f3680f" },
    hackathon: { color: "#ed324b" },
    webinar: { color: "#009891" },
    social: { color: "#ed46a5" },
    other: { color: "#d89700" },
  });

export function formatEventTypeLabel(eventType: EventType): string {
  return eventType.charAt(0).toUpperCase() + eventType.slice(1);
}

export const EVENT_TYPE_OPTIONS = (
  Object.keys(eventTypes) as EventType[]
).map((name) => ({
  value: name,
  label: formatEventTypeLabel(name),
}));

export default eventTypes;
