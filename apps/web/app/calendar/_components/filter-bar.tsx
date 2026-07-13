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
            className={`rounded-full px-3 py-1 text-sm capitalize ${
              isSelected
                ? 'bg-muted-primary/50 border border-primary/30 dark:border-primary/60 text-primary dark:text-white theme-trans'
                : 'bg-muted-background border border-border text-muted-foreground hover:border-border-glow theme-trans'
            }`}
          >
            {type}
          </button>
          
        )
      })}
    </div>
  )
}
