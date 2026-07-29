"use client";

import { useState } from "react";
import type { EventType } from "@/lib/types/event";
import { EVENT_TYPE_OPTIONS } from "@/lib/data/eventTypes";

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

interface FilterBarProps {
  eventType: EventType | "All";
  groupName: string | "All";
  groupNames: string[];
  hasDateFilter?: boolean;
  onEventTypeChange: (value: EventType | "All") => void;
  onGroupNameChange: (value: string | "All") => void;
  onResetFilters: () => void;
}

export function FilterBar({
  eventType,
  groupName,
  groupNames,
  hasDateFilter = false,
  onEventTypeChange,
  onGroupNameChange,
  onResetFilters,
}: FilterBarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount =
    (eventType !== "All" ? 1 : 0) +
    (groupName !== "All" ? 1 : 0) +
    (hasDateFilter ? 1 : 0);

  const canReset = hasDateFilter || activeFilterCount > 0;

  return (
    <div className="sticky top-16 z-30 -mx-4 mt-0 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <FilterIcon className="h-4 w-4" />
          Filter by
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-primary-glow/20 px-2 py-0.5 text-xs text-primary-glow">
              {activeFilterCount}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          aria-controls="filter-panel"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface"
        >
          {filtersOpen ? <CloseIcon className="h-3.5 w-3.5" /> : null}
          {filtersOpen ? "Close" : "Show filters"}
        </button>
      </div>

      <div
        id="filter-panel"
        className={`flex-col gap-3 sm:mt-0 sm:flex sm:flex-row sm:items-center ${
          filtersOpen ? "mt-3 flex" : "hidden sm:flex"
        }`}
      >
        <div className="hidden items-center gap-2 text-sm font-medium text-foreground sm:flex">
          <FilterIcon className="h-4 w-4" />
          <span>Filter by</span>
        </div>

        <div className="relative w-full sm:w-auto">
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={eventType}
            onChange={(e) =>
              onEventTypeChange(e.target.value as EventType | "All")
            }
            className="w-full appearance-none rounded-full border border-border bg-surface/60 py-2.5 pl-4 pr-10 text-sm text-foreground focus:border-primary/60 focus:outline-none sm:w-56"
          >
            <option value="All" className="bg-background">
              All categories
            </option>
            {EVENT_TYPE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-background"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="relative w-full sm:w-auto">
          <label htmlFor="group-filter" className="sr-only">
            Filter by group
          </label>
          <select
            id="group-filter"
            value={groupName}
            onChange={(e) => onGroupNameChange(e.target.value)}
            className="w-full appearance-none rounded-full border border-border bg-surface/60 py-2.5 pl-4 pr-10 text-sm text-foreground focus:border-primary/60 focus:outline-none sm:w-56"
          >
            <option value="All" className="bg-background">
              All groups
            </option>
            {groupNames.map((name) => (
              <option key={name} value={name} className="bg-background">
                {name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {canReset && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
