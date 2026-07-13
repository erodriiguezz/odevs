'use client'

import { EventTypes } from '@/lib/types/event';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface FilterBarProps<T> {
  selectedTypes: Set<T>,
  types: T[],
  paramName: string,
}

export function FilterBar<T extends string>({ selectedTypes, types, paramName }: FilterBarProps<T>) {
  const params = new URLSearchParams(useSearchParams());
  const { replace } = useRouter();
  const pathname = usePathname();

  function onToggle(type: T) {
    if (selectedTypes.has(type)) params.delete(paramName, type);
    else params.append(paramName, type);
    replace(pathname + "?" + params.toString());
  }
  
  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto">
      {types.map(type => {
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
