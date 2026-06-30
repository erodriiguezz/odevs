'use client'

import type { EventType } from '@/lib/types/event'

const EVENT_TYPES: EventType[] = [
  'meetup',
  'workshop',
  'conference',
  'hackathon',
  'webinar',
  'social',
  'other',
]

interface FilterBarProps {
  selectedTypes: Set<EventType>
  onToggle: (type: EventType) => void
}

export function FilterBar({ selectedTypes, onToggle }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto">
      {EVENT_TYPES.map(type => {
        const isSelected = selectedTypes.has(type)
        return (
          <button
            key={type}
            type="button"
            onClick={() => onToggle(type)}
            className={`rounded-full px-3 py-1 text-sm capitalize transition-colors ${
              isSelected
                ? 'bg-[#EAE8FD] dark:bg-zinc-800 border border-[#5B4FE9]/30 dark:border-zinc-600 text-[#5B4FE9] dark:text-white'
                : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {type}
          </button>
        )
      })}
    </div>
  )
}
