import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import sponsors from "@/lib/data/sponsors";
import { GroupsGrid } from "@/components/groups-grid";
import { ArrowUpRightIcon } from "@/components/icons";
import { EventCard } from "@/components/ui/event-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getAllEvents } from "@/lib/data/get-events";
import { splitTimelineEvents } from "@/lib/calendar/split-timeline-events";
import groups from "@/lib/data/groups";
import { Icon, IconType } from "@/components/icons/icon";

export default async function HomePage() {
  const events = await getAllEvents();
  const upcomingEvents = splitTimelineEvents(events).upcomingEvents.slice(0, 3);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const eventsThisMonth = events.filter((event) => {
    const [year, month] = event.date.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  }).length;

  const memberGroups = Object.values(groups).filter((group) => !group.isExternal);
  const previewGroups = memberGroups.slice(0, 6);
  const activeGroups = memberGroups.length;

  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-glow" />
              Orlando & Central Florida
            </span>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              <span className="font-extrabold">
                Welcome to{" "}
                <em className="not-italic text-primary">ODevs</em>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              Embark on a journey within a close-knit community built by the
              developers, engineers, and creators shaping Orlando. Connect,
              share, and build something great together.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href="https://discord.gg/v6gchdH43K"
                target="_blank"
                rel="noreferrer"
                flex={true}
                className="w-48 justify-center"
              >
                <Image
                  src="/images/platform-logos/discord.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  width={16}
                  height={16}
                />
                Join Discord
              </Button>
              <Button
                variant="secondary"
                href="/calendar"
                flex={true}
                className="w-48 justify-center"
              >
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
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                Explore events
              </Button>
            </div>

            <dl className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-6 border-t border-border/60 pt-8 text-center sm:grid-cols-3 sm:text-left">
              {[
                { value: "3200+", label: "Members" },
                { value: String(activeGroups), label: "Groups" },
                {
                  value: String(eventsThisMonth),
                  label: "Events this month",
                },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Coming Up */}
      <section
        id="coming-up"
        aria-labelledby="coming-up-heading"
        className="py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary-glow">
                Coming up
              </p>
              <h2
                id="coming-up-heading"
                className="mt-2 font-display text-3xl font-semibold text-balance sm:text-4xl"
              >
                Events you won&apos;t want to miss
              </h2>
            </div>
            <Link
              href="/calendar"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-glow hover:text-foreground shrink-0"
            >
              View full calendar
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
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {upcomingEvents.length < 1 ? (
            <div className="mt-8">
              <EmptyState
                title="No events to show"
                description="Check back later for upcoming events."
              />
            </div>
          ) : (
            <div
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {upcomingEvents.map((event) => (
                <div key={event.id} role="listitem" className="grid">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-primary-glow">
              About Our Community
            </p>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl font-semibold text-balance sm:text-5xl"
            >
              Built by the community,
              <br />
              for the community
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="overflow-hidden rounded-3xl border border-border">
              <Image
                src="/images/OTAB_PHOTO.jpg"
                alt="Orlando Devs community members gathered at a meetup"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              Orlando Devs is a vibrant community of volunteer software
              developers, designers, and tech enthusiasts in the Orlando and
              Central Florida area. Whether you&apos;re a seasoned
              professional or just starting your journey in tech, we&apos;re
              dedicated to fostering growth, collaboration, and knowledge
              sharing among our members &mdash; providing a supportive
              environment where you can learn, network, and contribute to the
              local tech ecosystem.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
            />
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary-glow">
              Our Mission
            </p>
            <p className="mt-4 font-display text-xl leading-snug text-foreground sm:text-2xl">
              To grow a welcoming, inclusive home for developers in Central
              Florida where anyone curious about technology can learn in the
              open, teach what they know, and build lasting connections with the
              people making software here.
            </p>
          </div>

          <div
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {(
              [
                {
                  title: "Open by Default",
                  desc: "No signup required: show up and enjoy",
                  icon: "heart",
                },
                {
                  title: "Skill Sharing",
                  desc: "Meet the experienced, gain experience, share knowledge",
                  icon: "book",
                },
                {
                  title: "Inclusive Spaces",
                  desc: "Our community is open to anyone and everyone",
                  icon: "people",
                },
                {
                  title: "Local Roots",
                  desc: "Grassroots organization by enthusiastic Orlando locals",
                  icon: "location",
                },
                {
                  title: "Teaching",
                  desc: "Mentorship programs for developers at all levels",
                  icon: "graduation",
                },
                {
                  title: "Jobs & Support",
                  desc: "Local openings and career guidance",
                  icon: "handshake",
                },
                {
                  title: "Engagement",
                  desc: "Active Discord community for daily discussions",
                  icon: "speech-bubble",
                },
                {
                  title: "Practical",
                  desc: "Technical workshops and learning sessions",
                  icon: "hand",
                },
                {
                  title: "Events",
                  desc: "Regular meetups and networking events",
                  icon: "calendar",
                },
              ] as Array<{ title: string; desc: string; icon: IconType }>
            ).map(({ title, desc, icon }) => (
              <div
                className="card-elev rounded-2xl p-6 transition-colors hover:border-border-strong"
                key={title}
                role="listitem"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                  <Icon icon={icon} className="w-5 h-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Groups */}
      <section
        id="explore-groups"
        aria-labelledby="explore-groups-heading"
        className="py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary-glow">
                Explore groups
              </p>
              <h2
                id="explore-groups-heading"
                className="mt-2 font-display text-3xl font-semibold text-balance sm:text-4xl"
              >
                Find your corner of the community
              </h2>
            </div>
            <Link
              href="/groups"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-glow hover:text-foreground shrink-0"
            >
              Browse all groups
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
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <GroupsGrid groups={previewGroups} />
        </div>
      </section>

      {/* Sponsors */}
      <section
        id="sponsors"
        aria-labelledby="sponsors-heading"
        className="py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card-elev overflow-hidden rounded-3xl p-8 sm:p-12">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-primary-glow">
                Sponsors
              </p>
              <h2
                id="sponsors-heading"
                className="font-display text-2xl font-semibold sm:text-3xl"
              >
                Thank you to our community sponsors!
              </h2>
            </div>

            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center items-center gap-4">
              {Object.values(sponsors).map(({ url, logo, name }) => (
                <Link
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 transition-transform hover:scale-105 hover:border-zinc-400"
                >
                  <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={120}
                    height={40}
                    className={`${name === "Informulate" ? "h-12" : "h-10"} w-auto object-contain`}
                  />
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Interested in supporting the community?
              </p>
              <Button
                href="mailto:sponsors@orlandodevs.com"
                variant="secondary"
                flex={true}
              >
                Become a sponsor
                <ArrowUpRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
