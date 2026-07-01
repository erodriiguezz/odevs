import { getAllEvents } from '@/lib/data/get-events'
import { CalendarShell } from '@/components/calendar/calendar-shell'
import { PageHeader } from '@/components/page-header'

export default function CalendarPage() {
  const events = getAllEvents()

  return (
    <section className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white py-16 lg:py-28 min-h-screen relative">
      <div
        className="absolute inset-0 pointer-events-none dark:block hidden"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 0%, rgba(91,79,233,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          label="Calendar"
          title="Community Events"
          description="Browse upcoming and past events from the Orlando developer community."
        />
        <CalendarShell events={events} />
      </div>
    </section>
  )
}
