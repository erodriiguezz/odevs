import type { Event } from '@/lib/types/event'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center gap-4 dark:shadow-none">
      {event.group.logo !== '' && (
        <div className="w-11 h-11 rounded-md bg-zinc-100 dark:bg-white/10 flex-shrink-0" />
      )}
      <div className="flex flex-col min-w-0">
        <span className="text-zinc-950 dark:text-white text-sm font-medium truncate">
          {event.title}
        </span>
        <span className="text-zinc-500 dark:text-zinc-400 text-xs">
          {event.date} · {event.time}
        </span>
      </div>
      {event.sponsors.length > 0 && (
        <div className="ml-auto flex items-center gap-2">
          {event.sponsors.map(sponsor => (
            <a
              key={sponsor.name}
              href={sponsor.url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 dark:text-zinc-500 text-xs hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              {sponsor.logo ? (
                <img src={sponsor.logo} alt={sponsor.name} className="h-5 w-auto rounded-sm" />
              ) : (
                sponsor.name
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
