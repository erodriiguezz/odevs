'use client';

import type { Event } from '@/lib/types/event';
import { generateCalendarGrid } from '@/lib/calendar/grid';
import { formatMonthHeading } from '@/lib/calendar/format';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Icon } from '@/components/icons/icon';


interface MiniCalendarProps {
  events: Event[]
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function MiniCalendar({ events }: MiniCalendarProps) {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const now = new Date();
  const [month, year] = (params.get("month") ?? now.toLocaleString('en-US', { month: 'numeric', year: 'numeric' })).split("/").map(Number);
  
  const heading = formatMonthHeading(year, month);
  const grid = generateCalendarGrid(year, month, events);

  return (
    <div className="bg-background border border-border rounded-xl p-4 theme-trans">
      <div className="flex flex-row justify-between px-2">
        <h3 className="text-sm font-semibold text-foreground mb-3 font-display theme-trans">{heading}</h3>
        <div>
          <button className="hover:scale-110" onClick={() => {
            let newMonth = month - 1;
            let newYear = year;
            if (newMonth < 1) {
              newMonth = 12;
              newYear--;
            }
            const newParams = new URLSearchParams(params);
            newParams.set("month", newMonth + "/" + newYear);
            router.replace(path + "?" + newParams.toString());
          }}>
            <Icon icon="left-arrow" className="text-foreground theme-trans" />
          </button>
          <button className="hover:scale-110" onClick={() => {
            let newMonth = month + 1;
            let newYear = year;
            if (newMonth > 12) {
              newMonth = 1;
              newYear++;
            }
            const newParams = new URLSearchParams(params);
            newParams.set("month", newMonth + "/" + newYear);
            router.replace(path + "?" + newParams.toString());
          }}>
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
          <div
            key={i}
            className={`relative flex flex-col items-center justify-center py-1 rounded-md theme-trans ${
              cell.isToday ? 'ring-2 ring-[#5B4FE9]' : ''
            } ${cell.isCurrentMonth ? 'text-foreground' : 'text-border-glow'}`}
          >
            <span className="text-sm">{cell.date}</span>
            {cell.hasEvents && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />}
          </div>
        ))}
      </div>
    </div>
  )
}
