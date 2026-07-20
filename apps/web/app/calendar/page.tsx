import { getAllEvents } from "@/lib/data/get-events";
import { CalendarShell } from "@/app/calendar/_components/calendar-shell";
import { PageHeader } from "@/components/page-header";

export default async function CalendarPage() {
  const events = await getAllEvents();

  return (
    <section className="bg-background text-foreground py-14 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          label="Calendar"
          title="Community events, one place"
          description="Everything happening across the Orlando developer community. Filter by category, jump around by month, and register directly from the organizer."
        />
        <CalendarShell events={events} />
      </div>
    </section>
  );
}
