'use client';

import type { Event } from '@/lib/types/event';
import { generateCalendarGrid } from '@/lib/calendar/grid';
import { formatMonthHeading } from '@/lib/calendar/format';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Icon } from '@/components/icons/icon';

interface MiniCalendarProps {
  events: Event[],
  className?: string,
  previousLen: number,
  setPreviousLen: (len: number) => void
  firstDateIndex: Map<string, number>,
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function MiniCalendar({ events, className, previousLen, setPreviousLen, firstDateIndex }: MiniCalendarProps) {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const now = new Date();
  const [month, year] = (params.get("month") ?? now.toLocaleString("en-US", { month: "numeric", year: "numeric" })).split("/").map(Number);
  
  const heading = formatMonthHeading(year, month);
  const grid = generateCalendarGrid(year, month, events);

  const onMonthChange = (dir: number) => 
    () => {
      const newParams = new URLSearchParams(params);
      newParams.set("month", `${((month-1 + dir)%12 + 12)%12 + 1}/${year + Math.ceil((month+dir)/12) - 1}`);
      router.replace(path + "?" + newParams.toString(), { scroll: false });
    }

  return (
    <div className={`bg-background border border-border rounded-xl p-4 theme-trans ${className}`}>
      <div className="flex flex-row justify-between px-2">
        <h3 className="text-sm font-semibold text-foreground mb-3 font-display theme-trans">{heading}</h3>
        <div>
          <button className="hover:scale-110" onClick={onMonthChange(-1)}>
            <Icon icon="left-arrow" className="text-foreground theme-trans" />
          </button>
          <button className="hover:scale-110" onClick={onMonthChange(1)}>
            <Icon icon="right-arrow" className="text-foreground theme-trans" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Weekday header row */}
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i} className="text-muted-foreground font-medium py-1 font-mono theme-trans">
            {label}
          </div>
        ))}

        {/* Day cells */}
        {grid.map((cell, i) => (
          <button
            key={i}
            className={`relative flex flex-col items-center justify-center py-1 rounded-md theme-trans ${
              cell.isToday ? 'ring-2 ring-[#5B4FE9]' : ''
            } ${cell.month == month ? 'text-foreground' : 'text-border-glow'} ${cell.hasEvents && 'hover:scale-110'}`}
            onClick={() => {
              if (cell.hasEvents) {
                const date = `${cell.year}-${String(cell.month).padStart(2, '0')}-${String(cell.date).padStart(2, '0')}`;
                let ind = firstDateIndex.get(date);
                if (ind && ++ind > previousLen) setPreviousLen(ind + ind%2);
                router.replace(`${path}?${params.toString()}#${date}`);
              }
            }}
          >
            <span className="text-sm">{cell.date}</span>
            {cell.hasEvents && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />}
          </button>
        ))}
      </div>
    </div>
  )
}
