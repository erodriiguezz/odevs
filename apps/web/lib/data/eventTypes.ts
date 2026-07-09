import { EventType } from "@testing-library/react";
import propFromKeys from "./propFromKeys";

const eventTypes: Record<string, { name: EventType, color: string }> = propFromKeys("name", {
  "meetup": { color: "#0085ca" },
  "workshop": { color: "#009b53" },
  "conference": { color: "#f3680f" },
  "hackathon": { color: "#ed324b" },
  "webinar": { color: "#009891" },
  "social": { color: "#ed46a5" },
  "other": { color: "#d89700" },
});

export default eventTypes;