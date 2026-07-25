"use client";

import groups from "@/lib/data/groups";
import groupCategories from "@/lib/data/groupCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "./icons/icon";
import { GroupsGrid } from "./groups-grid";

export default function GroupExplorer() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const category = searchParams.get("category") ?? "any";
  const search = searchParams.get("search") ?? "";

  function updateParam(param: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (
      !value ||
      (param === "category" && value.toLowerCase() === "any") ||
      (param === "search" && value === "")
    ) {
      params.delete(param);
    } else {
      params.set(param, value);
    }

    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    replace(href);
  }

  let selectedGroups = Object.values(groups);
  const cat = category.toLowerCase();
  if (cat !== "any") {
    selectedGroups = selectedGroups.filter(
      (group) => group.category.name.toLowerCase() === cat,
    );
  }

  if (search !== "") {
    const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    selectedGroups = selectedGroups.filter(
      (group) =>
        searchWords.every((word) => group.name.toLowerCase().includes(word)) ||
        searchWords.every((word) => group.topic.toLowerCase().includes(word)) ||
        searchWords.every((word) =>
          group.description.toLowerCase().includes(word),
        ) ||
        group.eventSources.some((source) =>
          searchWords.every((word) =>
            source.description !== undefined
              ? source.description.toLowerCase().includes(word)
              : false,
          ),
        ),
    );
  }

  return (
    <>
      <div className="mb-8 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            icon="magnifying-glass"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="groups-search" className="sr-only">
            Search groups
          </label>
          <input
            id="groups-search"
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
            className="w-full rounded-full border border-border bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
            placeholder="Search groups"
          />
        </div>

        <div className="relative fit-content">
          <select
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
            className="appearance-none rounded-full border border-border bg-surface/60 py-2.5 pl-4 pr-10 text-sm text-foreground focus:border-primary/60 focus:outline-none"
            aria-label="Category"
          >
            <option value="any" className="bg-background">
              Any category
            </option>
            {Object.values(groupCategories).map(({ name }) => (
              <option value={name} key={name} className="bg-background">
                {name}
              </option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <GroupsGrid groups={selectedGroups} />
    </>
  );
}
