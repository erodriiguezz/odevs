"use client";

import { useMemo, useState } from "react";
import type { Event, EventType } from "@/lib/types/event";
import { filterEvents } from "@/lib/calendar/filter";
import { FilterBar } from "@/app/calendar/_components/filter-bar";
import { EventTimeline } from "@/app/calendar/_components/event-timeline";
import { MiniCalendar } from "@/app/calendar/_components/mini-calendar";
import groups from "@/lib/data/groups";

interface CalendarShellProps {
  events: Event[];
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function CalendarShell({ events }: CalendarShellProps) {
  const [eventType, setEventType] = useState<EventType | "All">("All");
  const [groupName, setGroupName] = useState<string | "All">("All");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const groupNames = useMemo(
    () =>
      Object.values(groups)
        .map((group) => group.name)
        .sort((a, b) => a.localeCompare(b)),
    [],
  );

  const filteredEvents = filterEvents(events, { eventType, groupName });

  const timelineEvents = selectedDate
    ? filteredEvents.filter((event) => event.date === selectedDate)
    : filteredEvents;

  function handleSelectDate(isoDate: string) {
    if (selectedDate === isoDate) {
      setSelectedDate(null);
      return;
    }

    const [year, monthNumber] = isoDate.split("-").map(Number);
    setMonth(new Date(year, monthNumber - 1, 1));
    setSelectedDate(isoDate);
  }

  function handleToday() {
    const now = new Date();
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(null);
  }

  function handleClearDateFilter() {
    setSelectedDate(null);
  }

  function handleResetFilters() {
    setEventType("All");
    setGroupName("All");
    setSelectedDate(null);
  }

  const hasCategoryFilters = eventType !== "All" || groupName !== "All";

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        eventType={eventType}
        groupName={groupName}
        groupNames={groupNames}
        hasDateFilter={Boolean(selectedDate)}
        onEventTypeChange={setEventType}
        onGroupNameChange={setGroupName}
        onResetFilters={handleResetFilters}
      />
      <div className="flex min-w-0 flex-col-reverse gap-4 md:grid md:grid-cols-[2fr_1fr] md:gap-6">
        <div className="min-w-0 overflow-visible">
          <EventTimeline
            events={timelineEvents}
            selectedDate={selectedDate}
            onClearDateFilter={handleClearDateFilter}
            hasCategoryFilters={hasCategoryFilters}
            onResetFilters={handleResetFilters}
          />
        </div>

        <aside className="w-full max-w-[400px] md:sticky md:top-24 md:self-start">
          <div className="card-elev rounded-2xl p-3 sm:p-4 md:p-5">
            <MiniCalendar
              month={month}
              events={filteredEvents}
              selectedDate={selectedDate}
              onPrev={() => setMonth((m) => addMonths(m, -1))}
              onNext={() => setMonth((m) => addMonths(m, 1))}
              onToday={handleToday}
              onSelectDate={handleSelectDate}
            />
            <p className="mt-3 border-t border-border/60 pt-3 text-[10px] text-muted-foreground md:mt-4 md:pt-4 md:text-xs">
              Dots mark days with community events. Click a day to filter the
              timeline.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
